import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProfitLossService } from '../common/services/profit-loss.service';
import { AuthService } from '@services/auth/auth.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import {
    BreakpointObserver,
    BreakpointState,
    Breakpoints,
} from '@angular/cdk/layout';
import { take } from 'rxjs/internal/operators/take';

@Component({
    selector: 'app-profit-loss-projects-list',
    templateUrl: './profit-loss-projects-list.component.html',
    styleUrls: ['./profit-loss-projects-list.component.scss'],
})
export class ProfitLossProjectsListComponent implements OnInit {
    initialLoading: boolean = false;
    pagination = false;
    count = 1;
    totalPageData = 10;
    totalProject = 0;
    projectList: any = [];
    projectId: number;
    filteredProjectList: any = [];
    searchValue: string = '';
    requiredSkeletonData = {
        rowsToDisplay: 10,
        displayProfilePicture: false,
    };
    searchControl = new FormControl();

    constructor(
        private pNLProjectList: ProfitLossService,
        private _authService: AuthService,
        private datePipe: DatePipe,
        private router: Router,
        public breakpointObserver: BreakpointObserver
    ) {}

    ngOnInit(): void {
        this.addSearchListener();
        this.loadProjectsList();
    }

    goToStatisticPage(id: any) {
        this.router.navigate([`/profit-loss/${id}`]);
    }

    addSearchListener() {
        this.searchControl?.valueChanges.subscribe((searchKey: string) => {
            searchKey = searchKey?.trim()?.toLowerCase();
            if (searchKey) {
                this.filteredProjectList = this.projectList.filter((project) =>
                    project?.name?.toLowerCase()?.includes(searchKey)
                );
            } else {
                this.filteredProjectList = this.projectList;
            }
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
            this.pNLProjectList.getPNLProjectList(payload).subscribe({
                next: (res: any) => {
                    this.pagination = false;
                    if (res) {
                        this.filteredProjectList = [
                            ...this.filteredProjectList,
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

    private loadProjectsList() {
        this.initialLoading = true;
        const payload = {
            perPageData: this.count,
            totalPerPageData: this.totalPageData,
            projectKey: '',
            projectName: this.searchValue,
        };
        this.pNLProjectList.getPNLProjectList(payload).subscribe(
            (res: any) => {
                this.initialLoading = false;
                if (res?.error === false) {
                    this.projectList = res?.data?.projects;
                    this.filteredProjectList = res?.data?.projects;
                    this.totalProject = res?.data?.totalRecored;
                    this.checkForLargerScreen();
                } else if (res?.data == null) {
                    this.projectList = [];
                    this.totalProject = 0;
                }
                if (res?.tokenExpire) {
                    this._authService.updateAndReload(window.location);
                }
            },
            (err) => {
                this.initialLoading = false;
            }
        );
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
