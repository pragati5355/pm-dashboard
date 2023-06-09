import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StaticData } from '../../../../../core/constacts/static';
import { CreateProjecteService } from '@services/create-projecte.service';
import { Input } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';
import { InvoicePercentageComponent } from '../invoice-percentage/invoice-percentage.component';
import { MatDialog } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SprintService } from '../../common/services/sprint.service';
import { SnackBar } from 'app/core/utils/snackBar';
@Component({
    selector: 'app-sprints-list',
    templateUrl: './sprints-list.component.html',
    styleUrls: ['./sprints-list.component.scss'],
})
export class SprintsListComponent implements OnInit {
    count = 1;
    initialLoading: boolean = false;
    totalRecored = 0;
    totalPerPageData = StaticData.PER_PAGE_DATA;
    sprintList: any = [];
    configForm: FormGroup;
    requiredSprintSkeletonData = {
        rowsToDisplay: 10,
        displayProfilePicture: false,
    };

    constructor(
        private _authService: AuthService,
        private ProjectService: CreateProjecteService,
        private router: Router,
        private dialog: MatDialog,
        private fuseConfirmationService: FuseConfirmationService,
        private formBuilder: FormBuilder,
        private sprintService: SprintService,
        private snackBar: SnackBar
    ) {}
    @Input() dataId: any;
    ngOnInit(): void {
        this.initialLoading = true;
        let payload = {
            id: this.dataId,
        };
        this.initializeConfigForm();
        this.getSprintList(payload);
    }

    getSprintList(paylaod: any) {
        this.initialLoading = true;
        this.ProjectService.getSprintList(paylaod).subscribe(
            (res: any) => {
                if (res.data) {
                    this.sprintList = res.data;
                    this.totalRecored = this.sprintList.length
                        ? this.sprintList.length
                        : 0;
                    this.initialLoading = false;
                } else {
                    this.totalRecored = 0;
                    this.initialLoading = false;
                }
                if (res.tokenExpire == true) {
                    this._authService.updateAndReload(window.location);
                }
            },
            (error) => {
                this.initialLoading = false;
            }
        );
    }
    goToSprint(id: number) {
        this.router.navigate([`/projects/${this.dataId}/sprint-details/${id}`]);
    }
    markAsComplete(sprintId) {
        const payload = {
            id: sprintId,
            status: 'COMPLETED',
        };
        const dialogRef = this.fuseConfirmationService.open(
            this.configForm.value
        );

        dialogRef.afterClosed().subscribe((result) => {
            if (result == 'confirmed') {
                this.updateSprintStatus(payload);
            }
        });
    }
    updateSprintStatus(payload: any) {
        this.initialLoading = true;
        this.sprintService.postSprintStatus(payload).subscribe(
            (res: any) => {
                if (!res?.error) {
                    this.initialLoading = false;
                    this.snackBar.successSnackBar(res?.message);
                } else {
                    this.initialLoading = false;
                    this.snackBar.errorSnackBar(res?.message);
                }
                if (res?.tokenExpire == true) {
                    this._authService.updateAndReload(window.location);
                }
            },
            (err: any) => {
                this.initialLoading = false;
                this.snackBar.errorSnackBar('Something Went Wrong');
            }
        );
    }
    openInvoiceDialog(data: any) {
        const dialogRef = this.dialog.open(InvoicePercentageComponent, {
            disableClose: true,
            width: '40%',
            panelClass: 'warn-dialog-content',
            autoFocus: false,
            data: {
                sprintData: data,
            },
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result) {
                let payload = {
                    id: this.dataId,
                };
                this.getSprintList(payload);
            }
        });
    }
    private initializeConfigForm() {
        this.configForm = this.formBuilder.group({
            title: 'Mark this sprint as Complete?',
            message:
                'Are you sure you want to mark this sprint as completed ? <br/> <span class="font-medium">This action will trigger the mail to the admin.</span>',
            icon: this.formBuilder.group({
                show: true,
                name: 'heroicons_outline:exclamation',
                color: 'primary',
            }),
            actions: this.formBuilder.group({
                confirm: this.formBuilder.group({
                    show: true,
                    label: 'Yes',
                    color: 'primary',
                }),
                cancel: this.formBuilder.group({
                    show: true,
                    label: 'No',
                }),
            }),
            dismissible: false,
        });
    }
}
