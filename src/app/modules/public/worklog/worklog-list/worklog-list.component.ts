import { PAUSE } from '@angular/cdk/keycodes';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
    MAT_SELECT_YEARS,
    MAT_TAB_MONTHS,
} from '@modules/admin/project/project-widget/common/constants';
import { WorkLogsService } from '@modules/public/services/work-logs.service';
import { SnackBar } from 'app/core/utils/snackBar';
import { Observable } from 'rxjs';
import saveAs from 'save-as';
import { WorklogDownloadComponent } from '../worklog-download/worklog-download.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-worklog-list',
    templateUrl: './worklog-list.component.html',
    styleUrls: ['./worklog-list.component.scss'],
})
export class WorklogListComponent implements OnInit {
    selectedYear: string = '';
    preSelectedYear: any;
    selectedTabIndex: number = 0;
    projectId: any;
    matTabList: any[] = MAT_TAB_MONTHS;
    matSelectYears: string[] = MAT_SELECT_YEARS;
    requiredSprintSkeletonData = {
        rowsToDisplay: 10,
        displayProfilePicture: false,
    };
    initialLoading: boolean = false;
    userState: any;
    configForm: FormGroup;
    htmlText: string =
        '<div class="px-2">12/12/2023</div><div>4</div><div class="truncate"></div>';
    workLogsList: any[] = [];
    projectName: string = '';
    disablePreviousWorklog: boolean = false;
    loggedInUser: any;
    loadingUser: boolean = false;
    userRole: string;
    resourceIdList: number[] = [101, 84, 89, 118];
    selectedResourceId: number = this.resourceIdList[0];
    myControl = new FormControl('');
    options: any[] = [];
    filteredOptions: Observable<any[]>;
    isEmailSelected: boolean = false;
    isResourceLoading: boolean = false;
    selectedResource: any;
    defaultResource: any;
    currentMonth: number;
    currentYear: string = '';
    pageDisabledByAdmin: boolean = false;
    submitInProcess: boolean = false;
    totalHours : number;
    foods: any[] = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos' },
    ];

    yearAndMonth: any[] = [];

    constructor(
        private route: ActivatedRoute,
        private publicWorkLogService: WorkLogsService,
        private snackbar: SnackBar,
        public datePipe: DatePipe,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.routeSubscription();
        this.getCurrentMonthAndYear();
        this.getProjectResources();
    }

    onYearChange(event: any) {
        const index = this.yearAndMonth?.findIndex((year) => {
            return year?.year === event?.value;
        });

        this.selectedYear = event?.value;
        this.matTabList = this.yearAndMonth[index]?.months;
        this.selectedTabIndex = 0;
        this.loadData(event?.value, this.matTabList[0]?.value);
    }

    onEmailSelected($event: any) {
        const resource = this.options.filter(
            (option) => option?.resource?.email === $event?.value
        );
        this.matTabList = resource[0]?.year[0]?.months;

        this.selectedTabIndex = 0;

        this.yearAndMonth = resource[0]?.year;
        this.selectedYear = resource[0]?.year[0]?.year;
        this.selectedResourceId = resource[0]?.resource?.resourceId;
        this.loadData(
            this.selectedYear,
            resource[0]?.year[0]?.months[0]?.value
        );
    }

    onTabChanged(event: any) {
        this.selectedTabIndex = event?.index;
        const index = this.yearAndMonth?.findIndex((year) => {
            return year?.year === this.selectedYear;
        });
        this.loadData(
            this.selectedYear,
            this.yearAndMonth[index]?.months[this.selectedTabIndex]?.value
        );
    }

    downloadWorklogReport() {
        const dialogRef = this.dialog.open(WorklogDownloadComponent, {
            disableClose: true,
            width: '98%',
            maxWidth: '800px',
            maxHeight: '90vh',
            panelClass: 'warn-dialog-content',
            autoFocus: false,
            data: {
                key: this.projectId,
                projectName: this.projectName,
            },
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result == 'success') {
                window.location.reload();
                this.getProjectResources();
            }
        });

        // const index = this.yearAndMonth?.findIndex((year) => {
        //     return year?.year === this.selectedYear;
        // });
        // let year = this.selectedYear;
        // const payload = {
        //     key: this.projectId,
        //     month: this.yearAndMonth[index]?.months[this.selectedTabIndex]
        //         ?.value,
        //     year: year,
        // };
        // this.submitInProcess = true;
        // console.log("Paylod :- " , payload);
        // this.publicWorkLogService.downloadWorklog(payload).subscribe(
        //     (res: any) => {
        //         this.submitInProcess = false;
        //         if (res?.code === 200) {
        //             this.downloadFile(res?.data);
        //             this.snackbar.successSnackBar(res?.message);
        //         } else {
        //             this.snackbar.errorSnackBar(res?.message);
        //         }
        //     },
        //     (err) => {
        //         this.submitInProcess = false;
        //         this.snackbar.errorSnackBar('Something went wrong');
        //     }
        // );
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

    private base64ToBlob(b64Data, contentType = '', sliceSize = 512) {
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

    private routeSubscription() {
        this.route.params.subscribe((projectId) => {
            if (projectId['id']) {
                this.projectId = projectId['id'];
            }
        });
    }

    private getCurrentMonthAndYear() {
        this.selectedYear = String(new Date().getFullYear());
        this.currentYear = String(new Date().getFullYear());
        this.selectedTabIndex = new Date().getMonth();
        this.currentMonth = new Date().getMonth();

        const index = this.yearAndMonth?.findIndex((year) => {
            return year?.year === this.selectedYear;
        });
        this.matTabList = this.yearAndMonth[index]?.months;
        this.selectedTabIndex = 0;
    }

    private getProjectResources() {
        this.initialLoading = true;
        this.publicWorkLogService
            .getResourcesPublic(this.projectId)
            .subscribe((res: any) => {
                this.initialLoading = false;
                if (res?.code === 200 && res?.data) {
                    this.options = res?.data;
                    this.yearAndMonth = res?.data[0]?.year;

                    this.matTabList = this.yearAndMonth[0]?.months;

                    this.defaultResource = res?.data[0]?.resource?.email;
                    this.selectedResourceId =
                        res?.data[0]?.resource?.resourceId;

                    this.selectedYear = this.yearAndMonth[0]?.year;
                    this.loadData(
                        this.selectedYear,
                        this.yearAndMonth[0]?.months[0]?.value
                    );
                }
                if (res?.status === 401) {
                    this.pageDisabledByAdmin = true;
                }
            });
    }

    private loadData(year: any, month: number) {
        this.initialLoading = true;

        const payload = {
            resourceId: this.selectedResourceId,
            key: this.projectId,
            month: month,
            year: year,
        };
        this.publicWorkLogService
            .getResourceWorkLogPublic(payload)
            .subscribe((res: any) => {
                this.initialLoading = false;
                if (res?.code === 200) {
                    this.workLogsList = res?.data?.list;
                    this.projectName = res?.data?.projectName;
                    this.totalHours = res?.data?.totalhours;
                }
            });
    }
}
