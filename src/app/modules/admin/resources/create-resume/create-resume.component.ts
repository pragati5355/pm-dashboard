import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-create-resume',
    templateUrl: './create-resume.component.html',
    styleUrls: ['./create-resume.component.scss'],
})
export class CreateResumeComponent implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _formBuilder: FormBuilder,
        private matDialogRef: MatDialogRef<CreateResumeComponent>
    ) {}

    ngOnInit(): void {}
    cancel() {
        this.matDialogRef.close();
    }
}
