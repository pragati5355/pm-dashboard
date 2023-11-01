import { Component, OnInit } from '@angular/core';
import { LoggedInUserService } from '@modules/admin/common/services/logged-in-user.service';

@Component({
    selector: 'app-mentee-list',
    templateUrl: './mentee-list.component.html',
    styleUrls: ['./mentee-list.component.scss'],
})
export class MenteeListComponent implements OnInit {
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
    constructor(private loggedInUserService: LoggedInUserService) {}

    ngOnInit(): void {
        this.getUserRole();
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
