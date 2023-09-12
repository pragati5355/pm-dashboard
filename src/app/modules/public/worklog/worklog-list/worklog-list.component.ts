import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
    MAT_SELECT_YEARS,
    MAT_TAB_MONTHS,
} from '@modules/admin/project/project-widget/common/constants';
import { WorkLogService } from '@modules/admin/project/project-widget/common/services/work-log.service';
import { AuthService } from '@services/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-worklog-list',
    templateUrl: './worklog-list.component.html',
    styleUrls: ['./worklog-list.component.scss'],
})
export class WorklogListComponent implements OnInit {
    selectedYear: string = '2020';
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
    foods: any[] = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos' },
    ];
    constructor(
        private workLogService: WorkLogService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.getCurrentMonthAndYear();
        this.getProjectResources();
    }

    onYearChange(event: any) {
        // this.loadData(event?.value, this.selectedTabIndex);
    }

    onEmailSelected($event: any) {
        const resource = this.options.filter((option) =>
            option?.email?.toLowerCase().includes($event.value)
        );
        this.selectedResourceId = resource[0]?.id;
        this.loadData(this.selectedYear, this.selectedTabIndex);
    }

    private getCurrentMonthAndYear() {
        this.selectedYear = String(new Date().getFullYear());
        this.currentYear = String(new Date().getFullYear());
        this.selectedTabIndex = new Date().getMonth();
        this.currentMonth = new Date().getMonth();
    }

    private getProjectResources() {
        this.initialLoading = true;
        this.workLogService
            .getProjectResource({ projectId: this.projectId })
            .subscribe((res: any) => {
                this.initialLoading = false;
                if (res?.data) {
                    this.options = res?.data;
                    this.defaultResource = res?.data[0]?.email;
                    this.selectedResourceId = res?.data[0]?.id;
                    this.loadData(this.selectedYear, this.selectedTabIndex);
                }
                if (res?.tokenExpire) {
                    this.authService.updateAndReload(window.location);
                }
            });
    }

    private loadData(year: any, month: number) {
        this.initialLoading = true;

        const payload = {
            resourceId: this.selectedResourceId,
            projectId: this.projectId,
            month: ++month,
            year: year,
        };
        this.workLogService.getWorkLogs(payload).subscribe((res: any) => {
            this.initialLoading = false;
            if (!res?.error) {
                this.workLogsList = res?.data?.list;
                this.projectName = res?.data?.projectName;
            }
            if (res?.tokenExpire) {
                this.authService.updateAndReload(window.location);
            }
        });
    }
}
