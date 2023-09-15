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
    foods: any[] = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos' },
    ];

    yearAndMonth: any[] = [
        {
            year: '2022',
            months: [
                { value: 1, label: 'Jan' },
                { value: 2, label: 'Feb' },
                { value: 3, label: 'Mar' },
            ],
        },
        {
            year: '2023',
            months: [
                { value: 7, label: 'Jul' },
                { value: 8, label: 'Aug' },
                { value: 9, label: 'Sep' },
            ],
        },
    ];

    constructor(
        private route: ActivatedRoute,
        private publicWorkLogService: WorkLogsService,
        private snackbar: SnackBar,
        public datePipe: DatePipe
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
        const resource = this.options.filter((option) =>
            option?.email?.toLowerCase().includes($event.value)
        );
        this.selectedResourceId = resource[0]?.resourceId;
        this.loadData(this.selectedYear, this.selectedTabIndex);
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
        const index = this.yearAndMonth?.findIndex((year) => {
            return year?.year === this.selectedYear;
        });
        let year = this.selectedYear;
        const payload = {
            projectId: this.projectId,
            month: this.yearAndMonth[index]?.months[this.selectedTabIndex]
                ?.value,
            year: year,
        };
        this.submitInProcess = true;
        this.publicWorkLogService.downloadWorklog(payload).subscribe(
            (res: any) => {
                this.submitInProcess = false;
                if (res?.error === false) {
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

        const data = [
            {
                year: '2022',
                months: [
                    { value: 1, label: 'Jan' },
                    { value: 2, label: 'Feb' },
                    { value: 3, label: 'Mar' },
                ],
            },
            {
                year: '2023',
                months: [
                    { value: 7, label: 'Jul' },
                    { value: 8, label: 'Aug' },
                    { value: 9, label: 'Sep' },
                ],
            },
        ];

        this.selectedYear = data[1]?.year;

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
                    this.defaultResource = res?.data[0]?.email;
                    this.selectedResourceId = res?.data[0]?.resourceId;
                    this.loadData(this.selectedYear, this.selectedTabIndex);
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
                }
            });
    }
}
