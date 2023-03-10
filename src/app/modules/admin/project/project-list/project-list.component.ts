import {
    Component,
    ElementRef,
    OnInit,
    QueryList,
    ViewChildren,
    ViewEncapsulation,
} from '@angular/core';
import { AuthService } from '@services/auth/auth.service';
import { CreateProjecteService } from '@services/create-projecte.service';
import { Router } from '@angular/router';
import { FuseCardComponent } from '@fuse/components/card';
import { SessionService } from '@services/auth/session.service';
import { SnackBar } from '../../../../core/utils/snackBar';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
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
    initialLoading = false;
    searchValue = '';
    projectList: any = [];
    count = 1;
    totalPageData = 10;
    totalProject = 0;
    cardList: boolean = true;
    submitInProcess: boolean = false;
    projectSearchInput = new FormControl();
    private _fuseCards!: QueryList<ElementRef>;

    constructor(
        private router: Router,
        private _authService: AuthService,
        private ProjectService: CreateProjecteService,
        private sessionService: SessionService,
        private snackBar: SnackBar
    ) {}

    ngOnInit() {
        const payload = {
            perPageData: this.count,
            totalPerPageData: this.totalPageData,
            projectKey: '',
            projectName: this.searchValue,
        };
        this.getList(payload);
        this.projectSearchInput.valueChanges
            .pipe(
                debounceTime(1000),
                distinctUntilChanged(),
                switchMap((inputChanged) => {
                    const payload = {
                        perPageData: this.count,
                        totalPerPageData: this.totalPageData,
                        projectName: inputChanged.trim(),
                    };
                    return this.ProjectService.getProjectDetails(payload);
                })
            )
            .subscribe(
                (res: any) => {
                    this.handleSearchResponse(res);
                },
                (error) => {
                    this.initialLoading = false;
                }
            );
    }

    gotoAddProject() {
        this.router.navigate(['/projects/add-project']);
    }

    getList(payload: any) {
        this.initialLoading = true;
        this.ProjectService.getProjectDetails(payload).subscribe({
            next: (res: any) => {
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
            this.ProjectService.getProjectDetails(payload).subscribe({
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
        this.router.navigate([`/projects/project/project-details`], {
            queryParams: { id: project?.id },
        });
    }
    syncProject(event: any, id: any) {
        event.preventDefault();
        const payload = {
            id: id,
        };
        this.submitInProcess = true;
        this.ProjectService.syncJira(payload).subscribe({
            next: (res: any) => {
                this.submitInProcess = false;
                if (res?.data?.error) {
                    this.snackBar.errorSnackBar(res?.data?.Message);
                }
                if (res?.data) {
                    this.snackBar.successSnackBar(res?.data);
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
    clearSearch() {
        this.projectSearchInput.setValue('');
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
}