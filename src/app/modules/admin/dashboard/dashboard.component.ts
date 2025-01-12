import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { DashboardService } from '@services/dashboard.service';
import { SnackBar } from 'app/core/utils/snackBar';
import saveAs from 'save-as';
import { DashboardApiService } from './common/services/dashboard-api.service';
import { DatePipe, formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { NominateFormComponent } from './nominate-form/nominate-form.component';
import { LoggedInUserService } from '../common/services/logged-in-user.service';
import {
    MAT_SELECT_YEARS,
    MAT_TAB_MONTHS,
} from '../project/project-widget/common/constants';
import {
    NomineeList,
    UserInterface,
} from './nominee-list/nominee-list.component';

export interface StatInterface {
    projectCount: number;
    resourceCount: number;
    repoCount: number;
    qaCount: number;
    pmCount: number;
    designerCount: number;
    developerCount: number;
    vendorCount: number;
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    userName: string;
    userImageUrl: string;
    isLoading = true;
    statCount: StatInterface;
    submitInProcess: boolean = false;
    submitInProcess1: boolean = false;
    submitInProcess2: boolean = false;
    submitInProcess3: boolean = false;
    isLoadingDeveloperEmails: boolean = false;
    developerEmailList: any[];
    loggedInUser: UserInterface;
    matTabList: any[] = MAT_TAB_MONTHS;
    matSelectYears: string[] = MAT_SELECT_YEARS;
    selectedTabIndex: number = 7;
    currentMonth: number;
    currentYear: string = '';
    selectedYear: string = '2020';
    initialLoading: boolean = false;
    nomineeList: NomineeList[] = [];

    constructor(
        private _authService: AuthService,
        private router: Router,
        private dashboardService: DashboardService,
        private dashboardApiService: DashboardApiService,
        private snackbar: SnackBar,
        public datePipe: DatePipe,
        private dialog: MatDialog,
        private loggedInUserService: LoggedInUserService
    ) {}

    ngOnInit(): void {
        this.loadUserData();
        this.getDashboardStatsCounts();
        this.loadResourcesEmailList();
        this.getUserRole();
        this.getCurrentMonthAndYear();
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
    onMonthChanged(event: any) {
        this.selectedTabIndex = event?.value;
        this.getNomineeList(this.selectedTabIndex, this.selectedYear);
    }
    onYearChange(event: any) {
        this.selectedYear = event?.value;
        this.getNomineeList(this.selectedTabIndex, this.selectedYear);
    }
    getDashboardStatsCounts() {
        this.dashboardService.getDashboardStatsCount().subscribe((res: any) => {
            if (res?.data) {
                this.isLoading = false;
                this.statCount = res?.data;
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
        this.submitInProcess1 = true;
        this.dashboardApiService.getAvailabilityExcelReport().subscribe(
            (res: any) => {
                this.submitInProcess1 = false;
                if (res?.code === 200) {
                    this.downloadAvailabilityFile(res?.data);
                } else {
                    this.snackbar.errorSnackBar(res?.message);
                }
            },
            (err) => {
                this.submitInProcess1 = false;
                this.snackbar.errorSnackBar('Something went wrong');
            }
        );
    }

    openDialog() {
        const dialogRef = this.dialog.open(NominateFormComponent, {
            disableClose: true,
            width: '50%',
            panelClass: 'warn-dialog-content',
            autoFocus: false,
            data: {
                emails: this.developerEmailList,
                loggedInUser: this.loggedInUser,
            },
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result == 'success') {
                this.loadUserData();
                this.getDashboardStatsCounts();
                this.loadResourcesEmailList();
                this.getUserRole();
                this.getCurrentMonthAndYear();
            }
        });
    }

    loadResourcesEmailList() {
        this.isLoadingDeveloperEmails = true;
        this.dashboardService.findAllDeveloperEmails().subscribe(
            (res: any) => {
                this.isLoadingDeveloperEmails = false;
                if (res?.data) {
                    this.developerEmailList = res?.data;
                }
            },
            (err) => {
                this.isLoadingDeveloperEmails = false;
            }
        );
    }

    private getUserRole() {
        this.loggedInUserService.getLoggedInUser().subscribe((res: any) => {
            if (res?.role) {
                this.loggedInUser = res;
            }
        });
    }
    private getNomineeList(month: number, year: number | string) {
        const payload = {
            month: ++month,
            year: year,
        };
        this.dashboardApiService
            .getNomineeList(payload)
            .subscribe((res: any) => {
                if (res?.statusCode === 200) {
                    this.nomineeList = res?.data;
                }
            });
    }
    private getCurrentMonthAndYear() {
        this.selectedYear = String(new Date().getFullYear());
        this.currentYear = String(new Date().getFullYear());
        this.selectedTabIndex = new Date().getMonth();
        this.currentMonth = new Date().getMonth();
        this.getNomineeList(this.currentMonth, this.currentYear);
    }
}
