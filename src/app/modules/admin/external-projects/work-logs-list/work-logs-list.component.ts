import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { LoggedInUserService } from '@modules/admin/common/services/logged-in-user.service';
import {
    MAT_SELECT_YEARS,
    MAT_TAB_MONTHS,
} from '@modules/admin/project/project-widget/common/constants';
import { WorkLogService } from '@modules/admin/project/project-widget/common/services/work-log.service';
import { AuthService } from '@services/auth/auth.service';
import { SnackBar } from 'app/core/utils/snackBar';
import { map, Observable, startWith } from 'rxjs';
import { AddEditWorkLogComponent } from '../add-edit-work-log/add-edit-work-log.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { WorkLogAllowEditDialogComponent } from '../work-log-allow-edit-dialog/work-log-allow-edit-dialog.component';
import { WorkLogShareComponent } from '../work-log-share/work-log-share.component';
import { ExternalProjectsApiService } from '../common/services/external-projects-api.service';

@Component({
    selector: 'app-work-logs-list',
    templateUrl: './work-logs-list.component.html',
    styleUrls: ['./work-logs-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class WorkLogsListComponent implements OnInit {
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
    defaultResourceName: any;
    currentMonth: number;
    currentYear: string = '';
    configEditWorklogStatus!: FormGroup;
    selectedResourceEmail: any[];
    checked: boolean = false;
    totalhours: number;
    yearAndMonth: any[] = [];
    isPmAddedAsResource: boolean = false;

    constructor(
        private matDialog: MatDialog,
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private fuseConfirmationService: FuseConfirmationService,
        private workLogService: WorkLogService,
        private snackBar: SnackBar,
        private loggedInService: LoggedInUserService,
        private externalProjectServiceApi: ExternalProjectsApiService
    ) {}

    ngOnInit(): void {
        // this.getCurrentMonthAndYear();
        this.routeSubscription();
        this.userState = this.authService.getUser();
        this.initializeConfigForm();
        this.getLoggedInUser();
        this.valueChangeSubscriptionForEmail();
    }

    _filter(value: any): any[] {
        const filterValue = value?.toLowerCase();
        return this.options.filter((option) =>
            option?.email?.toLowerCase().includes(filterValue)
        );
    }

    close() {}

    onTabChanged(event: any) {
        this.selectedTabIndex = event?.index;
        const index = this.yearAndMonth?.findIndex((year) => {
            return year?.year === this.selectedYear;
        });
        this.loadData(
            this.selectedYear,
            this.yearAndMonth[index]?.months[this.selectedTabIndex]?.value
        );

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

    onEmailSelected($event: any) {
        const resource = this.options.filter(
            (option) => option?.resource?.email === $event?.value
        );

        this.matTabList =
            resource[0]?.year[resource[0]?.year?.length - 1]?.months;

        this.selectedTabIndex = this.matTabList?.length - 1;

        this.yearAndMonth = resource[0]?.year;
        this.selectedYear =
            resource[0]?.year[resource[0]?.year?.length - 1]?.year;
        this.selectedResourceId = resource[0]?.resource?.resourceId;
        this.selectedResource = resource[0]?.resource?.firstName + " " + resource[0]?.resource?.lastName;
        this.checked = resource[0]?.resource?.allowEdit;
        this.loadData(
            this.selectedYear,
            resource[0]?.year[resource[0]?.year?.length - 1]?.months[
                resource[0]?.year[resource[0]?.year?.length - 1]?.months
                    ?.length - 1
            ]?.value
        );
    }

    clearSelectedEmail() {
        this.workLogsList = [];
        this.isEmailSelected = false;
        this.myControl?.setValue('');
        this.getCurrentMonthAndYear();
    }

    onYearChange(event: any) {
        const index = this.yearAndMonth?.findIndex((year) => {
            return year?.year === event?.value;
        });

        this.selectedYear = event?.value;
        this.matTabList = this.yearAndMonth[index]?.months;
        this.selectedTabIndex = this.matTabList?.length - 1;
        this.loadData(event?.value, this.matTabList[0]?.value);
    }

    onResourceIdChange(event: any) {
        this.loadData(this.selectedYear, this.selectedTabIndex);
    }

    goBack() {
        this.router.navigate([`/external-projects/details/${this.projectId}`]);
    }

    allowEditWorklog(e: any) {
        if (!this.checked) {
            e.source.checked = false;
            const dialogRef = this.matDialog.open(
                WorkLogAllowEditDialogComponent,
                {
                    disableClose: true,
                    autoFocus: false,
                    data: {
                        defaultResource: this.defaultResourceName,
                        selectedResource: this.selectedResource,
                        selectedResourceId: this.selectedResourceId,
                    },
                }
            );
            dialogRef.afterClosed().subscribe((result: any) => {
                if (result) {
                    this.checked = !this.checked;
                    const payload = {
                        projectId: this.projectId,
                        allowEdit: 'true',
                        resourceId: this.selectedResourceId,
                    };
                    this.initialLoading = true;
                    this.externalProjectServiceApi
                        .getAllowEditWorklog(payload)
                        .subscribe(
                            (res: any) => {
                                this.initialLoading = false;
                                if (res?.statusCode == 200) {
                                    this.snackBar.successSnackBar(
                                        'Worklog Edit Enabled'
                                    );
                                }
                            },
                            (err) => {
                                this.snackBar.errorSnackBar(err?.message);
                            }
                        );
                } else {
                }
            });
        } else {
            this.checked = !this.checked;
            const payload = {
                projectId: this.projectId,
                allowEdit: 'false',
                resourceId: this.selectedResourceId,
            };
            this.initialLoading = true;
            this.externalProjectServiceApi
                .getAllowEditWorklog(payload)
                .subscribe(
                    (res: any) => {
                        this.initialLoading = false;
                        if (res?.statusCode == 200) {
                            this.snackBar.successSnackBar(
                                'Worklog Edit Disabled'
                            );
                        }
                    },
                    (err) => {
                        this.snackBar.errorSnackBar(err?.message);
                    }
                );
        }
    }

    addOrEditWorklog(workLogData: any, mode: string) {
        const workLogdialogRef = this.matDialog.open(AddEditWorkLogComponent, {
            disableClose: true,
            width: '90%',
            maxWidth: '800px',
            maxHeight: '90vh',
            panelClass: 'warn-dialog-content',
            autoFocus: false,
            data: {
                data: workLogData,
                mode: mode,
                userState: this.userState,
                projectName: this.projectName,
                projectId: this.projectId,
                tabIndex: this.selectedTabIndex,
                loggedInUser: this.loggedInUser,
            },
        });
        workLogdialogRef.afterClosed().subscribe((result: any) => {
            if (result) {
                window.location.reload();
            }
        });
    }

    deleteWorkLog(id: number) {
        const dialogRef = this.fuseConfirmationService.open(
            this.configForm.value
        );

        dialogRef.afterClosed().subscribe((result) => {
            if (result == 'confirmed') {
                this.initialLoading = true;
                const payload = {
                    externalWorklog: [
                        {
                            id: id,
                            deleted: true,
                        },
                    ],
                };
                this.workLogService
                    .saveWorkLogs(payload)
                    .subscribe((res: any) => {
                        this.initialLoading = false;
                        if (!res?.error) {
                            this.snackBar.successSnackBar(res?.message);
                            window.location.reload();
                        }
                    });
            }
        });
    }

    shareDialog() {
        this.matDialog
            .open(WorkLogShareComponent, {
                width: '50%',
                data: {
                    projectId: this.projectId,
                    projectName: this.projectName,
                },
                disableClose: true,
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    window.location.reload();
                }
            });
    }

    private valueChangeSubscriptionForEmail() {
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map((value) => this._filter(value || ''))
        );
    }

    private getLoggedInUser() {
        this.initialLoading = true;
        this.loggedInService.getLoggedInUser().subscribe((res: any) => {
            this.initialLoading = false;
            if (res) {
                this.loggedInUser = res;
                this.userRole = res?.role;
                this.selectedResourceId = this.loggedInUser?.resourceId;
                this.getProjectResources();
            }
        });
    }

    private initializeConfigForm() {
        this.configForm = this.formBuilder.group({
            title: 'Delete work log',
            message: 'Are you sure you want to delete this work log?',
            icon: this.formBuilder.group({
                show: true,
                name: 'heroicons_outline:exclamation',
                color: 'warn',
            }),
            actions: this.formBuilder.group({
                confirm: this.formBuilder.group({
                    show: true,
                    label: 'Yes',
                    color: 'mat-warn',
                }),
                cancel: this.formBuilder.group({
                    show: true,
                    label: 'No',
                }),
            }),
            dismissible: false,
        });
    }

    private loadData(year: any, month: number) {
        this.initialLoading = true;

        const payload = {
            resourceId: this.selectedResourceId,
            projectId: this.projectId,
            month: month,
            year: year,
        };
        this.workLogService.getWorkLogs(payload).subscribe((res: any) => {
            this.initialLoading = false;
            if (!res?.error) {
                this.workLogsList = res?.data?.list;
                this.totalhours = res?.data?.totalhours;
                this.projectName = res?.data?.projectName;
            }
            if (res?.tokenExpire) {
                this.authService.updateAndReload(window.location);
            }
        });
    }

    private getCurrentMonthAndYear() {
        this.selectedYear = String(new Date().getFullYear());
        this.currentYear = String(new Date().getFullYear());
        this.selectedTabIndex = new Date().getMonth();
        this.currentMonth = new Date().getMonth();
        if (!(this.selectedTabIndex === new Date().getMonth())) {
            if (new Date().getDate() > 5) {
                this.disablePreviousWorklog = true;
            } else {
                this.disablePreviousWorklog = false;
            }
        }
    }

    private routeSubscription() {
        this.route.params.subscribe((projectId) => {
            if (projectId['id']) {
                this.projectId = projectId['id'];
            }
        });
    }

    private getProjectResources() {
        this.initialLoading = true;
        this.workLogService
            .getProjectResource(this.projectId)
            .subscribe((res: any) => {
                this.initialLoading = false;
                if (res?.data) {
                    if (
                        this.userRole === 'USER' ||
                        this.userRole === 'VENDOR'
                    ) {
                        const idx = res?.data?.findIndex(
                            (item) =>
                                item.resource.resourceId ===
                                this.loggedInUser?.resourceId
                        );
                        if (idx !== -1) {
                            this.options = res?.data;
                            this.yearAndMonth = res?.data[idx]?.year;
                            this.defaultResource = res?.data[idx]?.resource?.email;
                            this.defaultResourceName = res?.data[idx]?.resource?.firstName + " " + res?.data[0]?.resource?.lastName;
                            this.checked = res?.data[idx]?.resource?.allowEdit;
                            this.selectedResourceId = res?.data[idx]?.resource?.resourceId;

                            this.matTabList =
                                this.yearAndMonth[
                                    this.yearAndMonth?.length - 1
                                ]?.months;
                            this.selectedTabIndex = this.matTabList?.length - 1;

                            this.defaultResource =
                                res?.data[idx]?.resource?.email;
                            this.selectedResourceId =
                                res?.data[idx]?.resource?.resourceId;

                            this.selectedYear =
                                this.yearAndMonth[
                                    this.yearAndMonth?.length - 1
                                ]?.year;
                            this.loadData(
                                this.selectedYear,
                                this.yearAndMonth[0]?.months[0]?.value
                            );
                        }
                    } else {
                        this.options = res?.data;
                        this.yearAndMonth = res?.data[0]?.year;
                        this.defaultResource = res?.data[0]?.resource?.email;
                        this.defaultResourceName = res?.data[0]?.resource?.firstName + " " + res?.data[0]?.resource?.lastName;
                        this.checked = res?.data[0]?.resource?.allowEdit;
                        this.selectedResourceId = res?.data[0]?.resource?.resourceId;
                        this.matTabList =
                            this.yearAndMonth[
                                this.yearAndMonth?.length - 1
                            ]?.months;
                        this.selectedTabIndex = this.matTabList?.length - 1;

                        this.defaultResource = res?.data[0]?.resource?.email;
                        this.selectedResourceId =
                            res?.data[0]?.resource?.resourceId;

                        this.selectedYear =
                            this.yearAndMonth[
                                this.yearAndMonth?.length - 1
                            ]?.year;
                        this.loadData(
                            this.selectedYear,
                            this.yearAndMonth[0]?.months[0]?.value
                        );
                    }
                    this.checkPmAddedAsResource();
                }
                if (res?.tokenExpire) {
                    this.authService.updateAndReload(window.location);
                }
            });
    }
    private checkPmAddedAsResource() {
        const data = this.options?.filter((item) => {
            return item.resource.resourceId === this.loggedInUser?.resourceId;
        });
        this.isPmAddedAsResource = data?.length > 0 ? true : false;
    }
}
