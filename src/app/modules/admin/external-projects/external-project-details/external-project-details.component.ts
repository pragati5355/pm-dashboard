import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { LoggedInUserService } from '@modules/admin/common/services/logged-in-user.service';
import { AuthService } from '@services/auth/auth.service';
import { CreateProjecteService } from '@services/create-projecte.service';
import { SnackBar } from 'app/core/utils/snackBar';
import { ExternalProjectsApiService } from '../common/services/external-projects-api.service';
import { CreateExternalProjectComponent } from '../create-external-project/create-external-project.component';
import { ExternalProjectsAddResourceComponent } from '../external-projects-add-resource/external-projects-add-resource.component';
import { SendRemindersComponent } from '../send-reminders/send-reminders.component';
import { Clipboard } from '@angular/cdk/clipboard';
import { WorkLogsDownloadComponent } from '../work-logs-download/work-logs-download.component';
import { ExternalProjectSettingsComponent } from '../external-project-settings/external-project-settings.component';
import { SendFeedbackFormComponent } from '../send-feedback-form/send-feedback-form.component';

@Component({
    selector: 'app-external-project-details',
    templateUrl: './external-project-details.component.html',
    styleUrls: ['./external-project-details.component.scss'],
})
export class ExternalProjectDetailsComponent implements OnInit {
    developerEmailList: any[];
    isLoadingDevelopersEmail: boolean = false;
    projectId: any;
    projectDetails: any;
    projectHistory: any;
    projectSetting: any;
    isLoading = false;
    configFormStatus: FormGroup;
    currentProjectEmail: any[];
    userRole: string;
    technologies: any;
    isLoadingTechnologies: boolean = false;
    isprojectCostSettingsAdded: boolean = false;
    isprojectStartEndDateAdded: boolean = false;

    constructor(
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private projectService: CreateProjecteService,
        private externalProjectsService: ExternalProjectsApiService,
        private _formBuilder: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private _authService: AuthService,
        private snackBar: SnackBar,
        private router: Router,
        private loggedInUserService: LoggedInUserService,
        private clipboard: Clipboard
    ) {}

    ngOnInit(): void {
        this.isLoading = true;
        this.setProjectIdSubscription();
        this.loadDeveloperEmails();
        this.getUserRole();
        this.getTechnologies();
    }

    getProjectDetails() {
        this.projectService
            .getProjectById(this.projectId)
            .subscribe((res: any) => {
                this.projectDetails = res?.data;
                this.projectHistory = res?.data?.project;
                this.projectSetting = res?.data?.projectSettings;
                this.isLoading = false;
            });
    }

    showFeedbackForms(){
        const dialogRef = this.dialog.open(SendFeedbackFormComponent, {
            disableClose: true,
            panelClass: 'warn-dialog-content',
            autoFocus: false,
            data: {
                projectHistory : this.projectHistory,
            },
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result?.result == 'success') {
            }
        });
    }

    edit() {
        this.dialog
            .open(CreateExternalProjectComponent, {
                width: '60%',
                height: 'auto',
                data: {
                    projectModel: this.projectDetails?.project,
                    clientModels: this.projectDetails?.clientModels,
                    technologies: this.technologies,
                },
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    window.location.reload();
                }
            });
    }

    settings() {
        this.dialog
            .open(ExternalProjectSettingsComponent, {
                disableClose: true,
                width: '70%',
                height: 'auto',
                maxHeight: '90vh',
                data: {
                    projectModel: this.projectDetails?.project,
                    clientModels: this.projectDetails?.clientModels,
                    projectSettings: this.projectDetails?.projectSettings,
                    teamModel: this.projectDetails?.teamModel,
                },
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.isLoading = true;
                    this.setProjectIdSubscription();
                    this.loadDeveloperEmails();
                }
            });
    }

    deleteResource(member: any) {
        this.initailizeConfirmationFormPopup();
        const confirmPopDialog = this._fuseConfirmationService.open(
            this.configFormStatus.value
        );

        confirmPopDialog.afterClosed().subscribe((result) => {
            if (result == 'confirmed') {
                this.isLoading = true;
                const payload = {
                    id: member?.id,
                    projectId: member?.projectId,
                    resourceId: member?.resourceId,
                    startDate: member?.startDate,
                    endDate: member?.endDate,
                    utilization: member?.utilization,
                    deleted: true,
                    assignedBy: member?.assignedBy,
                    role: member?.role,
                };
                this.externalProjectsService.mapResource(payload).subscribe(
                    (res: any) => {
                        this.isLoading = false;
                        if (res?.statusCode === 200) {
                            this.snackBar.successSnackBar(res?.message);
                            this.getProjectDetails();
                            this.loadDeveloperEmails();
                        } else {
                            this.snackBar.errorSnackBar(res?.message);
                        }
                        if (res?.tokenExpire) {
                            this._authService.updateAndReload(window.location);
                        }
                    },
                    (err) => {
                        this.isLoading = false;
                    }
                );
            }
        });
    }

    showWorkLogs() {
        this.router.navigate([
            `/external-projects/work-logs/${this.projectId}`,
        ]);
    }

    initailizeConfirmationFormPopup() {
        this.configFormStatus = this._formBuilder.group({
            title: 'Delete Resource',
            message: 'Are you sure you want to delete this resource?',
            icon: this._formBuilder.group({
                show: true,
                name: 'heroicons_outline:exclamation',
                color: 'warn',
            }),
            actions: this._formBuilder.group({
                confirm: this._formBuilder.group({
                    show: true,
                    label: 'Delete Resource',
                    color: 'warn',
                }),
                cancel: this._formBuilder.group({
                    show: true,
                    label: 'Cancel',
                }),
            }),
            dismissible: false,
        });
    }

    openDialog(mode: String, data: any) {
        const emailList = this.filterOutAlreadyAssignedEmails();
        const dialogRef = this.dialog.open(
            ExternalProjectsAddResourceComponent,
            {
                disableClose: true,
                width: '50%',
                maxHeight: '90vh',
                panelClass: 'warn-dialog-content',
                autoFocus: false,
                data: {
                    developerEmails: emailList,
                    allResources: this.developerEmailList,
                    projectId: this.projectId,
                    mode: mode,
                    editData: data,
                    projectDetails: this.projectDetails,
                },
            }
        );
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result) {
                this.getProjectDetails();
                this.loadDeveloperEmails();
            }
        });
    }

    openEditProjectDialog() {
        this.isprojectStartEndDateAdded = true;
        this.edit();
        this.isprojectStartEndDateAdded = false;
    }

    openCostProjectSettingDialog() {
        this.isprojectCostSettingsAdded = true;
        this.dialog
            .open(ExternalProjectSettingsComponent, {
                disableClose: true,
                width: '70%',
                height: 'auto',
                maxHeight: '90vh',
                data: {
                    projectModel: this.projectDetails?.project,
                    clientModels: this.projectDetails?.clientModels,
                    projectSettings: this.projectDetails?.projectSettings,
                    teamModel: this.projectDetails?.teamModel,
                    showStep: 1,
                },
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.isLoading = true;
                    this.setProjectIdSubscription();
                    this.loadDeveloperEmails();
                }
            });
        this.isprojectCostSettingsAdded = false;
    }

    private getTechnologies() {
        this.isLoadingTechnologies = true;
        this.externalProjectsService.getTechnologies().subscribe((res: any) => {
            this.isLoadingTechnologies = false;
            if (res?.data) {
                this.technologies = res?.data;
            }
        });
    }

    private filterOutAlreadyAssignedEmails() {
        return this.developerEmailList.filter(
            (obj) =>
                !this.projectDetails?.teamModel?.some(
                    ({ email }) => obj.email === email
                )
        );
    }

    private getUserRole() {
        this.loggedInUserService.getLoggedInUser().subscribe((res: any) => {
            if (res?.role) {
                this.userRole = res?.role;
            }
        });
    }

    private setProjectIdSubscription() {
        this.route.paramMap.subscribe((paramMap) => {
            const projectId = paramMap.get('id');
            if (projectId) {
                this.projectId = projectId;
                this.getProjectDetails();
                this.loadDeveloperEmails();
            }
        });
    }

    private loadDeveloperEmails() {
        this.isLoadingDevelopersEmail = true;
        this.externalProjectsService.findAllDeveloperEmails().subscribe(
            (res: any) => {
                this.isLoadingDevelopersEmail = false;
                if (res?.data) {
                    this.developerEmailList = res?.data;
                }
            },
            (err) => {
                this.isLoadingDevelopersEmail = false;
            }
        );
    }

    downloadResouceWorklog() {
        const dialogRef = this.dialog.open(WorkLogsDownloadComponent, {
            disableClose: true,
            width: '98%',
            maxWidth: '800px',
            maxHeight: '90vh',
            panelClass: 'warn-dialog-content',
            autoFocus: false,
            data: {
                id: this.projectId,
                projectName: this.projectDetails?.project?.name,
            },
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result == 'success') {
                window.location.reload();
            }
        });
    }
}
