import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggedInUserService } from '@modules/admin/common/services/logged-in-user.service';
import { SnackBar } from 'app/core/utils/snackBar';
import { MenteeService } from '../common/services/mentee.service';

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
    requiredSkeletonData = {
        rowsToDisplay: 10,
        displayProfilePicture: false,
    };
    menteeList: any[] = [];
    constructor(
        private loggedInUserService: LoggedInUserService,
        private router: Router,
        private _activatedRoute: ActivatedRoute,
        private menteeService: MenteeService,
        private snackBar: SnackBar
    ) {}

    ngOnInit(): void {
        this.getUserRole();
    }

    viewMentee(id: string | number) {
        const rpit = this.router.navigate(['./view/', 89], {
            relativeTo: this._activatedRoute,
        });
    }

    viewMenteeFormList(id: string | number) {
        this.router.navigate([`/mentee/form-list/89`]);
    }

    private getUserRole() {
        this.loggedInUserService.getLoggedInUser().subscribe((res: any) => {
            if (res?.role) {
                this.userRole = res?.role;
                this.loggedInUserId = res?.resourceId;
                this.getMenteeList(this.loggedInUserId);
            }
        });
    }
    private getMenteeList(id: number) {
        this.initialLoading = true;
        this.menteeService.getMenteeList(id).subscribe(
            (res: any) => {
                this.initialLoading = false;
                if (res?.data) {
                    this.menteeList = res?.data;
                    this.menteeList = [
                        {
                            firstName: 'Rohan',
                            lastName: 'kadam',
                            email: 'rohan@mindbowser.com',
                            role: 'FRONTEND',
                            menteeResourceId: 78,
                        },
                    ];
                }
            },
            (err) => {
                this.initialLoading = false;
                this.snackBar.errorSnackBar('Something went wrong');
            }
        );
    }
}
