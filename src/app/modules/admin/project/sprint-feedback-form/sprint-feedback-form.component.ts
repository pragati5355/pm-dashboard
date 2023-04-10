import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddFormService } from '@services/add-form.service';
import { AuthService } from '@services/auth/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
    selector: 'app-sprint-feedback-form',
    templateUrl: './sprint-feedback-form.component.html',
    styleUrls: ['./sprint-feedback-form.component.scss'],
})
export class SprintFeedbackFormComponent implements OnInit {
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
    emailId = 0;
    email: any;
    constructor(
        private _authService: AuthService,
        private formService: AddFormService,
        private _route: ActivatedRoute,
        private router: Router,
        public matDialogRef: MatDialogRef<SprintFeedbackFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
    ngOnInit(): void {
        this._route.params.subscribe((sprintId: any) => {
            if (sprintId['sprintId'] && sprintId['name']) {
                this.sprintId = parseInt(sprintId['sprintId']);
                this.sprintName = sprintId['name'];
            }
        });
        let projectData = this._authService.getProjectDetails();
        this.projectId = projectData.id;
        this.getFeedbackFormEmailList();
    }
    getFormDetailsBySprint() {
        this.initialLoading = true;
        let payload = {
            projectId: this.projectId,
            sprintId: this.sprintId,
        };
        this.formService
            .getFeedbackFormBySprint(payload)
            .subscribe((res: any) => {
                this.initialLoading = false;
                let formdata: any = [];
                formdata.push(res.data.form);
                formdata.forEach((item: any) => {
                    this.formName = item.formName;
                    this.formComponent = item.formComponent.components;
                    this.formComponent = this.formComponent.filter(
                        (element: any) => element.key !== 'submit'
                    );
                });
                this.form = { components: this.formComponent };
            });
    }
    getFeedbackFormEmailList() {
        this.initialLoading = true;
        let payload = {
            projectId: this.projectId,
            sprintId: this.sprintId,
        };
        this.formService
            .getFeedbackFormEamilList(payload)
            .subscribe((res: any) => {
                this.initialLoading = false;
                this.emailList = res.data;
                this.getFormDetailsBySprint();
                this.getFormDetailsByEmail(0);
            });
    }
    getFormDetailsByEmail(index: number) {
        this.initialLoading = true;
        this.emailId = index;
        let payload = {
            projectId: this.projectId,
            sprintId: this.sprintId,
            email: this.emailList[index],
        };
        this.email = this.emailList[index];
        this.formService
            .getFeedbackFormByEmail(payload)
            .subscribe((res: any) => {
                this.initialLoading = false;
                this.data = res.data.formResponse;
                this.formData = { data: res.data.formResponse };
                this.isShowEmails = false;
            });
    }
    getFormDetailsByEmailPrevious() {
        if (this.emailId > 0) {
            this.emailId = this.emailId - 1;

            this.initialLoading = true;
            let payload = {
                projectId: this.projectId,
                sprintId: this.sprintId,
                email: this.emailList[this.emailId],
            };
            this.email = this.emailList[this.emailId];
            this.formService
                .getFeedbackFormByEmail(payload)
                .subscribe((res: any) => {
                    this.initialLoading = false;
                    this.data = res.data.formResponse;
                    this.formData = { data: res.data.formResponse };
                    this.isShowEmails = false;
                });
        }
    }
    getFormDetailsByEmailNext() {
        if (this.emailId < this.emailList.length - 1) {
            this.emailId = this.emailId + 1;
            this.initialLoading = true;
            let payload = {
                projectId: this.projectId,
                sprintId: this.sprintId,
                email: this.emailList[this.emailId],
            };
            this.email = this.emailList[this.emailId];
            this.formService
                .getFeedbackFormByEmail(payload)
                .subscribe((res: any) => {
                    this.initialLoading = false;
                    this.data = res.data.formResponse;
                    this.formData = { data: res.data.formResponse };
                    this.isShowEmails = false;
                });
        }
    }
    submit(event: any) {}
    gotoforms() {
        this.router.navigate([`/forms/`]);
    }
    close() {
        this.matDialogRef.close();
    }
}
