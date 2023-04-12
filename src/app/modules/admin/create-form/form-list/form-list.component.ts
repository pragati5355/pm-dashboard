import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackBar } from '../../../../core/utils/snackBar';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AddFormService } from '@services/add-form.service';
import { AuthService } from '@services/auth/auth.service';
import { CopyFormComponent } from '../copy-form/copy-form.component';
import { ErrorMessage } from 'app/core/constacts/constacts';
import { result } from 'lodash';
import {
    BreakpointObserver,
    Breakpoints,
    BreakpointState,
} from '@angular/cdk/layout';
import { take } from 'rxjs/internal/operators/take';
@Component({
    selector: 'app-form-list',
    templateUrl: './form-list.component.html',
    styleUrls: ['./form-list.component.scss'],
    animations: fuseAnimations,
})
export class FormListComponent implements OnInit {
    formList: any = [];
    isLoading = false;
    pageNo = 1;
    pagination = false;
    initialLoading = false;
    totalPageData = 10;
    totalForm = 0;
    count = 1;
    configForm!: FormGroup;
    configFormWithProject!: FormGroup;
    deleteProjects: any = '';
    cont: HTMLElement | any = document.getElementsByClassName('listClass');
    requiredFormSkeletonData = {
        rowsToDisplay: 10,
        displayProfilePicture: false,
    };
    constructor(
        private router: Router,
        private snackBar: SnackBar,
        private formService: AddFormService,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private dialog: MatDialog,
        public breakpointObserver: BreakpointObserver
    ) {}

    ngOnInit(): void {
        this.loadData();
        this.confirmFormFun();
    }

    gotoAddForm() {
        this.router.navigate(['/forms/add']);
    }

    deleteForm(id: number, projects: any): void {
        if (projects.length == 0) {
            const dialogRef = this._fuseConfirmationService.open(
                this.configForm.value
            );
            dialogRef.afterClosed().subscribe((result) => {
                if (result == 'confirmed') {
                    this.formService
                        .deleteForm({
                            id,
                        })
                        .subscribe(
                            (res: any) => {
                                if (!res.error) {
                                    this.snackBar.successSnackBar(
                                        res.data.message
                                    );
                                } else {
                                    this.snackBar.errorSnackBar(
                                        ErrorMessage.ERROR_SOMETHING_WENT_WRONG
                                    );
                                }
                                this.count = 0;
                                this.formList = [];
                                let payload = {
                                    perPageData: this.count,
                                    totalPerPageData: this.totalPageData,
                                };
                                this.getList(payload);
                            },
                            (error) => {
                                this.snackBar.errorSnackBar('Server error');
                            }
                        );
                }
            });
        } else {
            this.deleteProjectString(projects);
            this.configFormWithProject = this._formBuilder.group({
                title: 'Delete Form',
                message:
                    'This form is attached to the following projects. Remove the association of the form from the projects in order to delete it. <div class="listClass">' +
                    this.deleteProjects +
                    '</div>',
                icon: this._formBuilder.group({
                    show: true,
                    name: 'heroicons_outline:exclamation',
                    color: 'warn',
                }),
                actions: this._formBuilder.group({
                    confirm: this._formBuilder.group({
                        show: false,
                        label: 'Delete',
                        color: 'warn',
                    }),
                    cancel: this._formBuilder.group({
                        show: true,
                        label: 'Cancel',
                    }),
                }),
                dismissible: false,
            });
            const dialogRef = this._fuseConfirmationService.open(
                this.configFormWithProject.value
            );
            dialogRef.afterClosed().subscribe((result) => {
                if (result == 'confirmed') {
                }
            });
        }
    }

    editForm(id: number) {
        this.router.navigate([`/forms/edit/${id}`]);
    }

    viewForm(id: number) {
        this.router.navigate([`/forms/view/${id}`]);
    }

    handleScroll() {
        if (!this.pagination && this.formList.length < this.totalForm) {
            this.count = this.count + this.totalPageData;
            let payload = {
                perPageData: this.count,
                totalPerPageData: this.totalPageData,
            };
            this.pagination = true;
            this.formService.getFormList(payload).subscribe(
                (res: any) => {
                    this.pagination = false;
                    if (res) {
                        this.formList = [...this.formList, ...res.data.forms];
                    }
                },
                (err: any) => {
                    this.pagination = false;
                }
            );
        }
    }

    getList(payload: any) {
        this.initialLoading = true;
        this.formService.getFormList(payload).subscribe(
            (res: any) => {
                this.initialLoading = false;
                if (res.data) {
                    this.formList = res.data.forms;
                    this.totalForm = res.data.totalRecords;
                    this.checkForLargerScreen();
                } else {
                    this.totalForm = 0;
                }
                this.tokenExpireFun(res);
            },
            (error) => {
                this.initialLoading = false;
            }
        );
    }

    duplicateForm(id: number, name: any) {
        const dialogRef = this.dialog.open(CopyFormComponent, {
            disableClose: true,
            panelClass: 'warn-dialog-content',
            autoFocus: false,
            data: {
                id: id,
                formname: name,
            },
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result.result == 'success') {
                this.count = 0;
                this.formList = [];
                let payload = {
                    perPageData: this.count,
                    totalPerPageData: this.totalPageData,
                };
                this.getList(payload);
            }
        });
    }
    deleteProjectString(projects: any) {
        this.deleteProjects = '';
        var arr = projects;
        for (let i = 0; i <= arr.length - 1; i++) {
            this.deleteProjects = this.deleteProjects + arr[i] + '<br>';
        }
    }

    private loadData() {
        const payload = {
            perPageData: this.count,
            totalPerPageData: this.totalPageData,
        };
        this.getList(payload);
    }

    private confirmFormFun() {
        this.configForm = this._formBuilder.group({
            title: 'Delete Form',
            message:
                'Are you sure you want to delete this form? <span class="font-medium">This action cannot be undone!</span>',
            icon: this._formBuilder.group({
                show: true,
                name: 'heroicons_outline:exclamation',
                color: 'warn',
            }),
            actions: this._formBuilder.group({
                confirm: this._formBuilder.group({
                    show: true,
                    label: 'Delete',
                    color: 'warn',
                }),
                cancel: this._formBuilder.group({
                    show: true,
                    label: 'Cancel',
                }),
            }),
            dismissible: false,
        });
    }

    private tokenExpireFun(res: any) {
        if (res.tokenExpire == true) {
            this._authService.updateAndReload(window.location);
        }
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
