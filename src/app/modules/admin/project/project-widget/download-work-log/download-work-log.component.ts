import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { LoggedInUserService } from '@modules/admin/common/services/logged-in-user.service';
import { SnackBar } from 'app/core/utils/snackBar';
import { MAT_SELECT_YEARS, MAT_TAB_MONTHS } from '../common/constants';
import { WorkLogService } from '../common/services/work-log.service';
import saveAs from 'save-as';

@Component({
    selector: 'app-download-work-log',
    templateUrl: './download-work-log.component.html',
    styleUrls: ['./download-work-log.component.scss'],
})
export class DownloadWorkLogComponent implements OnInit {
    projectId: any;
    projectName: string;
    selectedYear: string = '2020';
    initialLoading: boolean = false;
    selectedTabIndex: number = 7;
    currentMonth: number;
    currentYear: string = '';
    matTabList: any[] = MAT_TAB_MONTHS;
    matSelectYears: string[] = MAT_SELECT_YEARS;
    loggedInUser: any;
    submitInProcess: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<DownloadWorkLogComponent>,
        private dialog: MatDialog,
        private loggedInService: LoggedInUserService,
        private route: ActivatedRoute,
        public datePipe: DatePipe,
        public worklogService: WorkLogService,
        private snackbar: SnackBar
    ) {}

    ngOnInit(): void {
        this.projectId = this.data?.id;
        this.projectName = this.data?.projectName;
        this.getCurrentMonthAndYear();
        this.routeSubscription();
        this.getLoggedInUser();
    }

    close() {
        this.matDialogRef.close();
    }

    onYearChange(event: any) {
        this.selectedYear = event?.value;
    }

    onMonthChanged(event: any) {
        this.selectedTabIndex = event?.value;
    }

    private routeSubscription() {
        this.route.params.subscribe((projectId) => {
            if (projectId['id']) {
                this.projectId = projectId['id'];
            }
        });
    }

    private getLoggedInUser() {
        this.initialLoading = true;
        this.loggedInService.getLoggedInUser().subscribe((res: any) => {
            this.initialLoading = false;
            if (res) {
                this.loggedInUser = res;
            }
        });
    }

    private getCurrentMonthAndYear() {
        this.selectedYear = String(new Date().getFullYear());
        this.currentYear = String(new Date().getFullYear());
        this.selectedTabIndex = new Date().getMonth();
        this.currentMonth = new Date().getMonth();
    }

    downloadWorklogReport() {
        this.submitInProcess = true;
        let month = this.selectedTabIndex;
        let year = this.selectedYear;
        const payload = {
            projectId: this.projectId,
            month: ++month,
            year: year,
        };
        this.worklogService.downloadWorklog(payload).subscribe(
            (res: any) => {
                this.submitInProcess = false;
                if (res?.code === 200) {
                    this.downloadFile(res?.data);
                    this.snackbar.successSnackBar(res?.message);
                    this.close();
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

    downloadFile(b64encodedString: string) {
        if (b64encodedString) {
            var today = new Date();
            var dateobj = this.datePipe.transform(today, 'dd-MM-yyyy');
            var blob = this.base64ToBlob(b64encodedString, 'text/plain');
            saveAs(
                blob,
                this.projectName.toLowerCase().replace(' ', '-') +
                    '-' +
                    'worklog' +
                    '-' +
                    dateobj +
                    '.xls'
            );
        }
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
}
