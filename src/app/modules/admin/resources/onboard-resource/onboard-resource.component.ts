import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OnboardResourceDetailsComponent } from '../onboard-resource-details/onboard-resource-details.component';

@Component({
    selector: 'app-onboard-resource',
    templateUrl: './onboard-resource.component.html',
    styleUrls: ['./onboard-resource.component.scss'],
})
export class OnboardResourceComponent implements OnInit {
    initialLoading = false;
    requiredReposSkeletonData = {
        rowsToDisplay: 10,
        displayProfilePicture: false,
    };

    constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private router: Router,
      private dialog: MatDialog,
      private matDialogRef: MatDialogRef<OnboardResourceComponent>
      ) {}

    ngOnInit(): void {}

    goBack() {
        this.router.navigate(['/resources']);
    }

    gotoDetailspage(){
      const dialogRef = this.dialog.open(OnboardResourceDetailsComponent, {
        disableClose: true,
        width: '50%',
        panelClass: 'warn-dialog-content',
        autoFocus: false,
        data: {
  
        },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
        if (result == 'success') {
           
        }
    });
    }
}
