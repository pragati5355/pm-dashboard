import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
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
    configForm: FormGroup;
    constructor(
        private matDialog: MatDialog,
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit(): void {
        this.getCurrentMonthAndYear();
        this.routeSubscription();
        this.userState = this.authService.getUser();
        this.initializeConfigForm();
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

    deleteWorkLog(id: number) {
        const dialogRef = this.fuseConfirmationService.open(
            this.configForm.value
        );

        dialogRef.afterClosed().subscribe((result) => {
            if (result == 'confirmed') {
            }
        });
    }

    private initializeConfigForm() {
        this.configForm = this.formBuilder.group({
            title: 'Delete work log',
            message: 'Are you sure you want to delete this work log?',
            icon: this.formBuilder.group({
                show: true,
                name: 'heroicons_outline:exclamation',
                color: 'warn',
            }),
            actions: this.formBuilder.group({
                confirm: this.formBuilder.group({
                    show: true,
                    label: 'Yes',
                    color: 'mat-warn',
                }),
                cancel: this.formBuilder.group({
                    show: true,
                    label: 'No',
                }),
            }),
            dismissible: false,
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
