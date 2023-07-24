import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-name-resume-version',
    templateUrl: './name-resume-version.component.html',
    styleUrls: ['./name-resume-version.component.scss'],
})
export class NameResumeVersionComponent implements OnInit {
    resumeVersionForm: FormGroup;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private matDialogRef: MatDialogRef<NameResumeVersionComponent>
    ) {}

    ngOnInit(): void {
        this.resumeVersionForm = this.formBuilder.group({
            name: ['', [Validators.required]],
        });
    }

    submit() {
        if (this.resumeVersionForm?.valid) {
            const payload = {
                data: this.data?.formValues,
                projects: this.data?.projects,
                versionName: this.resumeVersionForm?.get('name')?.value,
            };
            console.log(payload);
        }
    }

    cancel() {
        this.matDialogRef.close();
    }
}
