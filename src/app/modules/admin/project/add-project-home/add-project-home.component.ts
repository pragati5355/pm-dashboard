import {
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
    HostListener,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
    ROLE_LIST,
    ValidationConstants,
} from '../../../../core/constacts/constacts';
import { StaticData } from '../../../../core/constacts/static';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MatStepper } from '@angular/material/stepper';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs';
import { map } from 'rxjs';
import { IDeactivateComponent } from '@services/deactivate-service/decativate.guard';
import {
    TextRegexValidator,
    RegexConstants,
    noWhitespaceValidator,
} from '../../../../core/utils/Validations';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@services/auth/auth.service';
import { CreateProjecteService } from '@services/create-projecte.service';
import { SnackBar } from '../../../../core/utils/snackBar';
import { ObjectValidation } from '../../../../core/utils/Validations';
import { ConnectJiraPopupComponent } from '@modules/admin/project/connect-jira-popup/connect-jira-popup.component';
import { AddFormService } from '@services/add-form.service';
import { ErrorMessage } from 'app/core/constacts/constacts';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import {
    TeamMember,
    ManagerList,
    JiraUser,
    JiraTeamUser,
} from './model/add-project-models';
import { DatePipe } from '@angular/common';
import {
    UPDATED_UTILIZATION_VALUES,
    UTILIZATION_VALUES,
} from '@modules/admin/external-projects/common/constants';
import { EditProjectReasonDialogComponent } from '../edit-project-reason-dialog/edit-project-reason-dialog.component';
import _ from 'lodash';

@Component({
    selector: 'app-add-project-home',
    templateUrl: './add-project-home.component.html',
    styleUrls: ['./add-project-home.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: { 'window:beforeunload': 'doSomething' },
})
export class AddProjectHomeComponent
    implements OnInit, OnDestroy, IDeactivateComponent
{
    @ViewChild('stepper', { static: false }) stepper!: MatStepper;
    @ViewChild('drawer') drawer!: MatDrawer;
    @HostListener('window:beforeunload', ['$event'])
    public onPageUnload($event: BeforeUnloadEvent) {
        if (!this.canExit()) {
            $event.returnValue = true;
        }
    }
    pageTitle = 'Add';
    editProjectId: any;
    project_manager = new FormControl();
    configForm!: FormGroup;
    editProject = false;
    selectJiraUser = '';
    selectManager = '';
    teamJiraUser = false;
    isAddTeam = true;
    selectedIndex = 0;
    showStep = 1;
    initialLoading: boolean = false;
    submitInProcess: boolean = false;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    projectDetails!: FormGroup;
    clientDetials!: FormGroup;
    projectSetting!: FormGroup;
    projectTeam!: FormGroup;
    disableTextbox = false;
    filteredTeamMember: any = [];
    filteredEditClientList: any = [];
    jiraProjectList: any = [];
    filteredEmails: Observable<any[]>;
    emailList: any[] = [];
    technologies = new FormControl();
    list: any = [
        { id: 1, name: 'Metrics', key: 'MT' },
        { id: 2, name: 'ChatBiopsy', key: 'CB' },
        { id: 2, name: 'BL', key: 'BL' },
    ];
    settingProjectName = '';
    selection = [];
    clientData: any = [];
    selectRoleList = StaticData.TEAM_MEMBER_ROLE;
    selectFomList: any = [];
    teamMemberList: any = [];
    managerEditTeamLIst: any = [];
    editteamMemberList: any = [];
    filteredTeamMembers!: Observable<any[]> | undefined;
    filteredManagerLists!: Observable<any[]> | undefined;
    filteredJiraUsers!: Observable<any[]> | undefined;
    filteredTeamJiraUsers!: Observable<any[]> | undefined;
    projectData: any;
    isResourceOnBench: boolean = false;
    isShadowResource: boolean = false;
    markResourceAsBench: boolean = false;
    markResourceAsShadow: boolean = false;
    resourceSpecificTechnologies: any[] = [];
    resourceTechnologyList: any[] = [];
    get projectDetailsForm(): { [key: string]: AbstractControl } {
        return this.projectDetails.controls;
    }
    get clientDetailForm(): { [key: string]: AbstractControl } {
        return this.clientDetials.controls;
    }
    get projectSettingsForm(): { [key: string]: AbstractControl } {
        return this.projectSetting.controls;
    }
    get projectTeamForm(): { [key: string]: AbstractControl } {
        return this.projectTeam.controls;
    }
    teamMembers: TeamMember[] = [];
    managerLists: ManagerList[] = [];
    selectedJiraUser: any = [];
    selectedTeamMember: any = [];
    jiraUsers: JiraUser[] = [];
    jiraTeamUsers: JiraTeamUser[] = [];
    userData: any;
    clientDtailsList: any = [];
    routeSubscribe: any;
    changeForm: number = 0;
    ROLE_LIST: string[] = ROLE_LIST;
    editMemberMode = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    utilizationValues: any[] = UPDATED_UTILIZATION_VALUES;
    currentCapacity: number;
    editProjectEndDateReason: string = '';
    editResourceEndDateReason: string = '';
    prevDate: any;
    newDate: any;
    resourcePrevDate: any;
    resourceNewDate: any;
    originalTeamMemberList: any[] = [];

    constructor(
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _authService: AuthService,
        private dialog: MatDialog,
        private router: Router,
        private ProjectService: CreateProjecteService,
        private snackBar: SnackBar,
        private _route: ActivatedRoute,
        private formService: AddFormService,
        private datePipe: DatePipe
    ) {}

    ngOnInit(): void {
        this.userData = this._authService.getUser();
        this.initializeAllForms();
        this.routeSubscribeAndExtractInfo();
        this.initializeFuseWatcherService();
        this.getFormList();
        this.filterFunctions();
        this.initializeConfigForm();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    getFormList() {
        this.initialLoading = true;
        this.formService
            .getFormListWithoutPagination()
            .subscribe((res: any) => {
                this.selectFomList = res?.data;
                this.initialLoading = false;
            });
    }

    resourceEndDate(event: any) {
        if (this.editProject) {
            const newDate = this.datePipe.transform(
                event?.target?.value,
                'dd-MM-yyyy'
            );

            if (newDate !== this.resourcePrevDate) {
                const dialogRef = this.dialog.open(
                    EditProjectReasonDialogComponent,
                    {
                        disableClose: true,
                        width: '40%',
                        panelClass: 'warn-dialog-content',
                        autoFocus: false,
                        data: {
                            prevEndDate: this.resourcePrevDate,
                            newEndDate: newDate,
                            prefiledReason: this.editResourceEndDateReason,
                        },
                    }
                );
                dialogRef.afterClosed().subscribe((result: any) => {
                    if (result) {
                        this.editResourceEndDateReason = result?.reason;
                    }
                });
            }
        }
    }

    editMember(index: number, teamMember: any) {
        this.getAvailableCapacity(teamMember?.email);

        const currentResource = this.originalTeamMemberList?.filter(
            (resource) => resource?.email === teamMember?.email
        );

        if (currentResource?.length > 0) {
            this.currentCapacity =
                this.currentCapacity + (currentResource[0]?.utilization || 0);
        }

        this.editResourceEndDateReason = teamMember?.extendedReason
            ? teamMember?.extendedReason
            : '';
        this.editMemberMode = true;

        this.resourcePrevDate = this.datePipe.transform(
            teamMember?.endDate,
            'dd-MM-yyyy'
        );

        this.resourceSpecificTechnologies = this.emailList
            ?.filter((item) => item?.email === teamMember?.email)
            .map((item) => item?.technologies)[0];

        this.projectTeam.patchValue({
            team_member: this.findTeamMember(teamMember?.resourceId),
            select_role: teamMember?.role,
            team_jira_user: this.findJiraUser(teamMember?.jiraUserName),
            tm_utilization: teamMember?.utilization,
            startDate: teamMember?.startDate
                ? this.datePipe.transform(
                      teamMember?.startDate,
                      "yyyy-MM-dd'T'HH:mm:ss.SSS'Z"
                  )
                : null,
            endDate: teamMember?.endDate
                ? this.datePipe.transform(
                      teamMember?.endDate,
                      "yyyy-MM-dd'T'HH:mm:ss.SSS'Z"
                  )
                : null,
        });

        this.markResourceAsBench = teamMember?.bench;
        this.markResourceAsShadow = teamMember?.shadow;
        // this.technologies.setValue([
        //     {
        //         id: 128,
        //         createdAt: null,
        //         lastModifiedAt: null,
        //         isDeleted: false,
        //         technologyId: 5,
        //         name: 'Angular',
        //         experienceYear: 1,
        //         experienceMonth: 2,
        //         resourceId: 221,
        //         deleted: false,
        //     },
        //     {
        //         id: 129,
        //         createdAt: null,
        //         lastModifiedAt: null,
        //         isDeleted: false,
        //         technologyId: 46,
        //         name: 'python',
        //         experienceYear: 2,
        //         experienceMonth: 4,
        //         resourceId: 221,
        //         deleted: false,
        //     },
        // ])

        this.resourceTechnologyList = this.resourceSpecificTechnologies?.filter(
            (a) => teamMember?.technologies?.some((b) => a?.id === b?.id)
        );
    }

    findJiraUser(accountId: string) {
        const filteredJiraUser = this.jiraUsers?.filter(
            (user) => user?.accountId === accountId
        );

        return filteredJiraUser?.length > 0 ? filteredJiraUser[0] : null;
    }

    getAvailableCapacity(email: any) {
        const value = this.emailList.filter((item: any) => {
            return item?.email === email;
        });
        this.currentCapacity = value[0]?.capacity;
    }

    private findTeamMember(id) {
        const selectedTeamMember = this.teamMembers?.filter(
            (item) => item?.id === id
        );
        if (selectedTeamMember?.length > 0) {
            return selectedTeamMember[0];
        } else {
            return null;
        }
    }

    filterFunctions() {
        this.filteredTeamMembers = this.projectTeam
            .get('team_member')
            ?.valueChanges.pipe(
                startWith(''),
                map((teamMember) =>
                    teamMember
                        ? this.filterTeamMembers(teamMember)
                        : this.filterTeamMemberSlice()
                )
            );
        this.filteredManagerLists = this.projectTeam
            .get('project_manager')
            ?.valueChanges.pipe(
                startWith(''),
                map((managerList) =>
                    managerList
                        ? this.filterManagerLists(managerList)
                        : this.filterManagerListsSlice()
                )
            );
        this.filteredJiraUsers = this.projectTeam
            .get('jira_user')
            ?.valueChanges.pipe(
                startWith(''),
                map((jiraUser) =>
                    jiraUser
                        ? this.filterJiraUsers(jiraUser)
                        : this.filterJiraUsersSlice()
                )
            );
        this.filteredTeamJiraUsers = this.projectTeam
            .get('team_jira_user')
            ?.valueChanges.pipe(
                startWith(''),
                map((jiraTeamUser) =>
                    jiraTeamUser
                        ? this.filterTeamJiraUsers(jiraTeamUser)
                        : this.filterTeamJiraUsersSlice()
                )
            );
    }
    filterTeamMembers(value: any) {
        if (typeof value == 'object') {
            return this.teamMembers.filter(
                (teamMember: any) =>
                    teamMember.firstname
                        ?.toLowerCase()
                        ?.indexOf(value?.firstname.toLowerCase()) === 0 &&
                    !this.selectedTeamMember?.includes(teamMember.id) &&
                    teamMember.id !==
                        this.projectTeam?.value?.project_manager?.id
            );
        } else {
            return this.teamMembers?.filter(
                (teamMember: any) =>
                    teamMember?.firstname
                        ?.toLowerCase()
                        ?.indexOf(value?.toLowerCase()) === 0 &&
                    !this.selectedTeamMember?.includes(teamMember?.id) &&
                    teamMember?.id !==
                        this.projectTeam?.value?.project_manager?.id
            );
        }
    }
    filterTeamMemberSlice() {
        return this.teamMembers?.filter(
            (TeamMember) =>
                !this.selectedTeamMember.includes(TeamMember.id) &&
                TeamMember?.id !== this.projectTeam?.value?.project_manager?.id
        );
    }
    filterManagerLists(value: any) {
        if (typeof value == 'object') {
            return this.managerLists.filter(
                (ManagerList: any) =>
                    ManagerList?.firstName
                        .toLowerCase()
                        .indexOf(value?.firstName?.toLowerCase()) === 0 &&
                    !this.selectedTeamMember.includes(ManagerList?.id) &&
                    ManagerList?.id !==
                        this.projectTeam?.value?.project_manager?.id
            );
        } else {
            return this.managerLists.filter(
                (ManagerList: any) =>
                    ManagerList.firstName
                        .toLowerCase()
                        .indexOf(value.toLowerCase()) === 0 &&
                    !this.selectedTeamMember.includes(ManagerList.id) &&
                    ManagerList.id !== this.projectTeam.value.project_manager.id
            );
        }
    }
    filterManagerListsSlice() {
        return this.managerLists.filter(
            (ManagerList) =>
                !this.selectedTeamMember.includes(ManagerList?.id) &&
                !this.selectedTeamMember.includes(ManagerList?.id) &&
                ManagerList?.id !== this.projectTeam?.value?.project_manager?.id
        );
    }
    filterJiraUsers(value: any) {
        if (typeof value == 'object') {
            return this.jiraUsers.filter(
                (JiraUser: any) =>
                    JiraUser?.displayName
                        .toLowerCase()
                        .indexOf(value?.displayName?.toLowerCase()) === 0 &&
                    !this.selectedJiraUser?.includes(JiraUser?.displayName)
            );
        } else {
            return this.jiraUsers.filter(
                (JiraUser: any) =>
                    JiraUser?.displayName
                        .toLowerCase()
                        .indexOf(value.toLowerCase()) === 0 &&
                    !this.selectedJiraUser.includes(JiraUser?.displayName)
            );
        }
    }
    filterJiraUsersSlice() {
        return this.jiraUsers.filter(
            (JiraUser) =>
                !this.selectedJiraUser.includes(JiraUser?.displayName) &&
                !this.selectedJiraUser.includes(JiraUser?.displayName)
        );
    }
    filterTeamJiraUsers(value: any) {
        if (typeof value == 'object') {
            return this.jiraTeamUsers.filter(
                (JiraTeamUser: any) =>
                    JiraTeamUser?.displayName
                        .toLowerCase()
                        .indexOf(value?.displayName?.toLowerCase()) === 0 &&
                    !this.selectedJiraUser.includes(
                        JiraTeamUser?.displayName
                    ) &&
                    JiraTeamUser?.displayName !==
                        this.projectTeam?.value?.jira_user?.displayName
            );
        } else {
            return this.jiraTeamUsers.filter(
                (JiraTeamUser: any) =>
                    JiraTeamUser?.displayName
                        .toLowerCase()
                        .indexOf(value.toLowerCase()) === 0 &&
                    !this.selectedJiraUser.includes(
                        JiraTeamUser?.displayName
                    ) &&
                    JiraTeamUser?.displayName !==
                        this.projectTeam?.value?.jira_user?.displayName
            );
        }
    }
    filterTeamJiraUsersSlice() {
        return this.jiraTeamUsers.filter(
            (JiraTeamUser) =>
                !this.selectedJiraUser.includes(JiraTeamUser?.displayName) &&
                !this.selectedJiraUser.includes(JiraTeamUser?.displayName) &&
                JiraTeamUser?.displayName !==
                    this.projectTeam?.value?.jira_user?.displayName
        );
    }

    toggle() {
        this.drawerOpened = !this.drawerOpened;
    }

    // resourceOnBench(value: boolean) {
    //     this.isResourceOnBench = value ? true : false;
    // }

    // shadowResource(value: boolean) {
    //     this.isShadowResource = value ? true : false;
    // }

    goBack(stepper: any) {
        this.selectedIndex = stepper;
        if (this.selectedIndex == 0) {
            // this.projectDetails.reset(this.projectDetails.value);
            this.showStep = 1;
        } else if (this.selectedIndex == 1) {
            this.clientDetials.reset(this.clientDetials.value);
            this.showStep = 2;
        } else if (this.selectedIndex == 2) {
            this.showStep = 3;
            this.projectSetting.reset(this.projectSetting.value);
        } else if (this.selectedIndex == 3) {
            this.getTeamMember();
            this.showStep = 4;
            this.projectTeam.reset(this.projectTeam.value);
        }
    }
    public selectionChange($event: any): void {
        if ($event.selectedIndex == 0) {
            this.showStep = 1;
            // this.projectDetails.reset(this.projectDetails.value);
        } else if ($event.selectedIndex == 1) {
            this.showStep = 2;
            this.clientDetials.reset(this.clientDetials.value);
        } else if ($event.selectedIndex == 2) {
            this.showStep = 3;
            this.projectSetting.reset(this.projectSetting.value);
        } else if ($event.selectedIndex == 3) {
            this.getTeamMember();
            this.showStep = 4;
            this.projectTeam.reset(this.projectTeam.value);
        }
        this.selectedIndex = $event.selectedIndex;
    }
    public goto(index: number): void {
        if (index == 0) return; // First step is not selected anymore -ok

        this.selectedIndex = index;
    }
    send(): void {
        if (!this.projectSetting.invalid) {
            let payload = {
                url:
                    'https://' +
                    this.projectSetting?.value?.url +
                    '.atlassian.net',
                email: this.projectSetting?.value?.email,
                password: this.projectSetting?.value?.token,
                jiraKey: this.projectSetting?.get('project')?.value,
            };
            this.submitInProcess = true;
            this._authService.connectJira(payload).subscribe(
                (res: any) => {
                    if (res?.data?.length > 0) {
                        if (this.editProject == false) {
                            const dialogRef = this.dialog.open(
                                ConnectJiraPopupComponent,
                                {
                                    disableClose: true,
                                    panelClass: 'warn-dialog-content',
                                    autoFocus: false,
                                    data: {
                                        projectList: res?.data,
                                        settingProjectName:
                                            this.projectSetting?.value?.project,
                                    },
                                }
                            );
                            dialogRef.afterClosed().subscribe((result: any) => {
                                if (result && result?.project) {
                                    this.settingProjectName = result?.project;
                                    this.projectSetting.patchValue({
                                        project: result?.project,
                                    });
                                    let jiraProjectListResult = res?.data;
                                    this.jiraProjectList =
                                        jiraProjectListResult.filter(
                                            (item: any) =>
                                                item.key ==
                                                this.settingProjectName
                                        );

                                    payload.jiraKey = result?.project;

                                    this.ProjectService.getJiraUser(
                                        payload
                                    ).subscribe(
                                        (res: any) => {
                                            this.submitInProcess = false;
                                            if (res?.data?.length > 0) {
                                                this.jiraUsers = res?.data;
                                                this.jiraTeamUsers = res?.data;
                                                if (this.editProject == true) {
                                                    let projectManagerdata =
                                                        this.jiraUsers?.filter(
                                                            (JiraUsers: any) =>
                                                                JiraUsers.displayName ==
                                                                this
                                                                    .managerEditTeamLIst[0]
                                                                    ?.jiraUser
                                                        );
                                                    this.projectTeam.patchValue(
                                                        {
                                                            jira_user:
                                                                projectManagerdata[0]
                                                                    ? projectManagerdata[0]
                                                                    : null,
                                                        }
                                                    );
                                                }
                                            } else {
                                                this.submitInProcess = false;
                                                if (res?.data?.error) {
                                                    this.snackBar.errorSnackBar(
                                                        res?.data?.error
                                                    );
                                                } else {
                                                    this.snackBar.errorSnackBar(
                                                        'Jira user not found'
                                                    );
                                                }
                                            }
                                        },
                                        (error) => {
                                            this.submitInProcess = false;
                                        }
                                    );
                                }
                            });
                        }
                        if (this.editProject == true) {
                            let jiraProjectListResult = res?.data;
                            this.jiraProjectList = jiraProjectListResult.filter(
                                (item: any) =>
                                    item.key == this.settingProjectName
                            );
                        }

                        this.ProjectService.getJiraUser(payload).subscribe(
                            (res: any) => {
                                this.submitInProcess = false;
                                if (res?.data?.length > 0) {
                                    this.jiraUsers = res?.data;
                                    this.jiraTeamUsers = res?.data;
                                    if (this.editProject == true) {
                                        let projectManagerdata =
                                            this.jiraUsers?.filter(
                                                (JiraUsers: any) =>
                                                    JiraUsers.displayName ==
                                                    this.managerEditTeamLIst[0]
                                                        ?.jiraUser
                                            );
                                        this.projectTeam.patchValue({
                                            jira_user: projectManagerdata[0]
                                                ? projectManagerdata[0]
                                                : null,
                                        });
                                    }
                                } else {
                                    this.submitInProcess = false;
                                    if (res?.data?.error) {
                                        this.snackBar.errorSnackBar(
                                            res?.data?.error
                                        );
                                    } else {
                                        this.snackBar.errorSnackBar(
                                            'Jira user not found'
                                        );
                                    }
                                }
                            },
                            (error) => {
                                this.submitInProcess = false;
                            }
                        );
                    } else {
                        this.submitInProcess = false;
                        if (res?.data?.error) {
                            this.snackBar.errorSnackBar('server error');
                        } else {
                            this.snackBar.errorSnackBar('Jira user not found');
                        }
                    }
                },
                (error) => {
                    this.submitInProcess = false;
                }
            );
        }
    }
    addTeamMember() {
        if (this.projectTeam?.value?.startDate === '') {
            this.snackBar.errorSnackBar('Start date is mandatory');
            return;
        }

        if (this.projectTeam?.value?.endDate === '') {
            this.snackBar.errorSnackBar('End date is mandatory');
            return;
        }

        if (this.projectTeam?.get('select_role')?.value === '') {
            this.snackBar.errorSnackBar('Select role');
            return;
        }

        if (this.projectTeam?.get('team_jira_user')?.value === '') {
            this.snackBar.errorSnackBar('Select Jira Username');
            return;
        }

        if (this.projectTeam?.value?.tm_utilization === '') {
            this.snackBar.errorSnackBar('Select utilization');
            return;
        }

        if (
            this.resourceTechnologyList?.length < 1 &&
            this.projectTeam?.get('select_role')?.value !== 'PM'
        ) {
            this.snackBar.errorSnackBar('Add technologies');
            return;
        }

        let foundResourceEmail = false;

        this.teamMemberList.forEach((item) => {
            if (item?.email === this.projectTeam.get('email')?.value) {
                foundResourceEmail = true;
            }
        });

        // if (!foundResourceEmail && !this.editMemberMode) {
        //     this.snackBar.errorSnackBar('Resource email not found');
        //     return;
        // }

        if (this.editMemberMode) {
            this.teamMemberList.map((item) => {
                if (
                    item?.resourceId ===
                    this.projectTeam?.value?.team_member?.id
                ) {
                    item.resourceId = this.projectTeam?.value?.team_member?.id;
                    item.firstname =
                        this.projectTeam?.value?.team_member?.firstname;
                    item.startDate = this.projectTeam?.value?.startDate;
                    item.endDate = this.projectTeam?.value?.endDate;
                    item.role = this.projectTeam?.value?.select_role;
                    item.utilization = this.projectTeam?.value?.tm_utilization;
                    item.jiraUserName =
                        this.projectTeam?.value?.team_jira_user?.accountId;
                    item.deleted = false;
                    item.technologies =
                        this.projectTeam?.get('select_role')?.value === 'PM'
                            ? []
                            : this.resourceTechnologyList;
                    item.bench = this.markResourceAsBench;
                    item.shadow = this.markResourceAsShadow;
                    item.extendedReason = this.editResourceEndDateReason;
                }
                this.editMemberMode = false;
                return item;
            });
        } else {
            this.teamMemberList = [
                ...this.teamMemberList,
                {
                    resourceId: this.projectTeam?.value?.team_member?.id,
                    email: this.projectTeam?.value?.team_member?.email,
                    firstname: this.projectTeam?.value?.team_member?.firstname,
                    jiraUserName:
                        this.projectTeam?.value?.team_jira_user?.accountId,
                    startDate: this.projectTeam?.value?.startDate,
                    endDate: this.projectTeam?.value?.endDate,
                    role: this.projectTeam?.value?.select_role,
                    utilization: this.projectTeam?.value?.tm_utilization,
                    deleted: false,
                    bench: this.markResourceAsBench,
                    shadow: this.markResourceAsShadow,
                    technologies: this.resourceTechnologyList,
                },
            ];
            this.selectedJiraUser = [
                ...this.selectedJiraUser,
                this.projectTeam?.value?.team_jira_user?.displayName,
            ];
            this.selectedTeamMember = [
                ...this.selectedTeamMember,
                this.projectTeam?.value?.team_member?.id,
            ];
        }

        this.resourceTechnologyList = [];
        this.projectTeam.get('email')?.setValue('');
        this.resourceSpecificTechnologies = [];
        this.projectTeam.controls['team_member'].reset();
        this.projectTeam.controls['select_role'].reset();
        this.projectTeam.controls['team_jira_user'].reset();
        this.projectTeam.controls['startDate'].setValue(
            this.projectDetails?.get('startDate')?.value
        );
        this.projectTeam.controls['endDate'].setValue(
            this.projectDetails?.get('endDate')?.value
        );
        this.projectTeam.controls['tm_utilization'].reset();
        this.markResourceAsBench = false;
        this.markResourceAsShadow = false;
    }
    deleteTeamMember(index: any, teamMember: any) {
        if (teamMember?.id) {
            this.teamMemberList[index]['deleted'] = true;
        } else {
            this.teamMemberList.splice(index, 1);
        }

        // this.projectTeam.controls['team_member'].reset();
        // this.projectTeam.controls['select_role'].reset();
        // this.projectTeam.controls['team_jira_user'].reset();
        this.selectedJiraUser = this.selectedJiraUser.filter(
            (arrayItem: any) => arrayItem !== teamMember?.teamMemberId
        );
        this.selectedTeamMember = this.selectedTeamMember.filter(
            (arrayItem: any) => arrayItem !== teamMember?.jiraUser
        );
        this.filterFunctions();
    }
    clearProjectTeam() {
        this.projectTeam?.reset();
        this.markResourceAsBench = false;
        this.markResourceAsShadow = false;
        this.resourceSpecificTechnologies = [];
        this.resourceTechnologyList = [];
        this.projectTeam
            ?.get('startDate')
            ?.setValue(this.projectDetails?.get('startDate')?.value);
        this.projectTeam
            ?.get('endDate')
            ?.setValue(this.projectDetails?.get('endDate')?.value);
    }
    submitProjectDetails() {
        if (!this.projectDetails.invalid) {
            this.selectedIndex = 1;
        }
    }
    submitProjectClientDetails() {
        if (!this.clientDetials.invalid) {
            this.selectedIndex = 2;
            this.clientDtailsList = [
                {
                    firstName: this.clientDetials?.value?.firstName,
                    lastName: this.clientDetials?.value?.lastName,
                    emailId: this.clientDetials?.value?.email,
                    id: this.clientDetials?.value?.id,
                    deleted: false,
                },
                {
                    firstName: this.clientDetials?.value?.firstName2,
                    lastName: this.clientDetials?.value?.lastName2,
                    emailId: this.clientDetials?.value?.email2,
                    id: this.clientDetials?.value?.id2,
                    deleted: false,
                },
                {
                    firstName: this.clientDetials?.value?.firstName3,
                    lastName: this.clientDetials?.value?.lastName3,
                    emailId: this.clientDetials?.value?.email3,
                    id: this.clientDetials?.value?.id3,
                    deleted: false,
                },
            ];
            this.clientDtailsList = this.clientDtailsList
                .filter(
                    (item: any) =>
                        (item?.firstName !== '' || item?.lastName !== '') &&
                        (item?.firstName !== null || item?.lastName !== null)
                )
                .map((item) => {
                    if (!item?.id) {
                        delete item?.id;
                    }
                    return item;
                });
        }
    }
    submitProjectSetting() {
        if (!this.projectSetting.invalid) {
            this.selectedIndex = 3;
        }
    }
    createProject() {
        if (!this.projectTeam.invalid) {
            if (this.teamMemberList.length > 0) {
                let payload = {
                    projectDetails: {
                        name: this.projectDetails?.value?.projectName,
                        description:
                            this.projectDetails?.value?.projectDescription,
                        jiraKey: this.projectSetting?.value?.project,
                        jiraUuid: this.jiraProjectList[0]?.uuid,
                        private: this.jiraProjectList[0]?.private,
                        jiraProjectId: this.jiraProjectList[0]?.id,
                        formId: this.projectDetails?.value?.feedback_form,
                        startDate: this.projectDetails?.value?.startDate,
                        endDate: this.projectDetails?.value?.endDate,
                    },
                    clientDetails: this.clientDtailsList,
                    baseUrl:
                        'https://' +
                        this.projectSetting?.value?.url +
                        '.atlassian.net',
                    apiKey: this.projectSetting?.value?.token,
                    adminEmail: this.projectSetting?.value?.email,
                    addedBy: this.userData?.userId,
                    teamDetails: this.teamMemberList,
                };

                this.submitInProcess = true;

                this.ProjectService.createProject(payload).subscribe(
                    (res: any) => {
                        this.submitInProcess = false;
                        if (!res.error) {
                            this.snackBar.successSnackBar(
                                'Project created successFully'
                            );
                            this.projectDetails.reset();
                            this.clientDetials.reset();
                            this.projectSetting.reset();
                            this.projectTeam.reset();
                            this.teamMemberList = [];
                            this.settingProjectName = '';
                            this.router.navigate(['/projects/']);
                        } else {
                            this.snackBar.errorSnackBar(res?.message);
                            if (res?.message == 'Project already exists') {
                                this.selectedIndex = 2;
                                this.projectTeam.reset();
                                this.teamMemberList = [];
                            }
                        }
                        if (res?.tokenExpire == true) {
                            this.snackBar.errorSnackBar(
                                ErrorMessage.ERROR_SOMETHING_WENT_WRONG
                            );
                            this._authService.updateAndReload(window.location);
                        }
                    },
                    (error) => {
                        this.submitInProcess = false;
                        this.snackBar.errorSnackBar('server error');
                    }
                );
            } else {
                this.isAddTeam = false;
                this.snackBar.errorSnackBar(
                    'Please feel free to click Add button above, before submitting !'
                );
            }
        }
    }
    goToList() {
        this.router.navigate(['/projects/']);
    }
    getTeamMember() {
        let payload = {
            technology: [],
            minExp: null,
            maxExp: null,
            projects: [],
            perPageData: 0,
            totalPerPageData: 0,
            name: '',
            isBench: false,
            isShadow: false,
        };
        this.initialLoading = true;
        this.ProjectService.getTeamMember(payload).subscribe(
            (res: any) => {
                this.initialLoading = false;
                this.teamMembers = res?.data?.teamMember;
                this.managerLists = res?.data?.teamMember;
                this.filterFunctions();
                if (this.editProject == true) {
                    let projectManagerdata = this.managerLists?.filter(
                        (ManagerList: any) =>
                            ManagerList.id ==
                            this.managerEditTeamLIst[0]?.teamMemberId
                    );
                    if (projectManagerdata) {
                        this.projectTeam.patchValue({
                            project_manager: projectManagerdata[0]
                                ? projectManagerdata[0]
                                : null,
                        });
                    }
                }
            },
            (error) => {
                this.initialLoading = false;
                this.snackBar.errorSnackBar('Server error');
            }
        );
    }

    selectedJiraUserOption(event: any) {
        const selectedValue = event?.option?.value;
        this.filteredTeamJiraUsers = this.projectTeam
            .get('team_jira_user')
            ?.valueChanges.pipe(
                startWith(''),
                map((jiraTeamUser) =>
                    jiraTeamUser
                        ? this.filterTeamJiraUsers(jiraTeamUser)
                        : this.filterTeamJiraUsersSlice()
                )
            );
    }

    getTechnologiesValue(value: any) {
        this.resourceTechnologyList = value;
    }
    selectedManagerOption(event: any) {
        const selectedValue = event?.option?.value;
        this.filteredTeamMembers = this.projectTeam
            .get('team_member')
            ?.valueChanges.pipe(
                startWith(''),
                map((teamMember) =>
                    teamMember
                        ? this.filterTeamMembers(teamMember)
                        : this.filterTeamMemberSlice()
                )
            );
        this.filteredManagerLists = this.projectTeam
            .get('project_manager')
            ?.valueChanges.pipe(
                startWith(''),
                map((managerList) =>
                    managerList
                        ? this.filterManagerLists(managerList)
                        : this.filterManagerListsSlice()
                )
            );
    }
    canExit(): boolean {
        if (!this.projectDetails?.pristine) {
            return false;
        }
        return true;
    }
    isEmptyStr(val: any) {
        return val === undefined ||
            val === null ||
            val === '+' ||
            val?.length <= 0 ||
            val?.trim()?.length === 0
            ? null
            : val?.trim();
    }
    displayFn(user?: ManagerList): string | any {
        return user ? user?.firstname + ' ' + user?.lastname : null;
    }
    displayFnResource(resource?: any): string | any {
        return resource?.email || null;
    }
    displayFnJiraManager(user?: JiraTeamUser): string | any {
        return user ? user?.displayName : null;
    }
    displayFnJiraTeam(user?: JiraUser): string | any {
        return user ? user?.displayName : null;
    }
    fetchEditproject(id: number) {
        let payload = {
            id: id,
        };
        this.initialLoading = true;
        this.ProjectService.getOneProjectDetails(payload).subscribe(
            (res: any) => {
                this.initialLoading = false;
                this.projectData = res?.data?.project;
                this.clientData = res?.data?.clientModels;
                this.settingProjectName = res?.data?.project?.jiraKey;

                const projectsetting = res?.data?.authUser;

                const dummyStartDate = new Date();

                const dummyEndDate = new Date();

                this.projectDetails.patchValue({
                    projectName: this.projectData?.name
                        ? this.projectData?.name
                        : '',
                    projectDescription: this.projectData?.description
                        ? this.projectData?.description
                        : '',
                    feedback_form: this.projectData?.formId
                        ? this.projectData?.formId
                        : '',
                    startDate: this.projectData?.startDate
                        ? this.datePipe.transform(
                              this.projectData?.startDate,
                              "yyyy-MM-dd'T'HH:mm:ss.SSS'Z"
                          )
                        : dummyStartDate,
                    endDate: this.projectData?.endDate
                        ? this.datePipe.transform(
                              this.projectData?.endDate,
                              "yyyy-MM-dd'T'HH:mm:ss.SSS'Z"
                          )
                        : dummyEndDate,
                });

                this.projectEndDateValueSubscription(
                    this.projectData?.endDate
                        ? this.projectData?.endDate
                        : dummyEndDate
                );

                this.clientDetials.patchValue({
                    id:
                        this.clientData?.length > 0
                            ? this.clientData[0]?.id
                                ? this.clientData[0]?.id
                                : ''
                            : null,
                    firstName:
                        this.clientData?.length > 0
                            ? this.clientData[0]?.firstName
                                ? this.clientData[0]?.firstName
                                : ''
                            : null,
                    lastName:
                        this.clientData?.length > 0
                            ? this.clientData[0]?.lastName
                                ? this.clientData[0]?.lastName
                                : ''
                            : null,
                    email:
                        this.clientData?.length > 0
                            ? this.clientData[0]?.emailId
                                ? this.clientData[0]?.emailId
                                : ''
                            : null,
                    id2:
                        this.clientData?.length > 0
                            ? this.clientData[1]?.id
                                ? this.clientData[1]?.id
                                : ''
                            : null,
                    firstName2:
                        this.clientData?.length > 1
                            ? this.clientData[1]?.firstName
                                ? this.clientData[1]?.firstName
                                : ''
                            : null,
                    lastName2:
                        this.clientData?.length > 1
                            ? this.clientData[1]?.lastName
                                ? this.clientData[1]?.lastName
                                : ''
                            : null,
                    email2:
                        this.clientData?.length > 1
                            ? this.clientData[1]?.emailId
                                ? this.clientData[1]?.emailId
                                : ''
                            : null,
                    id3:
                        this.clientData?.length > 0
                            ? this.clientData[2]?.id
                                ? this.clientData[2]?.id
                                : ''
                            : null,
                    firstName3:
                        this.clientData?.length > 2
                            ? this.clientData[2]?.firstName
                                ? this.clientData[2]?.firstName
                                : ''
                            : null,
                    lastName3:
                        this.clientData?.length > 2
                            ? this.clientData[2]?.lastName
                                ? this.clientData[2]?.lastName
                                : ''
                            : null,
                    email3:
                        this.clientData?.length > 2
                            ? this.clientData[2]?.emailId
                                ? this.clientData[2]?.emailId
                                : ''
                            : null,
                });

                // this.clientData.forEach((item: any) => {

                // });
                // projectsetting.forEach((item: any) => {
                this.projectSetting.patchValue({
                    url: projectsetting?.baseUrl
                        ? projectsetting?.baseUrl.slice(8).slice(0, -14)
                        : null,
                    email: projectsetting?.email ? projectsetting?.email : '',
                    token: projectsetting?.apiKey ? projectsetting?.apiKey : '',
                    project: this.settingProjectName,
                });
                const projectTeam = res?.data?.teamModel;

                // const pm = projectTeam?.filter((item) => item?.role === 'PM');

                // if (pm?.length > 0) {
                //     this.projectTeam.patchValue({
                //         project_manager: pm[0]?.id,
                //         jira_user: '',
                //         pm_utilization: pm[0]?.utilization,
                //     });
                // }
                this.teamMemberList = _.cloneDeep(projectTeam);
                this.originalTeamMemberList = _.cloneDeep(projectTeam);

                // this.managerEditTeamLIst = projectTeam.filter(
                //     (item: any) => item?.role == 'Manager'
                // );
                // this.teamMemberList = this.teamMemberList.filter(
                //     (item: any) => item?.role !== 'Manager'
                // );
                // this.editteamMemberList = projectTeam.filter(
                //     (item: any) => item?.role !== 'Manager'
                // );
                // this.teamMemberList.forEach((element: any) => {
                //     this.selectedJiraUser = [
                //         ...this.selectedJiraUser,
                //         element?.jiraUser,
                //     ];
                // });
                // this.teamMemberList.forEach((element: any) => {
                //     this.selectedTeamMember = [
                //         ...this.selectedTeamMember,
                //         element?.teamMemberId,
                //     ];
                // });
                // this.getTeamMember();
                this.send();
            },
            (error) => {
                this.initialLoading = false;
            }
        );
    }

    updateProject() {
        // this.filterEditTeamMember();
        // this.filterEditClientList();
        if (this.teamMemberList?.length > 0) {
            // if (this.filteredTeamMember.length > 0) {
            let payload = {
                projectDetails: {
                    name: this.projectDetails?.value?.projectName,
                    description: this.projectDetails?.value?.projectDescription,
                    jiraKey: this.projectSetting?.value?.project,
                    jiraUuid: this.jiraProjectList[0]?.uuid,
                    private: this.jiraProjectList[0]?.private,
                    id: parseInt(this.editProjectId),
                    deleted: false,
                    projectId: this.jiraProjectList[0]?.id,
                    isPrivate: false,
                    addedBy: this.userData?.userId,
                    entityId: this.jiraProjectList[0]?.entityId,
                    formId: this.projectDetails?.value?.feedback_form,
                    orgId: this.jiraProjectList[0]?.orgId,
                    userId: this.userData?.userId,
                    extendedReason: this.editProjectEndDateReason,
                    startDate: this.projectDetails?.value?.startDate,
                    endDate: this.projectDetails?.value?.endDate,
                },
                clientDetails: this.clientDtailsList,
                baseUrl:
                    'https://' +
                    this.projectSetting?.value?.url +
                    '.atlassian.net',
                apiKey: this.projectSetting?.value?.token,
                adminEmail: this.projectSetting?.value?.email,
                orgId: 1,
                addedBy: this.userData?.userId,
                jiraProjectKey: this.projectSetting?.value?.project,
                teamDetails: this.teamMemberList,
            };
            this.submitInProcess = true;
            this.ProjectService.updateProject(payload).subscribe(
                (res: any) => {
                    this.submitInProcess = false;
                    if (!res?.error) {
                        this.snackBar.successSnackBar(
                            'Project updated successFully'
                        );
                        // this.projectDetails.reset();
                        this.clientDetials.reset();
                        this.projectSetting.reset();
                        // this.projectTeam.reset();
                        // this.teamMemberList = [];
                        this.settingProjectName = '';
                        this.router.navigate([
                            '/projects/' + this.editProjectId + '/details',
                        ]);
                    } else {
                        this.snackBar.errorSnackBar(res?.message);
                    }
                    if (res?.tokenExpire == true) {
                        this.snackBar.errorSnackBar(
                            ErrorMessage.ERROR_SOMETHING_WENT_WRONG
                        );
                        this._authService.updateAndReload(window.location);
                    }
                },
                (error) => {
                    this.submitInProcess = false;

                    this.snackBar.errorSnackBar('server error');
                }
            );
        } else {
            this.isAddTeam = false;
            this.snackBar.errorSnackBar('Add team member and role');
        }
    }
    filterEditTeamMember() {
        for (let arr in this.editteamMemberList) {
            for (let filter in this.teamMemberList) {
                if (
                    this.editteamMemberList[arr]?.jiraUser ==
                        this.teamMemberList[filter]?.jiraUser &&
                    this.editteamMemberList[arr]?.teamMemberId ==
                        this.teamMemberList[filter]?.teamMemberId &&
                    this.editteamMemberList[arr]?.role ==
                        this.teamMemberList[filter]?.role
                ) {
                    this.filteredTeamMember.push(this.editteamMemberList[arr]);
                }
            }
        }
        const resultsUnique = this.teamMemberList.filter(
            (elementlist: any) =>
                !this.filteredTeamMember.some(
                    (element: any) =>
                        element?.jiraUser === elementlist?.jiraUser &&
                        element?.teamMemberId === elementlist?.teamMemberId &&
                        element?.role === elementlist?.role
                )
        );
        const resultsDelete = this.editteamMemberList.filter(
            (elementlist: any) =>
                !this.filteredTeamMember.some(
                    (element: any) =>
                        element?.jiraUser === elementlist?.jiraUser &&
                        element?.teamMemberId === elementlist?.teamMemberId &&
                        element?.role === elementlist?.role
                )
        );
        resultsUnique.forEach((element: any, i: any) => {
            this.filteredTeamMember.push(element);
        });
        resultsDelete.forEach((element: any, i: any) => {
            element.isDeleted = true;
            this.filteredTeamMember.push(element);
        });

        this.managerEditTeamLIst.forEach((item: any, index: any) => {
            (item.teamMemberId = this.projectTeam?.value?.project_manager?.id),
                (item.jiraUser =
                    this.projectTeam?.value?.jira_user?.displayName);
            this.filteredTeamMember.push(item);
        });
    }
    filterEditClientList() {
        this.clientDtailsList.forEach((clientItem: any, i: any) => {
            this.clientData[0].forEach((item: any, index: any) => {
                if (i === index) {
                    (item.firstName = clientItem?.firstName),
                        (item.lastName = clientItem?.lastName);
                    this.filteredEditClientList.push(item);
                }
            });
            if (this.clientData[0]?.length < i + 1) {
                this.filteredEditClientList.push(clientItem);
            }
        });
        const resultsDelete = this.clientData[0]?.filter(
            (elementlist: any) =>
                !this.clientDtailsList.some(
                    (element: any) =>
                        element?.firstName === elementlist?.firstName &&
                        element?.lastName === elementlist?.lastName
                )
        );
        resultsDelete.forEach((element: any, i: any) => {
            element.isDeleted = true;
            this.filteredEditClientList.push(element);
        });
    }
    selectChangeProject(event: any) {
        if (this.editProject) {
            if (this.changeForm == 0) {
                const dialogRef = this._fuseConfirmationService.open(
                    this.configForm.value
                );
                dialogRef.afterClosed().subscribe((result) => {
                    if (result == 'cancelled') {
                        this.projectData.forEach((item: any) => {
                            this.projectDetails.patchValue({
                                feedback_form: item?.formId ? item?.formId : '',
                            });
                        });
                    }
                    if (result == 'confirmed') {
                        this.changeForm = this.changeForm + 1;
                    }
                });
            }
        }
    }

    getSelectedEmail(resource: any) {
        this.resourceSpecificTechnologies = resource?.technologies;
        this.getAvailableCapacity(resource.email);
    }

    private initializeAllForms() {
        this.initializeProjectDetailsForm();
        this.initializeClientsDetailsForm();
        this.initializeProjectSettingsForm();
        this.initializeProjectTeamForm();
    }

    private projectEndDateValueSubscription(dummyEndDate: string) {
        this.projectDetails.get('endDate').valueChanges.subscribe((value) => {
            this.prevDate = this.datePipe.transform(dummyEndDate, 'dd-MM-yyyy');
            this.newDate = this.datePipe.transform(value, 'dd-MM-yyyy');
            if (this.prevDate === this.newDate) {
                this.editProjectEndDateReason = '';
            } else {
                this.addReasonForProjectEndDate();
            }
        });
    }

    addReasonForProjectEndDate() {
        const dialogRef = this.dialog.open(EditProjectReasonDialogComponent, {
            disableClose: true,
            width: '40%',
            panelClass: 'warn-dialog-content',
            autoFocus: false,
            data: {
                prevEndDate: this.prevDate,
                newEndDate: this.newDate,
                prefiledReason: this.editProjectEndDateReason,
            },
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result) {
                this.editProjectEndDateReason = result?.reason;
            }
        });
    }

    private initializeFuseWatcherService() {
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                if (matchingAliases.includes('md')) {
                    this.drawerMode = 'side';
                    this.drawerOpened = true;
                } else {
                    this.drawerMode = 'side';
                    this.drawerOpened = false;
                }
            });
    }

    private addEmailFilteringAndSubscription() {
        this.filteredEmails = this.projectTeam
            .get('team_member')
            .valueChanges.pipe(
                startWith(''),
                map((searchKey) =>
                    searchKey && typeof searchKey === 'string'
                        ? this.filterEmails(searchKey?.toLowerCase())
                        : this.emailList.slice()
                )
            );
    }

    filterEmails(searchKey: any) {
        let arr = this.emailList.filter((item) =>
            item?.email?.toLowerCase().includes(searchKey)
        );
        return arr.length ? arr : [{ email: '' }];
    }

    private initializeConfigForm() {
        this.configForm = this._formBuilder.group({
            // title: 'Delete Resource',
            message:
                'You already have a Feedback form associated with this project. If you  change the Feedback form to a new one, this will erase all the previously filled data for the old feedback form. Which also means your previous Customer Happiness Score will go back to zero. <span class="font-medium"> Are you sure you want to change the Feedback form?</span>',
            icon: this._formBuilder.group({
                show: true,
                name: 'heroicons_outline:exclamation',
                color: 'primary',
            }),
            actions: this._formBuilder.group({
                confirm: this._formBuilder.group({
                    show: true,
                    label: 'Yes',
                    color: 'primary',
                }),
                cancel: this._formBuilder.group({
                    show: true,
                    label: 'No',
                }),
            }),
            dismissible: false,
        });
    }

    private routeSubscribeAndExtractInfo() {
        this.routeSubscribe = this._route.paramMap.subscribe(
            (paramMap: ParamMap) => {
                const projectId = Number(paramMap?.get('id'));
                if (projectId) {
                    this.fetchEditproject(projectId);
                    this.editProjectId = projectId;
                    this.pageTitle = 'edit';
                    this.editProject = true;
                } else {
                    this.pageTitle = 'add';
                    this.editProject = false;
                }
            }
        );
    }
    // project_manager: ['', [Validators.required]],
    // jira_user: ['', [Validators.required]],
    // pm_utilization: ['', [Validators.required]],
    // ObjectValidation('project_manager'),
    // ObjectValidation('jira_user'),

    private initializeProjectTeamForm() {
        this.ProjectService.getResourceEmails().subscribe((res: any) => {
            if (res?.data) {
                this.emailList = res?.data;
            }
        });
        this.projectTeam = this._formBuilder.group(
            {
                team_member: [''],
                select_role: [''],
                team_jira_user: [''],
                tm_utilization: [''],
                startDate: [''],
                endDate: [''],
            },
            {
                validator: [ObjectValidation('team_jira_user')],
            }
        );
        this.addEmailFilteringAndSubscription();
    }

    private initializeProjectSettingsForm() {
        this.projectSetting = this._formBuilder.group({
            url: ['', [Validators.required]],
            email: [
                '',
                [
                    Validators.required,
                    Validators.pattern(ValidationConstants.EMAIL_VALIDATION),
                ],
            ],
            token: ['', [Validators.required]],
            project: [''],
        });
    }

    private initializeClientsDetailsForm() {
        this.clientDetials = this._formBuilder.group({
            id: [null],
            firstName: [
                '',
                [
                    Validators.required,
                    Validators.pattern(ValidationConstants.NAME_VALIDATION),
                ],
            ],
            lastName: [
                '',
                [
                    Validators.required,
                    Validators.pattern(ValidationConstants.NAME_VALIDATION),
                ],
            ],
            id2: [null],
            email: ['', [Validators.email]],
            firstName2: [
                '',
                [Validators.pattern(ValidationConstants.NAME_VALIDATION)],
            ],
            lastName2: [
                '',
                [Validators.pattern(ValidationConstants.NAME_VALIDATION)],
            ],
            email2: ['', [Validators.email]],
            id3: [null],
            firstName3: [
                '',
                [Validators.pattern(ValidationConstants.NAME_VALIDATION)],
            ],
            lastName3: [
                '',
                [Validators.pattern(ValidationConstants.NAME_VALIDATION)],
            ],
            email3: ['', [Validators.email]],
        });
    }

    private initializeProjectDetailsForm() {
        this.projectDetails = this._formBuilder.group(
            {
                projectName: ['', [Validators.required]],
                projectDescription: [
                    '',
                    [
                        Validators.required,
                        TextRegexValidator(RegexConstants.Text_Area),
                    ],
                ],
                feedback_form: [''],
                startDate: ['', [Validators.required]],
                endDate: ['', [Validators.required]],
            },
            {
                validator: [noWhitespaceValidator('projectDescription')],
            }
        );

        this.projectDetails?.get('startDate')?.valueChanges.subscribe((res) => {
            if (res) {
                this.projectTeam?.get('startDate')?.setValue(res);
            }
        });
        this.projectDetails?.get('endDate')?.valueChanges.subscribe((res) => {
            if (res) {
                this.projectTeam?.get('endDate')?.setValue(res);
            }
        });
    }
}
