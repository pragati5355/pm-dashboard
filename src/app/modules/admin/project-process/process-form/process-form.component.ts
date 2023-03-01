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
        this.form = this.data.form.formComponent;
        this.formId = this.data.form.id;
        this.formData = {
            data: this.data.formResponse,
        };
        this.createdByName = this.data.createdByName;
        this.perPageData = this.data.index + 1;
    }

    submit(event: any) {
        let formComponent = event.data;
        let payload = {
            checklistResponse: formComponent,
            projectId: this.projectId,
            formId: this.formId,
        };
        this.ProjectProcessService.create(payload).subscribe((res: any) => {
            if (res.error) {
                this.snackBar.errorSnackBar(res.message);
            } else {
                this.snackBar.successSnackBar(res.message);
            }
            this.close();
        });
    }
    close() {
        this.matDialogRef.close('close');
    }
}
