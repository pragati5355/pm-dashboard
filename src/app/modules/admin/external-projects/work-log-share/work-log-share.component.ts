import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-work-log-share',
    templateUrl: './work-log-share.component.html',
    styleUrls: ['./work-log-share.component.scss'],
})
export class WorkLogShareComponent implements OnInit {
    color: any = 'primary';
    checked = false;
    disabled = false;
    shareForm: FormGroup;
    environments: any = environment;
    projectKey: string = '';
    constructor(
        public dialogRef: MatDialogRef<WorkLogShareComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.generateProjectKey();
        this.initializeForm();
    }

    cancel() {
        this.dialogRef.close();
    }

    submit() {
        console.log(this.shareForm);
    }

    generateRandomKey() {
        let result = '';
        const characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 5) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
            counter += 1;
        }
        return result;
    }

    private generateProjectKey() {
        const key = this.data?.projectName?.concat(this.generateRandomKey());
        this.projectKey = key.substring(0, 4);
    }

    private initializeForm() {
        this.shareForm = this.fb.group({
            workLogShare: false,
            workLogLink: [
                this.projectKey,
                [
                    Validators.required,
                    Validators.pattern(/^[a-zA-Z0-9]*$/),
                    Validators.minLength(4),
                ],
            ],
        });
    }
}
