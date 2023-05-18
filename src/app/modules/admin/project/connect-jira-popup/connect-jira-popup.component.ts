import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData {
    resend: any;
}
@Component({
    selector: 'app-connect-jira-popup',
    templateUrl: './connect-jira-popup.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ConnectJiraPopupComponent implements OnInit {
    project_name = this.data.settingProjectName || '';
    connectJiraForm: FormGroup;
    list = this.data?.projectList || [];

    selection = [];
    constructor(
        public matDialogRef: MatDialogRef<ConnectJiraPopupComponent>,
        private _formBuilder: FormBuilder,
        private _authService: AuthService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit(): void {
        // Create the form
        this.connectJiraForm = this._formBuilder.group({
            name: ['', [Validators.required]],
        });
        // this.list = this.data.projectList;
        // this.project_name = this.data.settingProjectName;
    }

    save() {
        if (!this.connectJiraForm.invalid) {
            this.matDialogRef.close({
                project: this.connectJiraForm.value.name,
            });
        }
    }
    close() {
        this.matDialogRef.close();
    }
}
