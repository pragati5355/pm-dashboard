import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    userName: string;
    userImageUrl: string;

    constructor(private _authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.loadUserData();
    }
    loadUserData() {
        const user = this._authService.getUser();
        this.userName = `${user.firstName ? user.firstName : ' '} ${
            user.lastName ? user.lastName : ' '
        }`;
        this.userImageUrl = this._authService.getUserPhoto();
    }
    goToProjects() {
        this.router.navigate(['/projects/project-list']);
    }
    goToResources() {
        this.router.navigate(['/resources/resources-list']);
    }
}
