import { I } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from '@services/auth/auth.service';
import { CreateProjecteService } from '@services/create-projecte.service';
import { SnackBar } from 'app/core/utils/snackBar';
import { ExternalProjectsApiService } from '../common/services/external-projects-api.service';
import { CreateExternalProjectComponent } from '../create-external-project/create-external-project.component';
import { ExternalProjectsAddResourceComponent } from '../external-projects-add-resource/external-projects-add-resource.component';

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
    isLoading = false;
    configFormStatus: FormGroup;
    currentProjectEmail: any[];

    constructor(
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private projectService: CreateProjecteService,
        private externalProjectsService: ExternalProjectsApiService,
        private _formBuilder: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private _authService: AuthService,
        private snackBar: SnackBar
    ) {}

    ngOnInit(): void {
        this.isLoading = true;
        this.setProjectIdSubscription();
        this.loadDeveloperEmails();
    }

    getProjectDetails() {
        this.projectService
            .getOneProjectDetails({
                id: this.projectId,
            })
            .subscribe((res: any) => {
                this.projectDetails = res?.data;
                this.isLoading = false;
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
                },
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    window.location.reload();
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
                        if (res?.error === false) {
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
        // const emailList = this.filterOutAlreadyAssignedEmails();
        console.log(data);
        const dialogRef = this.dialog.open(
            ExternalProjectsAddResourceComponent,
            {
                disableClose: true,
                width: '50%',
                panelClass: 'warn-dialog-content',
                autoFocus: false,
                data: {
                    // developerEmails: emailList,
                    allResources: this.developerEmailList,
                    projectId: this.projectId,
                    mode: mode,
                    editData: data,
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

    private filterOutAlreadyAssignedEmails() {
        return this.developerEmailList.filter(
            (obj) =>
                !this.projectDetails?.teamModel?.some(
                    ({ email }) => obj.email === email
                )
        );
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
}
