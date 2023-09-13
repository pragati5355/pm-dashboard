import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
    MAT_SELECT_YEARS,
    MAT_TAB_MONTHS,
} from '@modules/admin/project/project-widget/common/constants';
import { WorkLogService } from '@modules/admin/project/project-widget/common/services/work-log.service';
import { WorkLogsService } from '@modules/public/services/work-logs.service';
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
        private authService: AuthService,
        private route: ActivatedRoute,
        private publicWorkLogService: WorkLogsService
    ) {}

    ngOnInit(): void {
        this.routeSubscription();
        this.getCurrentMonthAndYear();
        this.getProjectResources();
    }

    onYearChange(event: any) {
        this.loadData(event?.value, this.selectedTabIndex);
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
        this.loadData(this.selectedYear, this.selectedTabIndex);

        if (!(this.selectedTabIndex === new Date().getMonth())) {
            if (new Date().getDate() > 5) {
                this.disablePreviousWorklog = true;
            } else {
                this.disablePreviousWorklog = false;
            }
        } else {
            this.disablePreviousWorklog = false;
        }
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
                if (res?.code === 401) {
                    this.authService.updateAndReload(window.location);
                }
            });
    }

    private loadData(year: any, month: number) {
        this.initialLoading = true;

        const payload = {
            resourceId: this.selectedResourceId,
            key: this.projectId,
            month: ++month,
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
