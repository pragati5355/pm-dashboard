import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { AddEditWorkLogComponent } from '../add-edit-work-log/add-edit-work-log.component';
import { MAT_TAB_MONTHS } from '../common/constants';

@Component({
    selector: 'app-work-logs',
    templateUrl: './work-logs.component.html',
    styleUrls: ['./work-logs.component.scss'],
})
export class WorkLogsComponent implements OnInit {
    selected: string = '2020';
    currentYear: string = '';
    selectedTabIndex: number = 0;
    projectId: any;
    matTabList: any[] = MAT_TAB_MONTHS;
    requiredSprintSkeletonData = {
        rowsToDisplay: 10,
        displayProfilePicture: false,
    };
    initialLoading: boolean = false;
    userState: any;
    constructor(
        private matDialog: MatDialog,
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.getCurrentMonthAndYear();
        this.routeSubscription();
        this.userState = this.authService.getUser();
    }

    close() {}

    onTabChanged(event: any) {
        console.log(event);
    }

    goBack() {
        this.router.navigate([`/projects/${this.projectId}/details`]);
    }

    addOrEditWorklog(workLogData: any, mode: string) {
        const workLogdialogRef = this.matDialog.open(AddEditWorkLogComponent, {
            disableClose: true,
            width: '60%',
            maxHeight: '90vh',
            panelClass: 'warn-dialog-content',
            autoFocus: false,
            data: {
                data: workLogData,
                mode: mode,
                userState: this.userState,
            },
        });
        workLogdialogRef.afterClosed().subscribe((result: any) => {
            if (result) {
            }
        });
    }

    private getCurrentMonthAndYear() {
        this.selected = String(new Date().getFullYear());
        this.selectedTabIndex = new Date().getMonth();
    }

    private routeSubscription() {
        this.route.params.subscribe((projectId) => {
            if (projectId['id']) {
                this.projectId = projectId['id'];
            }
        });
    }
}
