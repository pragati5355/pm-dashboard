import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@services/auth/auth.service';
import { PlatformUsersService } from '../common/services/platform-users.service';
import { PlatformUsersFormComponent } from '../platform-users-form/platform-users-form.component';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SnackBar } from 'app/core/utils/snackBar';

@Component({
    selector: 'app-platform-users-list',
    templateUrl: './platform-users-list.component.html',
    styleUrls: ['./platform-users-list.component.scss'],
})
export class PlatformUsersListComponent implements OnInit {
    userList: any[] = [];
    searchValue: string = '';
    requiredSkeletonData = {
        rowsToDisplay: 10,
        displayProfilePicture: false,
    };
    initialLoading: boolean = false;
    configFormStatus!: FormGroup;
    totalRecords: number = 0;
    platformSearchInput = new FormControl();
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

    clearSearch() {
        this.searchValue = '';
    }

    openDialog(mode: String, data: any) {
        const dialogRef = this.dialog.open(PlatformUsersFormComponent, {
            disableClose: true,
            width: '50%',
            panelClass: 'warn-dialog-content',
            autoFocus: false,
            data: {
                mode: mode,
                editData: data,
            },
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result == 'success') {
                this.getList();
            }
        });
    }
 
    statusChangeApi(payload: any) {
        console.log(payload);
        this.userList = [];
        this.initialLoading = true;
        this.platformUsersService
            .changeStatus(payload)
            .subscribe((res: any) => {
                this.initialLoading = false;
                if (!res?.error) {
                    this.getList();
                    this.snackBar.successSnackBar(res?.message);
                } else {
                    this.snackBar.errorSnackBar(res?.message);
                }
                if (res?.tokenExpire) {
                    this._authService.updateAndReload(window.location);
                }
            },
            (err) => {
                this.initialLoading = false;
            });
    }

    deleteUser(list : any){
        this.initailizeConfirmationFormPopup();
        const confirmPopDialog = this._fuseConfirmationService.open(
            this.configFormStatus.value
        );

        confirmPopDialog.afterClosed().subscribe((result) => {
            if (result == 'confirmed') {
                this.initialLoading = true;
                const payload = {
                    id: list.id,
                    email: list.email,
                    firstName: list.firstName,
                    lastName: list.lastName,
                    status: list.status,
                    role: list.role,
                    isDeleted: true,
                };
                this.statusChangeApi(payload);
            }
        });

    }

    initailizeConfirmationFormPopup() {
        this.configFormStatus = this._formBuilder.group({
            title: 'Delete User',
            message: 'Are you sure you want to delete this user?',
            icon: this._formBuilder.group({
                show: true,
                name: 'heroicons_outline:exclamation',
                color: 'warn',
            }),
            actions: this._formBuilder.group({
                confirm: this._formBuilder.group({
                    show: true,
                    label: 'Delete User',
                    color: 'warn',
                }),
                cancel: this._formBuilder.group({
                    show: true,
                    label: 'Cancel',
                }),
            }),
            dismissible: false,
        });
    }
}
