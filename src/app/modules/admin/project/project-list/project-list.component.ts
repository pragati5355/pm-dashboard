import {
    Component,
    ElementRef,
    OnInit,
    ViewChildren,
    ViewEncapsulation,
} from '@angular/core';
import { AuthService } from '@services/auth/auth.service';
import { CreateProjecteService } from '@services/create-projecte.service';
import { Router } from '@angular/router';
import { FuseCardComponent } from '@fuse/components/card';
import { SnackBar } from '../../../../core/utils/snackBar';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import {
    BreakpointObserver,
    Breakpoints,
    BreakpointState,
} from '@angular/cdk/layout';
import { take } from 'rxjs/internal/operators/take';
import { WeeklyFeedbackFormComponent } from '../weekly-feedback-form/weekly-feedback-form.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ProjectListComponent implements OnInit {
    @ViewChildren(FuseCardComponent, { read: ElementRef })
    pageNo = 1;
    pagination = false;
    initialLoading = true;
    searchValue = '';
    projectList: any = [];
    count = 1;
    totalPageData = 10;
    totalProject = 0;
    cardList: boolean = true;
    submitInProcess: boolean = false;
    projectSearchInput = new FormControl();
    requiredProjectListSkeletonData = {
        rowsToDisplay: 10,
        displayProfilePicture: false,
    };

    constructor(
        private router: Router,
        private _authService: AuthService,
        private projectService: CreateProjecteService,
        private snackBar: SnackBar,
        public breakpointObserver: BreakpointObserver,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.loadData();
        this.addProjectSearchValueSubscription();
    }

    gotoAddProject() {
        this.router.navigate(['/projects/add']);
    }

    getList(payload: any) {
        this.initialLoading = true;
        this.projectService.getProjectDetails(payload).subscribe({
            next: (res: any) => {
                this.initialLoading = false;
                if (res?.data) {
                    this.projectList = res?.data?.projects;
                    this.totalProject = res?.data?.totalRecored;
                    this.checkForLargerScreen();
                } else if (res?.data == null) {
                    this.projectList = [];
                    this.totalProject = 0;
                } else {
                    this.totalProject = 0;
                }
                this.handleTokenExpiry(res);
            },
            error: (error) => {
                this.initialLoading = false;
            },
        });
    }

    handleScroll() {
        const totalcount = this.count * this.totalPageData;
        if (!this.pagination && this.projectList.length < this.totalProject) {
            this.count = this.count + this.totalPageData;
            const payload = {
                perPageData: this.count,
                totalPerPageData: this.totalPageData,
                projectName: this.searchValue,
            };
            this.pagination = true;
            this.projectService.getProjectDetails(payload).subscribe({
                next: (res: any) => {
                    this.pagination = false;
                    if (res) {
                        this.projectList = [
                            ...this.projectList,
                            ...res.data.projects,
                        ];
                    }
                },
                error: (err: any) => {
                    this.pagination = false;
                },
            });
        }
    }
    goToProject(project) {
        this.router.navigate([`projects/${project.id}/details`]);
    }
    syncProject(event: any, id: any) {
        event.preventDefault();
        const payload = {
            id: id,
        };
        this.submitInProcess = true;
        this.projectService.syncJira(payload).subscribe({
            next: (res: any) => {
                this.submitInProcess = false;
                if (res?.error) {
                    this.snackBar.errorSnackBar(res?.message);
                }
                if (res?.data || !res?.error) {
                    this.snackBar.successSnackBar(res?.message);
                    const payload = {
                        perPageData: 0,
                        totalPerPageData: this.totalPageData,
                        projectKey: '',
                        projectName: this.searchValue,
                    };
                    this.handleTokenExpiry(res);
                    this.getList(payload);
                }
            },
            error: (error) => {
                this.submitInProcess = false;
                this.snackBar.errorSnackBar('server error');
            },
        });
    }
    weeklyFeedbackDialog(id: any) {
        const dialogRef = this.dialog.open(WeeklyFeedbackFormComponent, {
            disableClose: true,
            width: '60%',
            panelClass: 'warn-dialog-content',
            autoFocus: false,
            data: {
                projectId: id,
            },
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result == 'success') {
            }
        });
    }
    clearSearch() {
        this.projectSearchInput.setValue('', { emitEvent: false });
        this.count = 1;
        this.searchValue = '';
        const payload = {
            perPageData: this.count,
            totalPerPageData: this.totalPageData,
            projectKey: '',
            projectName: this.searchValue,
        };
        this.getList(payload);
    }
    private handleSearchResponse(res: any) {
        this.initialLoading = false;
        if (res?.data) {
            this.projectList = res?.data?.projects;
            this.totalProject = res?.data?.totalRecored;
        } else if (res?.data == null) {
            this.projectList = [];
            this.totalProject = 0;
        } else {
            this.totalProject = 0;
        }
        this.handleTokenExpiry(res);
    }

    private handleTokenExpiry(res: any) {
        if (res?.tokenExpire == true) {
            this._authService.updateAndReload(window.location);
        }
    }

    private addProjectSearchValueSubscription() {
        this.projectSearchInput.valueChanges
            .pipe(
                map((value) => value?.trim()),
                debounceTime(1000),
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
        const payload = {
            perPageData: this.count,
            totalPerPageData: this.totalPageData,
            projectName: searchKey,
        };
        this.projectService.getProjectDetails(payload).subscribe(
            (res: any) => {
                this.handleSearchResponse(res);
            },
            (error) => {
                this.initialLoading = false;
            }
        );
    }

    private loadData() {
        const payload = {
            perPageData: this.count,
            totalPerPageData: this.totalPageData,
            projectKey: '',
            projectName: this.searchValue,
        };
        this.getList(payload);
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
