import {
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ElementRef,
    ViewEncapsulation,
    HostListener,
    AfterViewInit,
} from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDeactivateComponent } from '@services/deactivate-service/decativate.guard';
import { ValidationConstants } from '../../../../core/constacts/constacts';
import { StaticData } from '../../../../core/constacts/static';
import { C, COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { MonthValdation } from '../../../../core/utils/Validations';
import { map, startWith } from 'rxjs/operators';
import { CreateProjecteService } from '@services/create-projecte.service';
import { AuthService } from '@services/auth/auth.service';
import { SnackBar } from '../../../../core/utils/snackBar';
import { ErrorMessage } from 'app/core/constacts/constacts';
import { DatePipe } from '@angular/common';
import moment from 'moment';
import { ResourcesService } from '../common/services/resources.service';
export class Technology {
    constructor(public id: number, public name: string) {}
}
export class Project {
    constructor(public id: number, public name: string) {}
}
@Component({
    selector: 'app-add-resources',
    templateUrl: './add-resources.component.html',
})
export class AddResourcesComponent
    implements OnInit, OnDestroy, IDeactivateComponent, AfterViewInit
{
    @HostListener('window:beforeunload', ['$event'])
    public onPageUnload($event: BeforeUnloadEvent) {
        if (!this.canExit()) {
            $event.returnValue = true;
        }
    }
    @ViewChild('emailInput') emailInput;
    formTypeAdd = true;
    currentDate = moment();
    editFormId = 0;
    pageTitle = '';
    submitInProcess: boolean = false;
    resourcesForm!: FormGroup;
    firstName = '';
    selectTeamList = StaticData.ROLE_LIST;
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = false;
    initialLoading = false;
    createdAt: any;
    userData: any;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    technology = new FormControl();
    filteredTechnologies: Observable<any[]> | undefined;
    technologys: any = [];
    alltechnologys: Technology[] = [];
    routeSubscribe: any;
    updateDeleteObj: any = [];
    showHideExperience: boolean = true;
    pmMentorFormControl: FormControl;
    filteredEmails: Observable<any[]>;

    emailList: any[] = [];

    @ViewChild('technologyInput')
    technologyInput!: ElementRef;
    project = new FormControl();
    filteredprojects: Observable<any[]> | undefined;
    projects: any = [];
    allprojects: Project[] = [];
    @ViewChild('projectInput')
    projectInput!: ElementRef;
    isShow = false;
    newExternalProjects: any = [];
    newExternalProjectsId: any = [];
    allNewExternalProjects: any = [];
    loadingAllEmails: boolean = false;

    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private ProjectService: CreateProjecteService,
        private _authService: AuthService,
        private _route: ActivatedRoute,
        private snackBar: SnackBar,
        private datePipe: DatePipe,
        private resourceService: ResourcesService
    ) {}

    get resourcesValidForm(): { [key: string]: AbstractControl } {
        return this.resourcesForm.controls;
    }

    getAvtarInit() {
        this.resourcesForm.value.firstName.charAt(0);
    }

    ngOnInit(): void {
        this.initializeForm();
        this.initializeData();
        this.getTechnology();
        this.userData = this._authService.getUser();
    }
    ngAfterViewInit(): void {}
    submit() {
        if (!this.resourcesForm?.invalid) {
            if (
                this.resourcesForm?.get('team')?.value === 'PM' ||
                this.technologys?.length > 0
            ) {
                const payload = {
                    firstName: this.resourcesForm?.value?.firstName,
                    lastName: this.resourcesForm?.value?.lastName,
                    email: this.resourcesForm?.value?.email,
                    year: this.resourcesForm?.value?.year
                        ? this.resourcesForm?.value?.year
                        : 0,
                    team: this.resourcesForm?.value?.team,
                    month: this.resourcesForm?.value?.month
                        ? this.resourcesForm?.value?.month
                        : 0,
                    technology: this.technologys,
                    salary: this.resourcesForm?.value?.salary,
                    dateOfJoining: this.resourcesForm?.value?.dateOfJoining,
                    pmMentorEmail: this.resourcesForm?.value?.pmMentorEmail,
                };
                this.submitInProcess = true;
                this.addResourceAPI(payload);
            } else {
                this.submitInProcess = false;
                this.snackBar.errorSnackBar('Choose technology');
            }
        }
    }
    gotoBack() {
        this.router.navigate(['/resources']);
    }
    onCheckBoxChange(value: boolean) {
        this.showHideExperience = !value;
    }
    getTechnology() {
        this.initialLoading = true;
        this.ProjectService.getTechnology().subscribe(
            (res: any) => {
                this.submitInProcess = false;
                this.alltechnologys = res.data;
                this.filteredTechnologies = this.resourcesForm
                    .get('technology')
                    ?.valueChanges.pipe(
                        startWith(''),
                        map((technology: any | null) =>
                            technology
                                ? this._filter(technology)
                                : this._filterslice()
                        )
                    );
                this.initialLoading = false;
                if (res.data.error) {
                    this._authService.updateToken().subscribe((res: any) => {
                        this._authService.setToken(res.data.accessToken);
                    });
                }
            },
            (error) => {
                this.submitInProcess = false;
                this.snackBar.errorSnackBar('Server error');
            }
        );
    }
    _filter(value: any) {
        return this.alltechnologys.filter(
            (alltechnologys: any) =>
                alltechnologys.name.toLowerCase().indexOf(value) === 0 &&
                !this.technologys.includes(alltechnologys.id)
        );
    }
    _filterslice() {
        return this.alltechnologys.filter(
            (alltechnologys) => !this.technologys.includes(alltechnologys.id)
        );
    }
    _filterProject(value: any) {
        return this.allprojects.filter(
            (allprojects: any) =>
                allprojects.name.toLowerCase().indexOf(value) === 0 &&
                !this.projects.includes(allprojects.id)
        );
    }
    _filtersliceProject() {
        return this.allprojects.filter(
            (allprojects) => !this.projects.includes(allprojects.id)
        );
    }
    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;
        // Add our technology

        if (input) {
            input.value = '';
        }

        this.technology.setValue('');
        this.resourcesForm.get('technology')?.setValue('');
    }

    remove(technology: any, selectIndex: any): void {
        this.technologys.splice(selectIndex, 1);
        this.resourcesForm.get('technology')?.setValue('');
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.technologys.push(event.option.value);
        this.technologyInput.nativeElement.value = '';
        this.technology.setValue('');
        this.resourcesForm.get('technology')?.setValue('');
    }
    /**
     * Upload avatar
     *
     * @param fileList
     */
    uploadAvatar(): void {
        // Return if canceled
    }

    /**
     * Remove the avatar
     */
    removeAvatar(): void {}
    fetchEditData(id: number) {
        let payload = { id: id };
        this.initialLoading = true;
        this.ProjectService.getresource(payload).subscribe(
            (res: any) => {
                this.initialLoading = false;
                this.updateDeleteObj.push(res.data);
                this.updateDeleteObj.forEach((item: any) => {
                    this.resourcesForm.patchValue({
                        firstName: item.firstName ? item.firstName : '',
                        lastName: item.lastName ? item.lastName : '',
                        email: item.email ? item.email : '',
                        team: item.team ? item.team : '',
                        year: item.year ? item.year : '',
                        month: item.month ? item.month : '',
                        salary: item.salary ? item.salary : null,
                        dateOfJoining: item.dateOfJoining
                            ? this.datePipe.transform(
                                  item.dateOfJoining,
                                  "yyyy-MM-dd'T'HH:mm:ss.SSS'Z"
                              )
                            : null,
                    });
                    this.createdAt = item.createdAt;
                    this.firstName = item.firstName ? item.firstName : '';
                    this.technologys = item.technology;
                    this.filteredTechnologies = this.resourcesForm
                        .get('technology')
                        ?.valueChanges.pipe(
                            startWith(''),
                            map((technology: any | null) =>
                                technology
                                    ? this._filter(technology)
                                    : this._filterslice()
                            )
                        );
                });
                if (res.tokenExpire == true) {
                    this._authService.updateAndReload(window.location);
                }
            },
            (error) => {
                this.initialLoading = false;
            }
        );
    }
    ngOnDestroy(): void {
        this.routeSubscribe.unsubscribe();
    }
    canExit(): boolean {
        if (!this.resourcesForm.pristine) {
            return false;
        }
        return true;
    }
    editResource() {
        if (!this.resourcesForm.invalid) {
            if (this.technologys.length > 0) {
                const payload = {
                    id: this.editFormId,
                    isDeleted: false,
                    firstName: this.resourcesForm?.value?.firstName,
                    lastName: this.resourcesForm?.value?.lastName,
                    email: this.resourcesForm?.value?.email,
                    year: this.resourcesForm?.value?.year
                        ? this.resourcesForm?.value?.year
                        : 0,
                    team: this.resourcesForm?.value?.team,
                    month: this.resourcesForm?.value?.month
                        ? this.resourcesForm?.value?.month
                        : 0,
                    technology: this.technologys,
                    salary: this.resourcesForm?.value?.salary,
                    dateOfJoining: this.resourcesForm?.value?.dateOfJoining,
                    pmMentorEmail: this.resourcesForm?.value?.pmMentorEmail,
                };
                this.submitInProcess = true;
                this.ProjectService.updateDeleteResource(payload).subscribe(
                    (res: any) => {
                        this.submitInProcess = false;
                        if (res.error) {
                            this.snackBar.errorSnackBar(res.message);
                        } else {
                            this.snackBar.successSnackBar(res.message);
                            this.resourcesForm.reset();
                            this.router.navigate(['/resources']);
                        }
                        if (res.tokenExpire == true) {
                            this.snackBar.errorSnackBar(
                                ErrorMessage.ERROR_SOMETHING_WENT_WRONG
                            );
                            this._authService.updateAndReload(window.location);
                        }
                    },
                    (error) => {
                        this.submitInProcess = false;
                        this.snackBar.errorSnackBar('Server error');
                    }
                );
            } else {
                this.submitInProcess = false;
                this.snackBar.errorSnackBar('Choose technology');
            }
        }
    }

    selectedTeamOption(event: any) {
        console.log(event?.option?.value);
    }

    filterEmails(email: string) {
        let arr = this.emailList.filter(
            (item) =>
                item?.email.toLowerCase().indexOf(email.toLowerCase()) === 0
        );

        return arr.length ? arr : [{ email: 'No Emails found' }];
    }

    private initializeForm() {
        this.resourcesForm = this._formBuilder.group(
            {
                firstName: [
                    '',
                    [
                        Validators.required,
                        Validators.pattern(ValidationConstants.NAME_VALIDATION),
                    ],
                ],
                lastName: [
                    '',
                    [
                        Validators.required,
                        Validators.pattern(ValidationConstants.NAME_VALIDATION),
                    ],
                ],
                email: [
                    '',
                    [
                        Validators.required,
                        Validators.email,
                        Validators.pattern(/@mindbowser.com\s*$/),
                    ],
                ],
                team: ['', [Validators.required]],
                year: [
                    '',
                    [Validators.pattern(ValidationConstants.YEAR_VALIDATION)],
                ],
                month: [
                    '',
                    [Validators.pattern(ValidationConstants.YEAR_VALIDATION)],
                ],
                dateOfJoining: ['', [Validators.required]],
                salary: [
                    '',
                    [Validators.pattern(ValidationConstants.SALARY_VALIDATION)],
                ],
                technology: [''],
                pmMentorEmail: [''],
            },
            {
                validator: [MonthValdation('month')],
            }
        );
        this.resourcesForm.get('team').valueChanges.subscribe((res: any) => {
            if (res != 'PM') {
                this.resourcesForm
                    .get('pmMentorEmail')
                    .setValidators(Validators.required);
                this.resourcesForm
                    .get('pmMentorEmail')
                    .updateValueAndValidity();
            } else {
                this.resourcesForm.get('pmMentorEmail').clearValidators();
                this.resourcesForm
                    .get('pmMentorEmail')
                    .updateValueAndValidity();
            }
        });
        this.pmMentorFilterInitialization();
    }

    private pmMentorFilterInitialization() {
        this.pmMentorFormControl = new FormControl();
        this.filteredEmails = this.resourcesForm
            .get('pmMentorEmail')
            .valueChanges.pipe(
                startWith(null),
                map((email) =>
                    email ? this.filterEmails(email) : this.emailList.slice()
                )
            );
        this.resourceService.findAllDeveloperEmails().subscribe((res: any) => {
            this.loadingAllEmails = true;
            if (res?.data) {
                this.emailList = res?.data;
            }
        });
    }

    private initializeData() {
        this.routeSubscribe = this._route.params.subscribe((checkformtype) => {
            if (checkformtype['id']) {
                this.fetchEditData(checkformtype['id']);
                this.editFormId = checkformtype['id'];
                this.pageTitle = 'Edit Resource';
                this.formTypeAdd = false;
            } else {
                this.pageTitle = 'Add Resource';
                this.formTypeAdd = true;
            }
        });
    }
    private addResourceAPI(payload: any) {
        this.ProjectService.addresources(payload).subscribe(
            (res: any) => {
                this.submitInProcess = false;
                if (res.tokenExpire == true) {
                    this.snackBar.errorSnackBar(
                        ErrorMessage.ERROR_SOMETHING_WENT_WRONG
                    );
                    this._authService.updateAndReload(window.location);
                }
                if (res.error) {
                    this.snackBar.errorSnackBar(res.message);
                } else {
                    this.snackBar.successSnackBar('Successfully Added');
                    this.resourcesForm.reset();
                    this.router.navigate(['/resources']);
                }
            },
            (error) => {
                this.submitInProcess = false;
                this.snackBar.errorSnackBar('Server error');
            }
        );
    }
}
