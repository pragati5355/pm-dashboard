import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
} from '@angular/core';
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
    filter,
    fromEvent,
    Observable,
    Subject,
    switchMap,
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
    // contacts$!: Observable<Contact[]: any>;

    /**Public variables */
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
    technologyLIst: any = [];
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

    /**Private Variables */
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**Constructor */
    constructor(
        private _authService: AuthService,
        private ProjectService: CreateProjecteService,
        private router: Router,
        private _formBuilder: FormBuilder,
        private _activatedRoute: ActivatedRoute,
        private _fuseConfirmationService: FuseConfirmationService,
        private snackBar: SnackBar,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService
    ) {}

    ngOnInit(): void {
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
        const expriencePayload = [
            parseInt(this.exprienceForm?.value?.minExprience),
            parseInt(this.exprienceForm?.value?.maxExprience),
        ];
        const payload = {
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
        this.getList(payload);
        this.getListtechList();
        this.getProjectList();
        // Build the config form
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
        this.matDrawer.openedChange.subscribe((opened) => {
            if (!opened) {
                // Remove the selected contact when drawer closed
                this.selectedContact = null;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            }
        });
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Set the drawerMode if the given breakpoint is active
                if (matchingAliases.includes('lg')) {
                    this.drawerMode = 'side';
                } else {
                    this.drawerMode = 'over';
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        /** Below code handles resource search input with debounce time of 1000ms */
        this.resourceSearchInput.valueChanges
            .pipe(
                debounceTime(1000),
                distinctUntilChanged(),
                switchMap((inputChanged) => {
                    this.count = 1;
                    this.pagination = false;
                    const expriencePayload = [
                        parseInt(this.exprienceForm.value.minExprience),
                        parseInt(this.exprienceForm.value.maxExprience),
                    ];
                    const payload = {
                        technology:
                            this.technologys.value.length > 0
                                ? this.technologys.value
                                : null,
                        experience:
                            this.exprienceForm.value.minExprience.length > 0 &&
                            this.exprienceForm.value.maxExprience.length > 0
                                ? expriencePayload
                                : null,
                        projects: this.projects?.value
                            ? [this.projects.value]
                            : null,
                        perPageData: this.count,
                        totalPerPageData: this.totalPerPageData,
                        name: inputChanged.trim(),
                    };
                    return this.ProjectService.getResourceMember(payload);
                })
            )
            .subscribe(
                (res: any) => {
                    this.handleGetResourceMemberResponse(res);
                },
                (error) => {
                    this.totalRecored = 0;
                    this.initialLoading = false;
                }
            );
    }

    get exprienceValidForm(): { [key: string]: AbstractControl } {
        return this.exprienceForm.controls;
    }

    gotoAddResources() {
        this.router.navigate(['/resources/add-resources']);
    }

    getList(payload: any) {
        this.initialLoading = true;
        this.ProjectService.getResourceMember(payload).subscribe(
            (res: any) => {
                this.handleGetResourceMemberResponse(res);
            },
            (error) => {
                this.totalRecored = 0;
                this.initialLoading = false;
            }
        );
    }

    getListtechList() {
        this.ProjectService.getTechnology().subscribe(
            (res: any) => {
                this.technologyLIst = res?.data;
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
            const expriencePayload = [
                parseInt(this.exprienceForm?.value?.minExprience),
                parseInt(this.exprienceForm?.value?.maxExprience),
            ];
            const payload = {
                perPageData: this.count,
                totalPerPageData: this.totalPerPageData,
                technology:
                    this.technologys?.value.length > 0
                        ? this.technologys.value
                        : null,
                experience:
                    this.exprienceForm?.value?.minExprience.length > 0 &&
                    this.exprienceForm?.value?.maxExprience.length > 0
                        ? expriencePayload
                        : null,
                projects: this.projects?.value ? [this.projects.value] : null,
                name: this.searchValue,
            };
            this.pagination = true;
            this.initialLoading = true;
            this.ProjectService.getResourceMember(payload).subscribe(
                (res: any) => {
                    this.pagination = false;
                    if (res?.data) {
                        this.resources = [
                            ...this.resources,
                            ...res?.data?.teamMember,
                        ];
                    }
                    this.initialLoading = false;
                },
                (err: any) => {
                    this.pagination = false;
                    this.initialLoading = false;
                }
            );
        }
    }

    selectChange() {
        this.count = 1;
        this.pagination = false;
        const tech = this.technologys?.value?.[0];
        for (let i = 0; i < this.technologyLIst.length; i++) {
            if (this.technologyLIst[i].id === tech) {
                this.techName = this.technologyLIst[i]?.name;
            }
        }
        const expriencePayload = [
            parseInt(this.exprienceForm?.value?.minExprience),
            parseInt(this.exprienceForm?.value?.maxExprience),
        ];
        const payload = {
            technology:
                this.technologys?.value.length > 0
                    ? this.technologys?.value
                    : null,
            experience:
                this.exprienceForm?.value?.minExprience.length > 0 &&
                this.exprienceForm?.value?.maxExprience.length > 0
                    ? expriencePayload
                    : null,
            projects: this.projects?.value ? [this.projects?.value] : null,
            perPageData: this.count,
            totalPerPageData: this.totalPerPageData,
            name: this.searchValue,
        };
        this.ProjectService.getResourceMember(payload).subscribe(
            (res: any) => {
                this.handleGetResourceMemberResponse(res);
                this.initialLoading = false;
            },
            (error) => {
                this.initialLoading = false;
            }
        );
    }

    inputSearch(event: any) {
        console.log('Search value :', this.searchValue);
        console.log('value :', event.target.value.trim());
        this.count = 1;
        this.pagination = false;
        const expriencePayload = [
            parseInt(this.exprienceForm.value.minExprience),
            parseInt(this.exprienceForm.value.maxExprience),
        ];
        if (this.searchValue !== event.target.value.trim()) {
            this.searchValue = event.target.value.trim();
            const payload = {
                technology:
                    this.technologys.value.length > 0
                        ? this.technologys.value
                        : null,
                experience:
                    this.exprienceForm.value.minExprience.length > 0 &&
                    this.exprienceForm.value.maxExprience.length > 0
                        ? expriencePayload
                        : null,
                projects: this.projects?.value ? [this.projects.value] : null,
                perPageData: this.count,
                totalPerPageData: this.totalPerPageData,
                name: this.searchValue,
            };
            this.getList(payload);
        }
    }

    deleteResource(id: number, assignedProjects: any): void {
        this.deleteprojectstring(assignedProjects);
        if (assignedProjects.length == 0) {
            const payload = {
                id: id,
            };
            // Open the dialog and save the reference of it
            this.ProjectService.getresource(payload).subscribe(
                (res: any) => {
                    this.updateDeleteObj.push(res.data);
                    this.updateDeleteObj.forEach((item: any) => {
                        this.deleteObject = {
                            id: id,
                            createdAt: item.createdAt,
                            lastModifiedAt: null,
                            isDeleted: true,
                            firstName: item.firstName ? item.firstName : '',
                            lastName: item.lastName ? item.lastName : '',
                            email: item.email ? item.email : '',
                            team: item.team ? item.team : '',
                            month: item.month ? item.month : 0,
                            year: item.year ? item.year : 0,
                            technology: item.technology
                                ? item.technology
                                : null,
                            assignedProjects: [0],
                        };
                    });
                    const dialogRef = this._fuseConfirmationService.open(
                        this.configForm.value
                    );

                    // Subscribe to afterClosed from the dialog reference
                    dialogRef.afterClosed().subscribe((result) => {
                        if (result == 'confirmed') {
                            this.ProjectService.updateDeleteResource(
                                this.deleteObject
                            ).subscribe(
                                (res: any) => {
                                    this.snackBar.successSnackBar(
                                        res.data.Message
                                    );
                                    const expriencePayload = [
                                        parseInt(
                                            this.exprienceForm.value
                                                .minExprience
                                        ),
                                        parseInt(
                                            this.exprienceForm.value
                                                .maxExprience
                                        ),
                                    ];
                                    const payload = {
                                        technology:
                                            this.technologys.value.length > 0
                                                ? this.technologys.value
                                                : null,
                                        experience:
                                            this.exprienceForm.value
                                                .minExprience.length > 0 &&
                                            this.exprienceForm.value
                                                .maxExprience.length > 0
                                                ? expriencePayload
                                                : null,
                                        projects: this.projects.value
                                            ? [this.projects.value]
                                            : null,
                                        perPageData: this.count,
                                        totalPerPageData: this.totalPerPageData,
                                        name: this.searchValue,
                                    };
                                    this.getList(payload);
                                },
                                (error) => {
                                    this.snackBar.errorSnackBar('Server error');
                                }
                            );
                        }
                    });
                },
                (error) => {}
            );
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

            // Subscribe to afterClosed from the dialog reference
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
            const expriencePayload = [
                parseInt(this.exprienceForm.value.minExprience),
                parseInt(this.exprienceForm.value.maxExprience),
            ];
            this.minExprience = this.exprienceForm.value.minExprience;
            this.maxExprience = this.exprienceForm.value.maxExprience;
            let payload = {
                technology:
                    this.technologys.value.length > 0
                        ? this.technologys.value
                        : null,
                experience:
                    this.exprienceForm.value.minExprience.length > 0 &&
                    this.exprienceForm.value.maxExprience.length > 0
                        ? expriencePayload
                        : null,
                projects: this.projects.value ? [this.projects.value] : null,
                perPageData: this.count,
                totalPerPageData: this.totalPerPageData,
                name: this.searchValue,
            };
            this.ProjectService.getResourceMember(payload).subscribe(
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
        this.ProjectService.getProjectListWithoutPagination().subscribe(
            (res: any) => {
                this.projectsList = res.data;
                this.initialLoading = false;
                if (res.tokenExpire == true) {
                    this.handleTokenExpiry();
                }
            }
        );
    }

    selectChangeProject(event: any) {
        this.count = 1;
        this.pagination = false;
        let expriencePayload = [
            parseInt(this.exprienceForm.value.minExprience),
            parseInt(this.exprienceForm.value.maxExprience),
        ];
        let payload = {
            technology:
                this.technologys.value.length > 0
                    ? this.technologys.value
                    : null,
            experience:
                this.exprienceForm.value.minExprience.length > 0 &&
                this.exprienceForm.value.maxExprience.length > 0
                    ? expriencePayload
                    : null,
            projects: this.projects.value ? [this.projects.value] : null,
            perPageData: this.count,
            totalPerPageData: this.totalPerPageData,
            name: this.searchValue,
        };
        this.ProjectService.getResourceMember(payload).subscribe(
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
        // Go to the new contact
        this.router.navigate(['./', id], { relativeTo: this._activatedRoute });

        // Mark for check
        this._changeDetectorRef.markForCheck();
        this.opened == true;
    }

    private handleTokenExpiry() {
        this._authService.updateAndReload(window.location);
    }
}
