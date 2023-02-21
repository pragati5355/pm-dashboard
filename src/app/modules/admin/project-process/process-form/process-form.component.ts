import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBar } from '../../../../core/utils/snackBar';
import { ProjectProcessService } from '../common/services/project-process.service';
@Component({
    selector: 'app-process-form',
    templateUrl: './process-form.component.html',
    styleUrls: ['./process-form.component.scss'],
})
export class ProcessFormComponent implements OnInit {
    public form!: Object;
    formName = '';
    routeSubscribe: any;
    initialLoading = false;
    sprintId: any;
    projectId: any;
    emailList: any = [];
    formComponent: any = [];
    formData: any;
    sprintName: any;
    isShowEmails: boolean = true;
    totalRecords = 0;
    perPageData = 1;
    formId = 0;
    createdByName = '';
    constructor(
        private _authService: AuthService,
        private ProjectProcessService: ProjectProcessService,
        private _route: ActivatedRoute,
        private snackBar: SnackBar,
        private router: Router,
        public matDialogRef: MatDialogRef<ProcessFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
    ngOnInit(): void {
        let projectData = this._authService.getProjectDetails();
        this.projectId = projectData.id;
        console.log('data', this.data);
        this.getForms();
        this.getSubmittedFormDetails();
    }
    getForms() {
        this.initialLoading = true;
        this.ProjectProcessService.find().subscribe((res: any) => {
            this.initialLoading = false;
            if (res.tokenExpire == true) {
                this._authService.updateAndReload(window.location);
            }
            this.form = res.data.formComponent;
            this.formId = res.data.id;
            // let formdata: any = [];
            // formdata.push(res.data.form);
            // formdata.forEach((item: any) => {
            //     this.formName = item.formName;
            //     this.formComponent = item.formComponent.components;
            //     this.formComponent = this.formComponent.filter(
            //         (element: any) => element.key !== 'submit'
            //     );
            // });
            // this.form = { components: res.data.formComponent };
            console.log(res);
        });
    }

    submit(event: any) {
        let formComponent = event.data;
        let payload = {
            checklistResponse: formComponent,
            projectId: this.projectId,
            formId: this.formId,
        };
        console.log(payload);
        this.ProjectProcessService.create(payload).subscribe((res: any) => {
            if (res.error) {
                this.snackBar.errorSnackBar(res.message);
            } else {
                //  this.router.navigate(
                //    [`/client-portal/feedback-submitted`]
                //  );
                this.snackBar.successSnackBar(res.message);
            }
            this.close();
        });
    }
    getFormDetailsPrevious() {
        if (this.perPageData > 0) {
            this.perPageData = this.perPageData - 1;

            this.initialLoading = true;
            let payload = {
                perPageData: this.perPageData,
                totalPerPageData: 1,
                projectId: this.projectId,
            };
            this.ProjectProcessService.submittedForm(payload).subscribe(
                (res: any) => {
                    this.initialLoading = false;
                    this.createdByName =
                        res.data.checklistResponse[0].createdByName;
                    // this.data = res.data.formResponse;
                    this.formData = {
                        data: res.data.checklistResponse[0].checklistResponse,
                    };

                    // this.isShowEmails = false;
                }
            );
        }
    }
    getFormDetailsNext() {
        this.perPageData = this.perPageData + 1;
        this.initialLoading = true;
        let payload = {
            perPageData: this.perPageData,
            totalPerPageData: 1,
            projectId: this.projectId,
        };
        this.ProjectProcessService.submittedForm(payload).subscribe(
            (res: any) => {
                this.initialLoading = false;
                this.totalRecords = res.data.totalRecords;
                this.createdByName =
                    res.data.checklistResponse[0].createdByName;
                // this.data = res.data.formResponse;
                this.formData = {
                    data: res.data.checklistResponse[0].checklistResponse,
                };
                // this.isShowEmails = false;
            }
        );
    }
    getSubmittedFormDetails() {
        this.initialLoading = true;
        const payload = {
            perPageData: this.perPageData,
            totalPerPageData: 1,
            projectId: this.projectId,
        };
        this.ProjectProcessService.submittedForm(payload).subscribe(
            (res: any) => {
                this.initialLoading = false;
                this.totalRecords = res.data.totalRecords;
                this.createdByName =
                    res.data.checklistResponse[0].createdByName;
                // this.data = res.data.formResponse;
                this.formData = {
                    data: res.data.checklistResponse[0].checklistResponse,
                };
                console.log(this.formData);
                // this.isShowEmails = false;
            }
        );
    }
    gotoforms() {
        this.router.navigate([`/forms/form-list`]);
    }
    close() {
        this.matDialogRef.close();
    }
}
