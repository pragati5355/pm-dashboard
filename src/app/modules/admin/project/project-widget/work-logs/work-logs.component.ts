import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from '@services/auth/auth.service';
import { AddEditWorkLogComponent } from '../add-edit-work-log/add-edit-work-log.component';
import { MAT_TAB_MONTHS } from '../common/constants';
import { WorkLogService } from '../common/services/work-log.service';

@Component({
    selector: 'app-work-logs',
    templateUrl: './work-logs.component.html',
    styleUrls: ['./work-logs.component.scss'],
})
export class WorkLogsComponent implements OnInit {
    selectedYear: string = '2020';
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
    htmlText: string =
        '<div class="px-2">12/12/2023</div><div>4</div><div class="truncate"></div>';
    workLogsList: any[] = [];
    projectName: string = '';
    constructor(
        private matDialog: MatDialog,
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private fuseConfirmationService: FuseConfirmationService,
        private workLogService: WorkLogService
    ) {}

    ngOnInit(): void {
        this.getCurrentMonthAndYear();
        this.routeSubscription();
        this.userState = this.authService.getUser();
        this.initializeConfigForm();
        this.loadData(this.selectedYear, this.selectedTabIndex);
    }

    close() {}

    onTabChanged(event: any) {
        this.selectedTabIndex = event?.index;
        this.loadData(this.selectedYear, this.selectedTabIndex);
    }

    onYearChange(event: any) {
        this.loadData(event?.value, this.selectedTabIndex);
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
                projectName: this.projectName,
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

    private loadData(year: any, month: number) {
        this.initialLoading = true;
        const payload = {
            resourceId: this.userState?.userId,
            projectId: this.projectId,
            month: ++month,
            year: year,
        };
        this.workLogService.getWorkLogs(payload).subscribe((res: any) => {
            this.initialLoading = false;
            if (!res?.error) {
                this.workLogsList = res?.data?.list;
                this.projectName = res?.data?.projectName;
            }
        });
    }

    private getCurrentMonthAndYear() {
        this.selectedYear = String(new Date().getFullYear());
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
