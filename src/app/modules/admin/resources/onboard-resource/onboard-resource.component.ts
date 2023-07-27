import { Component, Inject, OnInit } from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OnboardResourceDetailsComponent } from '../onboard-resource-details/onboard-resource-details.component';
import { AuthService } from '@services/auth/auth.service';
import { ResourceService } from '@modules/public/resource/common/services/resource.service';
import { ResourcesService } from '../common/services/resources.service';

@Component({
    selector: 'app-onboard-resource',
    templateUrl: './onboard-resource.component.html',
    styleUrls: ['./onboard-resource.component.scss'],
})
export class OnboardResourceComponent implements OnInit {
    initialLoading = false;
    registeredList: any = [];
    perPageData = 1;
    totalPerPageData = 10;
    totalRecord: any;
    requiredReposSkeletonData = {
        rowsToDisplay: 10,
        displayProfilePicture: false,
    };

    constructor(
        private router: Router,
        private dialog: MatDialog,
        private _authService: AuthService,
        private resourceService: ResourcesService
    ) {}

    ngOnInit() {
        this.getList();
    }

    getList() {
        const payload = {
            perPageData: this.perPageData,
            totalPerPageData: this.totalPerPageData,
        };
        this.initialLoading = true;
        this.resourceService
            .getRegisteredResource(payload)
            .subscribe((res: any) => {
                this.initialLoading = false;
                if (!res?.error) {
                    this.registeredList = res?.data?.resource;
                    this.totalRecord = res?.data?.totalRecored;
                    console.log('this.totalRecord -> ', this.totalRecord);
                    console.log('this.registeredList -> ', this.registeredList);
                }
                if (res?.tokenExpire) {
                    this._authService.updateAndReload(window.location);
                }
            });
    }

    goBack() {
        this.router.navigate(['/resources']);
    }

    gotoDetailspage(mode: String, data: any) {
        const dialogRef = this.dialog.open(OnboardResourceDetailsComponent, {
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
}
