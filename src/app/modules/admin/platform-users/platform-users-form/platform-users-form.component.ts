import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-platform-users-form',
    templateUrl: './platform-users-form.component.html',
    styleUrls: ['./platform-users-form.component.scss'],
})
export class PlatformUsersFormComponent implements OnInit {
    addUserForm: FormGroup;
    constructor(
        private _formBuilder: FormBuilder,
        private matDialogRef: MatDialogRef<PlatformUsersFormComponent>
    ) {}

    ngOnInit(): void {
        this.initializeForm();
    }

    submitUserData() {
        if (this.addUserForm?.valid) {
            console.log(this.addUserForm?.value);
        }
    }
    cancel() {
        this.matDialogRef.close();
        this.addUserForm.reset();
    }
    private initializeForm() {
        this.addUserForm = this._formBuilder.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
        });
    }
}
