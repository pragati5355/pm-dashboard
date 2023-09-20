import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from '@angular/material/dialog';
import {
    MAT_SELECT_YEARS,
    MAT_TAB_MONTHS,
} from '@modules/admin/project/project-widget/common/constants';
import { WorkLogsService } from '@modules/public/services/work-logs.service';
import { SnackBar } from 'app/core/utils/snackBar';
import saveAs from 'save-as';

@Component({
    selector: 'app-worklog-download',
    templateUrl: './worklog-download.component.html',
    styleUrls: ['./worklog-download.component.scss'],
})
export class WorklogDownloadComponent implements OnInit {

    projectKey:string = '';
    projectName:string = '';
    selectedYear: string = '2020';
    initialLoading: boolean = false;
    selectedTabIndex: number = 7;
    currentMonth: number;
    currentYear: string = '';
    submitInProcess: boolean = false;
    matTabList: any[] = MAT_TAB_MONTHS;
    matSelectYears: string[] = MAT_SELECT_YEARS;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<WorklogDownloadComponent>,
        private dialog: MatDialog,
        public datePipe: DatePipe,
        private publicWorkLogService: WorkLogsService,
        private snackbar: SnackBar
    ) {}

    ngOnInit(): void {
        this.projectKey = this.data?.key;
        this.projectName = this.data?.projectName;
        this.getCurrentMonthAndYear();
    }

    close() {
        this.matDialogRef.close();
    }

    onYearChange(event: any) {
        this.selectedYear = event?.value;
    }

    onMonthChanged(event: any) {
        this.selectedTabIndex = event?.value;
        console.log("Selected Year:- ", this.selectedYear);
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

    downloadWorklogReport() {
        this.submitInProcess = true;
        let month = this.selectedTabIndex;
        let year = this.selectedYear;
        const payload = {
            key: this.projectKey,
            month: ++month,
            year: year,
        };
        this.submitInProcess = true;
        console.log('Paylod :- ', payload);
        this.publicWorkLogService.downloadWorklog(payload).subscribe(
            (res: any) => {
                this.submitInProcess = false;
                if (res?.code === 200) {
                    this.downloadFile(res?.data);
                    this.snackbar.successSnackBar(res?.message);
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

    private getCurrentMonthAndYear() {
        this.selectedYear = String(new Date().getFullYear());
        this.currentYear = String(new Date().getFullYear());
        this.selectedTabIndex = new Date().getMonth();
        this.currentMonth = new Date().getMonth();
    }
}
