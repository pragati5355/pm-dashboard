import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OnboardResourceDetailsComponent } from '../onboard-resource-details/onboard-resource-details.component';
import { AuthService } from '@services/auth/auth.service';
import { ResourcesService } from '../common/services/resources.service';
import {
    BreakpointObserver,
    BreakpointState,
    Breakpoints,
} from '@angular/cdk/layout';
import { take } from 'rxjs/internal/operators/take';
import { SnackBar } from 'app/core/utils/snackBar';
import { FormControl } from '@angular/forms';
import { map, debounceTime, distinctUntilChanged } from 'rxjs';

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
    submitInProgress: boolean = false;
    searchControl = new FormControl();
    searchValue = '';

    constructor(
        private router: Router,
        private dialog: MatDialog,
        private _authService: AuthService,
        private resourceService: ResourcesService,
        public breakpointObserver: BreakpointObserver,
        private snackBar: SnackBar
    ) {}

    ngOnInit() {
        this.getList();
        this.addResourceSearchValueSubscription();
    }

    getList() {
        const payload = {
            perPageData: this.count,
            totalPerPageData: this.totalPerPageData,
            searchString: this.searchValue,
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
            width: '98%',
            maxWidth: '800px',
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
                // this.getList();
                window.location.reload();
            }
        });
    }

    submit(resource: any) {
        this.submitInProgress = true;
        this.resourceService
            .saveOnboardedResource(resource?.details)
            ?.subscribe((res: any) => {
                this.submitInProgress = false;
                if (!res?.error) {
                    this.snackBar.successSnackBar(res?.message);
                    this.getList();
                } else {
                    this.snackBar.errorSnackBar(
                        res?.message ? res?.message : 'Something went wrong'
                    );
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

    private addResourceSearchValueSubscription() {
        this.searchControl.valueChanges
            .pipe(
                map((value) => value?.trim()),
                debounceTime(500),
                distinctUntilChanged()
            )
            .subscribe((searchKey) => {
                this.searchValue = searchKey;
                if (searchKey) {
                    this.getSearchResult(searchKey);
                } else {
                    this.clearSearch();
                }
            });
    }

    private getSearchResult(searchKey: any) {
        this.count = 1;
        this.totalPerPageData = 10;
        const payload = {
            perPageData: this.count,
            totalPerPageData: this.totalPerPageData,
            searchString: searchKey,
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

    private clearSearch() {
        this.searchControl.setValue('', { emitEvent: false });
        this.count = 1;
        this.searchValue = '';
        this.getList();
    }

    private getDefaultSearchPayload(count?: any) {
        return {
            perPageData: this.count,
            totalPerPageData: this.totalPerPageData,
            searchString: this.searchValue,
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
}
