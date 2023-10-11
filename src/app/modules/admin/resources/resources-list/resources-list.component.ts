import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnInit,
    Renderer2,
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
    map,
    startWith,
    Subject,
    takeUntil,
} from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import {
    BreakpointObserver,
    Breakpoints,
    BreakpointState,
} from '@angular/cdk/layout';
import { take } from 'rxjs/internal/operators/take';
import moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { ResourceUploadCsvComponent } from '../resource-upload-csv/resource-upload-csv.component';
import { ResourceModel } from '../common/models/resource.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSelectChange } from '@angular/material/select';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { LoggedInUserService } from '@modules/admin/common/services/logged-in-user.service';
import { ResourceInviteFormComponent } from '../resource-invite-form/resource-invite-form.component';
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
    isShadowIsBench = new FormControl('');
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
    deleteProjects: any = '';
    opened: any;
    resourceSearchInput = new FormControl();
    currentDate = moment();
    requiredSkeletonData = {
        rowsToDisplay: 10,
        displayProfilePicture: true,
    };
    showTechnologies: any[];
    selectedProject: boolean = false;
    isBench: boolean = false;
    isShadow: boolean = false;
    showFilterArea: boolean = false;
    selectedTechnologiesForSearch: any[] = [];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    separatorKeysCodes: number[] = [ENTER, COMMA];
    technologyCtrl = new FormControl();
    filteredTechnology: Observable<any[]>;
    selectedTechnology: any[] = [];
    allTechnologyList: any[] = [
        'Apple',
        'Lemon',
        'Lime',
        'Orange',
        'Strawberry',
    ];
    showVendorsOnly: boolean = false;
    userRole: string = '';

    @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

    constructor(
        private _authService: AuthService,
        private projectService: CreateProjecteService,
        private router: Router,
        private _formBuilder: FormBuilder,
        private _activatedRoute: ActivatedRoute,
        private _fuseConfirmationService: FuseConfirmationService,
        private snackBar: SnackBar,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        public breakpointObserver: BreakpointObserver,
        private matDialog: MatDialog,
        private loggedInUserService: LoggedInUserService
    ) {
        this.filteredTechnology = this.technologyCtrl.valueChanges.pipe(
            startWith(null),
            map((tech: string | null) =>
                tech ? this._filter(tech) : this.allTechnologyList.slice()
            )
        );
    }

    add(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        // Add our fruit
        if (value) {
            this.selectedTechnology.push(value);
        }

        // Clear the input value
        event.chipInput!.clear();

        this.technologyCtrl.setValue(null);
    }

    remove(fruit: string): void {
        const index = this.selectedTechnology.indexOf(fruit);

        if (index >= 0) {
            this.selectedTechnology.splice(index, 1);
            this.selectedTechnologiesForSearch.splice(index, 1);
        }

        this.count = 1;
        this.pagination = false;
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

    selected(event: MatAutocompleteSelectedEvent): void {
        this.selectedTechnology.push(event.option.value.name);
        this.fruitInput.nativeElement.value = '';
        this.technologyCtrl.setValue(null);

        this.selectedTechnologiesForSearch?.push(event.option.value.id);

        this.count = 1;
        this.pagination = false;
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

    private _filter(value: string): string[] {
        const filterValue = value;

        return this.allTechnologyList.filter((tech) =>
            tech?.name?.toLowerCase().includes(filterValue)
        );
    }

    ngOnInit(): void {
        this.loadData();
        this.initializeForms();
        this.addRequiredSubscriptions();
        this.getUserRole();
    }

    get exprienceValidForm(): { [key: string]: AbstractControl } {
        return this.exprienceForm.controls;
    }

    gotoAddResources() {
        this.router.navigate(['/resources/add']);
    }

    gotoOnboardResource() {
        this.router.navigate(['/resources/onboard']);
    }

    getList(searchPayload?: any) {
        if (!searchPayload) {
            searchPayload = this.getDefaultSearchPayload();
        }
        this.initialLoading = true;
        this.projectService.getResourceMember(searchPayload).subscribe(
            (res: any) => {
                this.handleGetResourceMemberResponse(res);
                this.checkForLargerScreen();
            },
            (error) => {
                this.totalRecored = 0;
                this.initialLoading = false;
            }
        );
    }

    showFilter() {
        this.showFilterArea = !this.showFilterArea;
    }

    clearFilter() {
        this.isBench = false;
        this.isShadow = false;
        this.minExprience = '';
        this.maxExprience = '';
        this.exprienceForm.patchValue({
            minExprience: '',
            maxExprience: '',
        });
        this.searchValue = '';
        this.count = 1;
        this.totalPerPageData = 10;
        this.projects?.setValue('');
        this.showTechnologies = [];
        this.technologys.setValue('');
        this.isShadowIsBench.setValue('');
        this.pagination = false;
        this.selectedProject = false;
        this.selectedTechnologiesForSearch = [];
        this.selectedTechnology = [];
        // this.showFilterArea = false;
        this.getList();
    }

    getTechnologies() {
        this.projectService.getTechnology().subscribe(
            (res: any) => {
                this.technologyList = res?.data;
                this.allTechnologyList = res?.data;
            },
            (error) => {}
        );
    }

    handleGetResourceMemberResponse(res: any) {
        if (res.data) {
            this.totalRecored = res?.data?.totalRecored;
            this.resources = res?.data?.teamMember;
            this.initialLoading = false;
            this.checkForLargerScreen();
        } else if (res?.data == null) {
            this.totalRecored = 0;
            this.initialLoading = false;
        } else if (res.tokenExpire == true) {
            this.handleTokenExpiry();
        }
    }

    showOnlyVendors(event: MatCheckboxChange) {
        this.showVendorsOnly = event?.checked;
        this.clearFilter();
        // if (this.showVendorsOnly) {
        //     this.resourceSearchInput?.disable();
        // }
    }

    handleScroll() {
        if (!this.pagination && this.resources.length < this.totalRecored) {
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
        this.showTechnologies = this.technologyList.filter((obj) =>
            this.technologys?.value?.some((id) => obj.id === id)
        );
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
        this.deleteProjectString(assignedProjects);
        if (assignedProjects.length == 0) {
            const payload = {
                id: id,
                deleted: true,
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
                    'This resource is attached to the following projects. Remove the association of the resources from the projects in order to delete it. <div class="font-semibold mt-2">' +
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
                this.configFormAssignedProject.value
            );

            dialogRef.afterClosed().subscribe((result) => {
                if (result == 'confirmed') {
                }
            });
        }
    }

    edit(id: number) {
        this.router.navigate([`/resources/edit/${id}`]);
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

    uploadCsvDialog() {
        this.matDialog
            .open(ResourceUploadCsvComponent, {
                disableClose: true,
                width: '50%',
                height: 'auto',
                maxHeight: '90vh',
            })
            .afterClosed()
            .subscribe((result: any) => {
                console.log(result);
                if (result) {
                    this.loadData();
                }
            });
    }

    selectChangeProject(event: any) {
        this.count = 1;
        this.pagination = false;
        let payload = this.getDefaultSearchPayload(this.count);
        this.selectedProject = true;
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
    resourceBenchShadow() {
        this.isBench = this.isShadowIsBench?.value?.includes(0);
        this.isShadow = this.isShadowIsBench?.value?.includes(1);
        this.count = 1;
        this.pagination = false;
        const payload = this.getDefaultSearchPayload();
        this.initialLoading = true;
        this.loadDataWithFilterPayload(payload);
    }
    clearBenchShadowSearch() {
        this.isBench = false;
        this.isShadow = false;
        this.isShadowIsBench.setValue('');
        this.count = 1;
        this.pagination = false;
        const payload = this.getDefaultSearchPayload();
        this.loadDataWithFilterPayload(payload);
    }
    clearProjectSearch() {
        this.projects.setValue('');
        this.count = 1;
        let payload = this.getDefaultSearchPayload(this.count);
        this.selectedProject = false;
        this.loadDataWithFilterPayload(payload);
    }
    clearTechnologySearch() {
        this.pagination = false;
        this.showTechnologies = [];
        this.technologys.setValue('');
        this.count = 1;
        let payload = this.getDefaultSearchPayload(this.count);
        this.loadDataWithFilterPayload(payload);
    }

    deleteProjectString(projects: any) {
        this.deleteProjects = '';
        var arr = projects;
        for (let i = 0; i <= arr.length - 1; i++) {
            this.deleteProjects = this.deleteProjects + arr[i];
        }
    }
    viewResource(id: number) {
        const rpit = this.router.navigate(['./view/', id], {
            relativeTo: this._activatedRoute,
        });
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
    private getUserRole() {
        this.loggedInUserService.getLoggedInUser().subscribe((res: any) => {
            if (res?.role) {
                this.userRole = res?.role;
            }
        });
    }

    private loadDataWithFilterPayload(payload: any) {
        this.initialLoading = true;
        this.pagination = false;
        this.projectService.getResourceMember(payload).subscribe(
            (res: any) => {
                this.handleGetResourceMemberResponse(res);
                this.initialLoading = false;
                this.checkForLargerScreen();
            },
            (error) => {
                this.initialLoading = false;
            }
        );
    }

    private handleTokenExpiry() {
        this._authService.updateAndReload(window.location);
    }

    private getExperiencePayload() {
        const exp = {
            minExp: parseInt(this.exprienceForm?.value?.minExprience),
            maxExp: parseInt(this.exprienceForm?.value?.maxExprience),
        };

        return exp;
    }

    private getDefaultSearchPayload(count?: any) {
        const expriencePayload = this.getExperiencePayload();
        return {
            technology:
                this.selectedTechnologiesForSearch?.length > 0
                    ? this.selectedTechnologiesForSearch
                    : [],
            minExp: expriencePayload?.minExp,
            maxExp: expriencePayload?.maxExp,
            projects: this.projects?.value ? [this.projects.value] : [],
            perPageData: this.count,
            totalPerPageData: this.totalPerPageData,
            name: this.searchValue,
            bench: this.isBench,
            shadow: this.isShadow,
            vendor: this.showVendorsOnly,
        };
    }

    private initializeExperienceForm() {
        this.exprienceForm = this._formBuilder.group({
            minExprience: [''],
            maxExprience: [''],
        });
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
                payload.perPageData = 1;
                this.resources = [];
                this.count = 1;
                this.getList(payload);
            },
            (error) => {
                this.snackBar.errorSnackBar('Server error');
            }
        );
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

    openDialog(mode: String, data: any) {
        const dialogRef = this.matDialog.open(ResourceInviteFormComponent, {
            disableClose: true,
            width: '50%',
            panelClass: 'warn-dialog-content',
            autoFocus: false,
            data: {
                mode: mode,
                editData: data,
            },
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result == 'success') {
                window.location.reload();
            }
        });
    }
}
