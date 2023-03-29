import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlatformUsersFormComponent } from '../platform-users-form/platform-users-form.component';

@Component({
    selector: 'app-platform-users-list',
    templateUrl: './platform-users-list.component.html',
    styleUrls: ['./platform-users-list.component.scss'],
})
export class PlatformUsersListComponent implements OnInit {
    formList: [];
    requiredSkeletonData = {
        rowsToDisplay: 10,
        displayProfilePicture: false,
    };
    constructor(private dialog: MatDialog) {}

    ngOnInit(): void {}

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
                // this.resetList();
            }
        });
    }
}
