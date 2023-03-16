import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ValidationConstants } from '../../../../core/constacts/constacts';
import { ExprienceValidation } from '../../../../core/utils/Validations';
import { fuseAnimations } from '@fuse/animations';
import { CreateProjecteService } from '@services/create-projecte.service';
import { StaticData } from 'app/core/constacts/static';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { MatMenuTrigger } from '@angular/material/menu';
import { SnackBar } from '../../../../core/utils/snackBar';
import { MatDrawer } from '@angular/material/sidenav';
import {
    debounceTime,
    distinctUntilChanged,
    map,
    Subject,
    takeUntil,
} from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
@Component({
    selector: 'app-resources-list',
    templateUrl: './resources-list.component.html',
    styleUrls: ['./resources-list.component.scss'],
    animations: fuseAnimations,
})
export class ResourcesListComponent implements OnInit {
    @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
    @ViewChild('matDrawer', { static: true }) matDrawer!: MatDrawer;

    selectedContact: any;
    drawerMode!: 'side' | 'over';
    minExprience = '';
    maxExprience = '';
    exprienceForm!: FormGroup;
    startExprience: any;
    endExprience: any;
    configForm!: FormGroup;
    configFormAssignedProject!: FormGroup;
    technologys = new FormControl('');
    projects = new FormControl('');
    techName: any = null;
    technologyList: any = [];
    pagination = false;
    searchValue = '';
    techList: string[] = [];
    count = 1;
    resources: any[] = [];
    initialLoading: boolean = false;
    totalRecored: any;
    totalPerPageData = StaticData.PER_PAGE_DATA;
    allResources: any;
    updateDeleteObj: any = [];
    deleteObject: any;
    projectsList: any = [];
    deletePojects: any = '';
    opened: any;
    resourceSearchInput = new FormControl();

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _authService: AuthService,
        private projectService: CreateProjecteService,
        private router: Router,
        private _formBuilder: FormBuilder,
        private _activatedRoute: ActivatedRoute,
        private _fuseConfirmationService: FuseConfirmationService,
        private snackBar: SnackBar,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService
    ) {}

    ngOnInit(): void {
        this.loadData();
        this.initializeForms();
        this.addRequiredSubscriptions();
    }

    get exprienceValidForm(): { [key: string]: AbstractControl } {
        return this.exprienceForm.controls;
    }

    gotoAddResources() {
        this.router.navigate(['/resources/add-resources']);
    }

    getList(searchPayload?: any) {
        if (!searchPayload) {
            searchPayload = this.getDefaultSearchPayload();
        }
        this.initialLoading = true;
        this.projectService.getResourceMember(searchPayload).subscribe(
            (res: any) => {
                this.handleGetResourceMemberResponse(res);
            },
            (error) => {
                this.totalRecored = 0;
                this.initialLoading = false;
            }
        );
    }

    getTechnologies() {
        this.projectService.getTechnology().subscribe(
            (res: any) => {
                this.technologyList = res?.data;
            },
            (error) => {}
        );
    }

    handleGetResourceMemberResponse(res: any) {
        if (res.data) {
            this.totalRecored = res?.data?.totalRecored;
            this.resources = res?.data?.teamMember;
            this.initialLoading = false;
        } else if (res?.data == null) {
            this.totalRecored = 0;
            this.initialLoading = false;
        } else if (res.tokenExpire == true) {
            this.handleTokenExpiry();
        }
    }

    handleScroll() {
        if (!this.pagination) {
            this.count = this.count + this.totalPerPageData;
            const expriencePayload = this.getExperiencePayload();
            const payload = this.getDefaultSearchPayload(this.count);
            this.pagination = true;
            this.projectService.getResourceMember(payload).subscribe(
                (res: any) => {
                    this.pagination = false;
                    if (res?.data) {
                        this.resources = [
                            ...this.resources,
                            ...res?.data?.teamMember,
                        ];
                    }
                },
                (err: any) => {
                    this.pagination = false;
                }
            );
        }
    }

    selectChange() {
        this.count = 1;
        this.pagination = false;
        const tech = this.technologys?.value?.[0];
        for (let i = 0; i < this.technologyList.length; i++) {
            if (this.technologyList[i].id === tech) {
                this.techName = this.technologyList[i]?.name;
            }
        }
        const payload = this.getDefaultSearchPayload();
        this.projectService.getResourceMember(payload).subscribe(
            (res: any) => {
                this.handleGetResourceMemberResponse(res);
                this.initialLoading = false;
            },
            (error) => {
                this.initialLoading = false;
            }
        );
    }

    deleteResource(id: number, assignedProjects: any): void {
        this.deleteprojectstring(assignedProjects);
        if (assignedProjects.length == 0) {
            const payload = {
                id: id,
                isDeleted: true,
            };
            const dialogRef = this._fuseConfirmationService.open(
                this.configForm.value
            );

            dialogRef.afterClosed().subscribe((result) => {
                if (result == 'confirmed') {
                    this.deleteAPI(payload);
                }
            });
        } else {
            this.configFormAssignedProject = this._formBuilder.group({
                title: 'Delete Resource',
                message:
                    'This resource is attached to the following projects. Remove the association of the resources from the projects in order to delete it. <div class="listClass">' +
                    this.deletePojects +
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
                this.configFormAssignedProject.value
            );

            dialogRef.afterClosed().subscribe((result) => {
                if (result == 'confirmed') {
                }
            });
        }
    }

    edit(id: number) {
        this.router.navigate([`/resources/edit-resources`], {
            queryParams: { id: id },
        });
    }

    getExprience(event: Event, type: any) {
        this.count = 1;
        this.pagination = false;
        if (type == 'remove') {
            this.exprienceForm.patchValue({
                minExprience: '',
                maxExprience: '',
            });
        }
        if (!this.exprienceForm.invalid) {
            this.minExprience = this.exprienceForm.value.minExprience;
            this.maxExprience = this.exprienceForm.value.maxExprience;
            let payload = this.getDefaultSearchPayload(this.count);
            this.projectService.getResourceMember(payload).subscribe(
                (res: any) => {
                    this.handleGetResourceMemberResponse(res);
                    this.initialLoading = false;
                },
                (error) => {
                    this.initialLoading = false;
                }
            );
        } else {
            event.stopPropagation();
        }
    }
    getProjectList() {
        this.initialLoading = true;
        this.projectService
            .getProjectListWithoutPagination()
            .subscribe((res: any) => {
                this.projectsList = res.data;
                this.initialLoading = false;
                if (res.tokenExpire == true) {
                    this.handleTokenExpiry();
                }
            });
    }

    selectChangeProject(event: any) {
        this.count = 1;
        this.pagination = false;
        let payload = this.getDefaultSearchPayload(this.count);
        this.projectService.getResourceMember(payload).subscribe(
            (res: any) => {
                this.handleGetResourceMemberResponse(res);
                this.initialLoading = false;
            },
            (error) => {
                this.initialLoading = false;
            }
        );
    }
    deleteprojectstring(projects: any) {
        this.deletePojects = '';
        var arr = projects;
        for (let i = 0; i <= arr.length - 1; i++) {
            this.deletePojects = this.deletePojects + arr[i] + '<br>';
        }
    }
    viewResource(id: number) {
        this.router.navigate(['./', id], { relativeTo: this._activatedRoute });

        this._changeDetectorRef.markForCheck();
        this.opened == true;
    }

    clearSearch() {
        this.count = 1;
        this.resourceSearchInput.setValue('', { emitEvent: false });
        this.searchValue = '';
        this.pagination = false;
        this.getList();
    }

    private handleTokenExpiry() {
        this._authService.updateAndReload(window.location);
    }

    private getExperiencePayload() {
        return [
            parseInt(this.exprienceForm?.value?.minExprience),
            parseInt(this.exprienceForm?.value?.maxExprience),
        ];
    }

    private getDefaultSearchPayload(count?: any) {
        const expriencePayload = this.getExperiencePayload();
        return {
            technology:
                this.technologys?.value.length > 0
                    ? this.technologys?.value
                    : null,
            experience:
                this.exprienceForm?.value?.minExprience.length > 0 &&
                this.exprienceForm?.value?.maxExprience.length > 0
                    ? expriencePayload
                    : null,
            projects: this.projects?.value ? [this.projects.value] : null,
            perPageData: this.count,
            totalPerPageData: this.totalPerPageData,
            name: this.searchValue,
        };
    }

    private initializeExperienceForm() {
        this.exprienceForm = this._formBuilder.group(
            {
                minExprience: [
                    '',
                    [Validators.pattern(ValidationConstants.YEAR_VALIDATION)],
                ],
                maxExprience: [
                    '',
                    [Validators.pattern(ValidationConstants.YEAR_VALIDATION)],
                ],
            },
            {
                validator: [
                    ExprienceValidation('minExprience', 'maxExprience'),
                ],
            }
        );
    }

    private addRequiredSubscriptions() {
        this.addDrawerOpenChangeSubscription();
        this.addWatcherSubscription();
        this.addSearchValueChangeSubscription();
    }

    private initializeForms() {
        this.initializeExperienceForm();
        this.initializeConfigForm();
    }

    private loadData() {
        this.getList();
        this.getTechnologies();
        this.getProjectList();
    }

    private addSearchValueChangeSubscription() {
        this.resourceSearchInput.valueChanges
            .pipe(
                map((value) => value?.trim()),
                debounceTime(1000),
                distinctUntilChanged()
            )
            .subscribe((searchKey) => {
                this.searchValue = searchKey;
                if (searchKey) {
                    this.getSearchResult(searchKey);
                } else {
                    this.getList();
                }
            });
    }

    private getSearchResult(searchKey: any) {
        this.count = 1;
        this.pagination = false;
        const payload = this.getDefaultSearchPayload();
        this.projectService.getResourceMember(payload).subscribe(
            (res: any) => {
                this.handleGetResourceMemberResponse(res);
            },
            (error) => {
                this.initialLoading = false;
            }
        );
    }

    private addWatcherSubscription() {
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                if (matchingAliases.includes('lg')) {
                    this.drawerMode = 'side';
                } else {
                    this.drawerMode = 'over';
                }

                this._changeDetectorRef.markForCheck();
            });
    }

    private addDrawerOpenChangeSubscription() {
        this.matDrawer.openedChange.subscribe((opened) => {
            if (!opened) {
                this.selectedContact = null;

                this._changeDetectorRef.markForCheck();
            }
        });
    }

    private initializeConfigForm() {
        this.configForm = this._formBuilder.group({
            title: 'Delete Resource',
            message:
                'Are you sure you want to delete this resource? <span class="font-medium">This action cannot be undone!</span>',
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
    private deleteAPI(deletePayload: any) {
        this.projectService.updateDeleteResource(deletePayload).subscribe(
            (res: any) => {
                this.snackBar.successSnackBar(res?.message);
                const payload = this.getDefaultSearchPayload();
                this.getList(payload);
            },
            (error) => {
                this.snackBar.errorSnackBar('Server error');
            }
        );
    }
}
