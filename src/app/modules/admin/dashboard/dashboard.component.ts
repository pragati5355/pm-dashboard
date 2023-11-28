import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { DashboardService } from '@services/dashboard.service';
import { SnackBar } from 'app/core/utils/snackBar';
import saveAs from 'save-as';
import { DashboardApiService } from './common/services/dashboard-api.service';
import { DatePipe, formatDate } from '@angular/common';
import moment from 'moment';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    userName: string;
    userImageUrl: string;
    noOfProjects: Number = 0;
    noOfResources: Number = 0;
    noOfRepos: Number = 0;
    isLoading = true;
    submitInProcess: boolean = false;
    submitInProcess2: boolean = false;
    submitInProcess3: boolean = false;

    constructor(
        private _authService: AuthService,
        private router: Router,
        private dashboardService: DashboardService,
        private dashboardApiService: DashboardApiService,
        private snackbar: SnackBar,
        public datePipe: DatePipe
    ) {}

    ngOnInit(): void {
        this.loadUserData();
        this.getDashboardStatsCounts();
    }
    loadUserData() {
        const user = this._authService.getUser();
        const fullUserName = `${user?.firstName ? user?.firstName : ' '} ${
            user?.lastName ? user?.lastName : ' '
        }`;
        this.userName = fullUserName.trim();
        this.userImageUrl = this._authService.getUserPhoto();
    }
    goToProjects() {
        this.router.navigate(['/projects/']);
    }
    goToResources() {
        this.router.navigate(['/resources']);
    }
    getDashboardStatsCounts() {
        this.dashboardService.getDashboardStatsCount().subscribe((res: any) => {
            if (res?.data) {
                this.isLoading = false;
                this.noOfProjects = res?.data?.projectCount;
                this.noOfResources = res?.data?.resourceCount;
                this.noOfRepos = res?.data?.repoCount;
            }
            if (res?.tokenExpire) {
                this._authService.updateAndReload();
            }
        });
    }

    public base64ToBlob(b64Data, contentType = '', sliceSize = 512) {
        b64Data = b64Data.replace(/\s/g, ''); //IE compatibility...
        let byteCharacters = atob(b64Data);
        let byteArrays = [];
        for (
            let offset = 0;
            offset < byteCharacters.length;
            offset += sliceSize
        ) {
            let slice = byteCharacters.slice(offset, offset + sliceSize);

            let byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            let byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        return new Blob(byteArrays, { type: contentType });
    }

    downloadFile(b64encodedString: string) {
        if (b64encodedString) {
            var today = new Date();
            var dateobj = this.datePipe.transform(today, 'dd-MM-yyyy');
            var blob = this.base64ToBlob(b64encodedString, 'text/plain');
            saveAs(blob, 'resource-utilization' + '-' + dateobj + '.xls');
        }
    }

    downloadAvailabilityFile(b64encodedString: string) {
        if (b64encodedString) {
            var today = new Date();
            var dateobj = this.datePipe.transform(today, 'dd-MM-yyyy');
            var blob = this.base64ToBlob(b64encodedString, 'text/plain');
            saveAs(blob, 'resource-availability' + '-' + dateobj + '.xlsx');
        }
    }

    downloadGenericFile(b64encodedString: string) {
        if (b64encodedString) {
            var today = new Date();
            var dateobj = this.datePipe.transform(today, 'dd-MM-yyyy');
            var blob = this.base64ToBlob(b64encodedString, 'text/plain');
            saveAs(blob, 'resource-generic' + '-' + dateobj + '.xlsx');
        }
    }

    downloadExcelReport() {
        this.submitInProcess = true;
        this.dashboardApiService.getUtilisationExcelReport().subscribe(
            (res: any) => {
                this.submitInProcess = false;
                if (res?.code === 200) {
                    this.downloadFile(res?.data);
                } else {
                    this.snackbar.errorSnackBar(res?.message);
                }
            },
            (err) => {
                this.submitInProcess = false;
                this.snackbar.errorSnackBar('Something went wrong');
            }
        );
    }

    downloadExcelGenericReport() {
        this.submitInProcess2 = true;
        this.dashboardApiService.getGenericExcelReport().subscribe(
            (res: any) => {
                this.submitInProcess2 = false;
                if (res?.error === false) {
                    this.downloadGenericFile(res?.data);
                } else {
                    this.snackbar.errorSnackBar(res?.message);
                }
            },
            (err) => {
                this.submitInProcess2 = false;
                this.snackbar.errorSnackBar('Something went wrong');
            }
        );
    }

    downloadExcelAvailablityReport() {
        this.submitInProcess = true;
        this.dashboardApiService.getAvailabilityExcelReport().subscribe(
            (res: any) => {
                this.submitInProcess = false;
                if (res?.code === 200) {
                    this.downloadAvailabilityFile(res?.data);
                } else {
                    this.snackbar.errorSnackBar(res?.message);
                }
            },
            (err) => {
                this.submitInProcess = false;
                this.snackbar.errorSnackBar('Something went wrong');
            }
        );
    }
}
