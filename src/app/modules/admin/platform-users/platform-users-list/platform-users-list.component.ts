import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@services/auth/auth.service';
import { PlatformUsersService } from '../common/services/platform-users.service';
import { PlatformUsersFormComponent } from '../platform-users-form/platform-users-form.component';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SnackBar } from 'app/core/utils/snackBar';

@Component({
    selector: 'app-platform-users-list',
    templateUrl: './platform-users-list.component.html',
    styleUrls: ['./platform-users-list.component.scss'],
})
export class PlatformUsersListComponent implements OnInit {
    userList: any[] = [];
    requiredSkeletonData = {
        rowsToDisplay: 10,
        displayProfilePicture: false,
    };
    initialLoading: boolean = false;
    configFormStatus!: FormGroup;
    totalRecords: number = 0;
    constructor(
        private dialog: MatDialog,
        private platformUsersService: PlatformUsersService,
        private _authService: AuthService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private snackBar: SnackBar
    ) {}

    ngOnInit(): void {
        this.getList();
    }

    getList() {
        this.initialLoading = true;
        this.platformUsersService.getUsers().subscribe((res: any) => {
            this.initialLoading = false;
            if (!res?.error) {
                this.userList = res?.data?.user;
                this.totalRecords = res?.data?.totalRecored;
            }
            if (res?.tokenExpire) {
                this._authService.updateAndReload(window.location);
            }
        });
    }

    openDialog() {
        const dialogRef = this.dialog.open(PlatformUsersFormComponent, {
            disableClose: true,
            width: '50%',
            panelClass: 'warn-dialog-content',
            autoFocus: false,
            data: {},
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result == 'success') {
                this.userList = [];
                this.totalRecords = 0;
                this.getList();
            }
        });
    }

    changeStatus(id: any, status: any) {
        const payload = {
            id: id,
            status:
                status == 'ACTIVATED'
                    ? 'DEACTIVATED'
                    : status == 'PENDING_ACTIVATION'
                    ? 'DEACTIVATED'
                    : 'ACTIVATED',
            isDeleted:
                status == 'ACTIVATED'
                    ? false
                    : status == 'PENDING_ACTIVATION'
                    ? true
                    : false,
        };
        console.log(status);
        this.initailizeConfirmationFormPopup(status);
        const dialogRef = this._fuseConfirmationService.open(
            this.configFormStatus.value
        );

        dialogRef.afterClosed().subscribe((result) => {
            if (result == 'confirmed') {
                this.statusChangeApi(payload);
            }
        });
    }
    initailizeConfirmationFormPopup(status: string) {
        this.configFormStatus = this._formBuilder.group({
            title:
                status == 'ACTIVATED'
                    ? 'Deactivate User'
                    : status == 'PENDING_ACTIVATION'
                    ? 'Delete Invitation'
                    : 'Activate User',
            message:
                status == 'ACTIVATED'
                    ? 'Are you sure you want to deactivate this user?'
                    : status == 'PENDING_ACTIVATION'
                    ? 'Are you sure you want to delete this user? <span class="font-medium">This action cannot be undone!</span>'
                    : 'Are you sure you want to activate this user?',
            icon: this._formBuilder.group({
                show: true,
                name: 'heroicons_outline:exclamation',
                color:
                    status == 'ACTIVATED'
                        ? 'warn'
                        : status == 'PENDING_ACTIVATION'
                        ? 'warn'
                        : 'primary',
            }),
            actions: this._formBuilder.group({
                confirm: this._formBuilder.group({
                    show: true,
                    label:
                        status == 'ACTIVATED'
                            ? 'Deactivate user'
                            : status == 'PENDING_ACTIVATION'
                            ? 'Delete Invitation'
                            : 'Activate user',
                    color:
                        status == 'ACTIVATED'
                            ? 'warn'
                            : status == 'PENDING_ACTIVATION'
                            ? 'warn'
                            : 'primary',
                }),
                cancel: this._formBuilder.group({
                    show: true,
                    label: 'Cancel',
                }),
            }),
            dismissible: false,
        });
    }
    statusChangeApi(payload: any) {
        this.platformUsersService
            .changeStatus(payload)
            .subscribe((res: any) => {
                if (!res?.error) {
                    this.snackBar.successSnackBar(res?.message);
                } else {
                    this.snackBar.errorSnackBar(res?.message);
                }
            });
    }
}
