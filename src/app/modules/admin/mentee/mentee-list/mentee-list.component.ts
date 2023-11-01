import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggedInUserService } from '@modules/admin/common/services/logged-in-user.service';

@Component({
    selector: 'app-mentee-list',
    templateUrl: './mentee-list.component.html',
    styleUrls: ['./mentee-list.component.scss'],
})
export class MenteeListComponent implements OnInit {
    @ViewChild('matDrawer', { static: true }) matDrawer!: MatDrawer;
    userRole: string = '';
    loggedInUserId: number;
    initialLoading: boolean = false;
    menteeList: any[] = [
        {
            name: 'Rohan kadam',
            email: 'rohan@mindbowser.com',
            team: 'FRONTEND',
            technologies: ['Angular', 'CSS'],
        },
        {
            name: 'Amaresh joshi',
            email: 'amaresh@mindbowser.com',
            team: 'BACKEND',
            technologies: ['Angular', 'CSS', 'JAVA', 'PYTHON'],
        },
        {
            name: 'Pragati gawade',
            email: 'pragati@mindbowser.com',
            team: 'FRONTEND',
            technologies: [
                'Angular',
                'CSS',
                'Angular',
                'CSS',
                'JAVA',
                'PYTHON',
            ],
        },
    ];
    constructor(
        private loggedInUserService: LoggedInUserService,
        private router: Router,
        private _activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.getUserRole();
    }

    viewMentee() {
        const rpit = this.router.navigate(['./view/', 78], {
            relativeTo: this._activatedRoute,
        });
    }

    private getUserRole() {
        this.loggedInUserService.getLoggedInUser().subscribe((res: any) => {
            if (res?.role) {
                this.userRole = res?.role;
                this.loggedInUserId = res?.resourceId;
                console.log(this.loggedInUserId);
            }
        });
    }
}
