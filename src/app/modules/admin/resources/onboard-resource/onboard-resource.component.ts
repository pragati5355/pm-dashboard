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
import {
    BreakpointObserver,
    BreakpointState,
    Breakpoints,
} from '@angular/cdk/layout';
import { take } from 'rxjs/internal/operators/take';

@Component({
    selector: 'app-onboard-resource',
    templateUrl: './onboard-resource.component.html',
    styleUrls: ['./onboard-resource.component.scss'],
})
export class OnboardResourceComponent implements OnInit {
    initialLoading = false;
    registeredList: any[] = [];
    count = 1;
    totalPerPageData = 10;
    totalRecord: any;
    pagination = false;
    requiredReposSkeletonData = {
        rowsToDisplay: 10,
        displayProfilePicture: false,
    };

    constructor(
        private router: Router,
        private dialog: MatDialog,
        private _authService: AuthService,
        private resourceService: ResourcesService,
        public breakpointObserver: BreakpointObserver
    ) {}

    ngOnInit() {
        this.getList();
    }

    getList() {
        const payload = {
            perPageData: this.count,
            totalPerPageData: this.totalPerPageData,
        };
        this.initialLoading = true;
        this.resourceService
            .getRegisteredResource(payload)
            .subscribe((res: any) => {
                this.initialLoading = false;
                if (!res?.error) {
                    this.handleGetResourceMemberResponse(res);
                    this.checkForLargerScreen();
                }
                if (res?.tokenExpire) {
                    this._authService.updateAndReload(window.location);
                }
            });
    }

    handleGetResourceMemberResponse(res: any) {
        if (res.data) {
            this.totalRecord = res?.data?.totalRecored;
            this.registeredList = res?.data?.resource;
            this.initialLoading = false;
        } else if (res?.data == null) {
            this.totalRecord = 0;
            this.initialLoading = false;
        }
    }

    goBack() {
        this.router.navigate(['/resources']);
    }

    gotoDetailspage(mode: String, data: any) {
        const dialogRef = this.dialog.open(OnboardResourceDetailsComponent, {
            disableClose: true,
            width: '50%',
            maxHeight: '90vh',
            panelClass: 'warn-dialog-content',
            autoFocus: false,
            data: {
                mode: mode,
                editData: data,
            },
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result == 'success') {
                this.count = 1;
                this.totalPerPageData = 10;
                this.getList();
            }
        });
    }

    private getDefaultSearchPayload(count?: any) {
        return {
            perPageData: this.count,
            totalPerPageData: this.totalPerPageData,
        };
    }

    private checkForLargerScreen() {
        this.breakpointObserver
            .observe([Breakpoints.XLarge, Breakpoints.Large])
            .pipe(take(1))
            .subscribe((state: BreakpointState) => {
                if (state.matches) {
                    this.handleScroll();
                }
            });
    }

    handleScroll() {
        if (!this.pagination && this.registeredList.length < this.totalRecord) {
            this.count = this.count + this.totalPerPageData;
            const payload = this.getDefaultSearchPayload(this.count);
            this.pagination = true;
            this.resourceService.getRegisteredResource(payload).subscribe(
                (res: any) => {
                    this.pagination = false;
                    if (res?.data) {
                        this.registeredList = [
                            ...this.registeredList,
                            ...res?.data?.resource,
                        ];
                    }
                },
                (err: any) => {
                    this.pagination = false;
                }
            );
        }
    }
}
