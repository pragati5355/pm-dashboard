import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { SnackBar } from '../../../../core/utils/snackBar';
import { ProjectProcessService } from '../common/services/project-process.service';
import { MatDialog } from '@angular/material/dialog';
import { StaticData } from 'app/core/constacts/static';
import { ProcessFormComponent } from '../process-form/process-form.component';
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
    totalPerPageData = 1;
    constructor(
        private dialog: MatDialog,
        private _authService: AuthService,
        private ProjectProcessService: ProjectProcessService,
        private _route: ActivatedRoute,
        private snackBar: SnackBar,
        private router: Router
    ) {}

    ngOnInit(): void {
        let projectData = this._authService.getProjectDetails();
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
    editForm(formResponse: any, createdByName: any, index: any, id: any) {
        const dialogRef = this.dialog.open(ProcessFormComponent, {
            disableClose: true,
            width: '90%',
            panelClass: 'warn-dialog-content',
            autoFocus: false,
            data: {
                ProcessFormType: 'editForm',
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
    viewForm(formResponse: any, createdByName: any, index: any, id: any) {
        const dialogRef = this.dialog.open(ProcessFormComponent, {
            disableClose: true,
            width: '90%',
            panelClass: 'warn-dialog-content',
            autoFocus: false,
            data: {
                ProcessFormType: 'viewForm',
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
    deleteForm(id: any) {}
    goBack() {
        window.history.back();
    }
    getForms() {
        this.initialLoading = true;
        this.ProjectProcessService.find().subscribe((res: any) => {
            this.initialLoading = false;
            if (res.tokenExpire == true) {
                this._authService.updateAndReload(window.location);
            }
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
                } else if (res.tokenExpire == true) {
                    this._authService.updateAndReload(window.location);
                }
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

            let payload = {
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
}
