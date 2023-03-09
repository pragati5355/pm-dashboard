import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '@services/auth/auth.service';
import { SnackBar } from '../../../../core/utils/snackBar';
import { ProjectProcessService } from '../common/services/project-process.service';
import { MatDialog } from '@angular/material/dialog';
import { ProcessFormComponent } from '../process-form/process-form.component';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ErrorMessage } from 'app/core/constacts/constacts';
@Component({
    selector: 'app-project-process-list',
    templateUrl: './project-process-list.component.html',
    styleUrls: ['./project-process-list.component.scss'],
})
export class ProjectProcessListComponent implements OnInit {
    public form!: Object;
    formName = '';
    routeSubscribe: any;
    initialLoading = false;
    projectId: any;
    formId = 0;
    formList: any = [];
    pagination = false;
    totalRecords = 0;
    count = 1;
    totalRecord: any;
    totalPerPageData = 10;
    configForm!: FormGroup;
    configFormWithProject!: FormGroup;
    constructor(
        private dialog: MatDialog,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private ProjectProcessService: ProjectProcessService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _route: ActivatedRoute,
        private snackBar: SnackBar,
        private router: Router
    ) {}

    ngOnInit(): void {
        const projectData = this._authService.getProjectDetails();
        this.projectId = projectData.id;
        this.getForms();
        this.getSubmittedFormDetails();
    }
    processForm() {
        const dialogRef = this.dialog.open(ProcessFormComponent, {
            disableClose: true,
            width: '90%',
            panelClass: 'warn-dialog-content',
            autoFocus: false,
            data: {
                ProcessFormType: 'fileForm',
                form: this.form,
            },
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result.result == 'success') {
            }
        });
    }
    getDialogData(
        formResponse: any,
        createdByName: any,
        index: any,
        id: any,
        type: string
    ) {
        const dialogRef = this.dialog.open(ProcessFormComponent, {
            disableClose: true,
            width: '90%',
            panelClass: 'warn-dialog-content',
            autoFocus: false,
            data: {
                ProcessFormType: type,
                formResponse: formResponse,
                form: this.form,
                createdByName: createdByName,
                index: index,
                processFormId: id,
            },
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result.result == 'success') {
            }
        });
    }
    deleteForm(id: any) {
        this.initializeConfirmationForm();
        const payload = {
            id: id,
        };
        const dialogRef = this._fuseConfirmationService.open(
            this.configForm.value
        );
        dialogRef.afterClosed().subscribe((result) => {
            if (result == 'confirmed') {
                this.ProjectProcessService.update(payload).subscribe(
                    (res: any) => {
                        if (!res.error) {
                            this.snackBar.successSnackBar(res.data.message);
                        } else {
                            this.snackBar.errorSnackBar(
                                ErrorMessage.ERROR_SOMETHING_WENT_WRONG
                            );
                        }
                        this.count = 0;
                        this.formList = [];
                        this.getSubmittedFormDetails();
                    },
                    (error) => {
                        this.snackBar.errorSnackBar('Server error');
                    }
                );
            }
        });
    }

    goBack() {
        window.history.back();
    }
    getForms() {
        this.initialLoading = true;
        this.ProjectProcessService.find().subscribe((res: any) => {
            this.initialLoading = false;
            this.tokenExpireFun(res);
            // this.formList = res.data
            this.form = res.data;
            this.formId = res.data.id;
        });
    }
    getSubmittedFormDetails() {
        this.initialLoading = true;
        const payload = {
            perPageData: this.count,
            totalPerPageData: this.totalPerPageData,
            projectId: this.projectId,
        };
        this.ProjectProcessService.submittedForm(payload).subscribe(
            (res: any) => {
                if (res.data) {
                    this.totalRecord = res.data.totalRecords;
                    this.formList = res.data.checklistResponse;
                    this.initialLoading = false;
                } else if (res.data == null) {
                    this.totalRecord = 0;
                    this.initialLoading = false;
                }
                this.tokenExpireFun(res);
            },
            (error) => {
                this.totalRecord = 0;
                this.initialLoading = false;
            }
        );
    }
    handleScroll() {
        if (!this.pagination) {
            this.count = this.count + this.totalPerPageData;

            const payload = {
                perPageData: this.count,
                totalPerPageData: this.totalPerPageData,
                projectId: this.projectId,
            };
            this.pagination = true;
            this.initialLoading = true;
            this.ProjectProcessService.submittedForm(payload).subscribe(
                (res: any) => {
                    this.pagination = false;
                    if (res.data) {
                        this.formList = [
                            ...this.formList,
                            ...res.data.checklistResponse,
                        ];
                    }
                    this.initialLoading = false;
                },
                (err: any) => {
                    this.pagination = false;
                    this.initialLoading = false;
                }
            );
        }
    }

    private initializeConfirmationForm() {
        this.configForm = this._formBuilder.group({
            title: 'Delete Checklist',
            message:
                'Are you sure you want to delete this checklist? <span class="font-medium">This action cannot be undone!</span>',
            icon: this._formBuilder.group({
                show: true,
                name: 'heroicons_outline:exclamation',
                color: 'warn',
            }),
            actions: this._formBuilder.group({
                confirm: this._formBuilder.group({
                    show: true,
                    label: 'Delete',
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

    private tokenExpireFun(res: any) {
        if (res.tokenExpire == true) {
            this._authService.updateAndReload(window.location);
        }
    }
}
