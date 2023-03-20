import { I } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { DashboardService } from '@services/dashboard.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    userName: string;
    userImageUrl: string;
    noOfProjects: Number = 0;
    noOfResources: Number = 0;
    noOfRepos: Number = 0;
    showSkeletonLoader = true;

    constructor(
        private _authService: AuthService,
        private router: Router,
        private dashboardService: DashboardService
    ) {}

    ngOnInit(): void {
        this.loadUserData();
        this.getDashboardStatsCounts();
    }
    loadUserData() {
        const user = this._authService.getUser();
        const fullUserName = `${user?.firstName ? user?.firstName : ' '} ${
            user?.lastName ? user?.lastName : ' '
        }`;
        this.userName = fullUserName.trim();
        this.userImageUrl = this._authService.getUserPhoto();
    }
    goToProjects() {
        this.router.navigate(['/projects/project-list']);
    }
    goToResources() {
        this.router.navigate(['/resources/resources-list']);
    }
    getDashboardStatsCounts() {
        this.dashboardService.getDashboardStatsCount().subscribe((res: any) => {
            if (res?.data) {
                this.showSkeletonLoader = false;
                this.noOfProjects = res?.data?.projectCount;
                this.noOfResources = res?.data?.resourceCount;
                this.noOfRepos = res?.data?.repoCount;
            }
        });
    }
}
