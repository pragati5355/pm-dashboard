import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackBar } from 'app/core/utils/snackBar';
import { PlatformUsersService } from '../common/services/platform-users.service';
import { AuthService } from '@services/auth/auth.service';

@Component({
    selector: 'app-platform-users-form',
    templateUrl: './platform-users-form.component.html',
    styleUrls: ['./platform-users-form.component.scss'],
})
export class PlatformUsersFormComponent implements OnInit {
    addUserForm: FormGroup;
    submitInProcess = false;
    mode: string;
    patchData: [] | null;
    disableEmailField: boolean = false;

    roles: any[] = [
        { name: 'ADMIN' },
        { name: 'PM' },
    ];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _formBuilder: FormBuilder,
        private matDialogRef: MatDialogRef<PlatformUsersFormComponent>,
        private platformUserService: PlatformUsersService,
        private snackBar: SnackBar,
        private cd: ChangeDetectorRef,
        private _authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.loadData();
        this.initializeForm();
    }

    private loadData(){
        this.mode = this.data?.mode;
        this.patchData = this.data?.editData;
    }    


    private patchValuesInEditMode() {
        this.disableEmailField = true;
        if (this.mode === 'EDIT') {
            this.addUserForm.patchValue({
                email: this.data?.editData?.email,
                role: this.data?.editData?.role,
                firstName: this.data?.editData?.firstName,
                lastName: this.data?.editData?.lastName
            });
        }
    }

    submitUserData() {
        if (this.mode === 'ADD' && this.addUserForm?.valid) {
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
        if(this.mode === 'EDIT' && this.addUserForm?.valid){
            this.submitInProcess = true;
            const payload = {
                id: this.data?.editData?.id,
                firstName: this.addUserForm?.value?.firstName,
                lastName: this.addUserForm?.value?.lastName,
                role: this.addUserForm?.value?.role,
                email : this.addUserForm?.getRawValue()?.email,
                status: this.data?.editData?.status,
            }
           
            this.platformUserService
            .changeStatus(payload)
            .subscribe((res: any) => {
                this.submitInProcess = false;
                if (!res?.error) {
                    this.snackBar.successSnackBar(res?.message);
                    this.matDialogRef.close('success');
                } else {
                    this.snackBar.errorSnackBar(res?.message);
                }
                if (res?.tokenExpire) {
                    this._authService.updateAndReload(window.location);
                }
            },
            (err) => {
                this.submitInProcess = false;
            });
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
            email: [
                '',
                [
                    Validators.required,
                    Validators.email,
                    Validators.pattern(/@mindbowser.com\s*$/),
                ],
            ],
            role :['',[Validators.required]],
        });

        this.patchValuesInEditMode();
        if (this.mode === 'EDIT') {
            this.addUserForm.get('email').disable();
        }
    }
}
