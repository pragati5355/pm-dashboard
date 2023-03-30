import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackBar } from 'app/core/utils/snackBar';
import { PlatformUsersService } from '../common/services/platform-users.service';

@Component({
    selector: 'app-platform-users-form',
    templateUrl: './platform-users-form.component.html',
    styleUrls: ['./platform-users-form.component.scss'],
})
export class PlatformUsersFormComponent implements OnInit {
    addUserForm: FormGroup;
    submitInProcess = false;
    constructor(
        private _formBuilder: FormBuilder,
        private matDialogRef: MatDialogRef<PlatformUsersFormComponent>,
        private platformUserService: PlatformUsersService,
        private snackBar: SnackBar
    ) {}

    ngOnInit(): void {
        this.initializeForm();
    }

    submitUserData() {
        if (this.addUserForm?.valid) {
            this.submitInProcess = true;
            this.platformUserService.create(this.addUserForm?.value).subscribe(
                (res: any) => {
                    if (!res?.error) {
                        this.submitInProcess = false;
                        this.snackBar.successSnackBar(res?.message);
                        this.matDialogRef.close('success');
                    } else {
                        this.submitInProcess = false;
                        this.snackBar.errorSnackBar(res?.message);
                    }
                },
                (error: any) => {
                    this.submitInProcess = false;
                    this.snackBar.errorSnackBar('Something went wrong');
                }
            );
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
