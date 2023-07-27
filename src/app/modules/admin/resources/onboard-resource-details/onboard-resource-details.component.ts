import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-onboard-resource-details',
    templateUrl: './onboard-resource-details.component.html',
    styleUrls: ['./onboard-resource-details.component.scss'],
})
export class OnboardResourceDetailsComponent implements OnInit {
    initialLoading = false;
    resourceForm: FormGroup;
    mode: string;
    patchData: [] | null;
    submitInProcess = false;
    disableField: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _formBuilder: FormBuilder,
        public matDialogRef: MatDialogRef<OnboardResourceDetailsComponent>
    ) {}

    ngOnInit(): void {
        this.loadData();
        this.initializeForm();
    }

    private loadData() {
        this.mode = this.data?.mode;
        this.patchData = this.data?.editData;

        console.log('this.mode -> ', this.mode);
        console.log('this.patchData -> ', this.patchData);
    }

    close() {
        this.matDialogRef.close();
    }

    submitResourceData() {
        if (this.mode === 'VIEW') {
            this.matDialogRef.close();
        }
    }

    private patchValuesInEditMode() {
        if (this.mode === 'VIEW') {
            this.resourceForm.patchValue({
                email: this.data?.editData?.email,
                role: this.data?.editData?.role,
                firstName: this.data?.editData?.details?.firstName,
                lastName: this.data?.editData?.details?.lastName,
            });
        }
        if (this.mode === 'EDIT') {
            this.resourceForm.patchValue({
                email: this.data?.editData?.email,
                role: this.data?.editData?.role,
                firstName: this.data?.editData?.details?.firstName,
                lastName: this.data?.editData?.details?.lastName,
            });
        }
    }

    private initializeForm() {
        this.resourceForm = this._formBuilder.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: [
                '',
                [
                    Validators.required,
                    Validators.email,
                    Validators.pattern(/@mindbowser.com\s*$/),
                ],
            ],
            role: ['', [Validators.required]],
        });

        this.patchValuesInEditMode();
        if (this.mode === 'VIEW') {
            this.resourceForm.get('email').disable();
            this.resourceForm.get('firstName').disable();
            this.resourceForm.get('lastName').disable();
        }
    }
}
