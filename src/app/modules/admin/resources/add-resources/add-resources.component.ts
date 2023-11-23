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
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDeactivateComponent } from '@services/deactivate-service/decativate.guard';
import {
    ROLE_LIST,
    ValidationConstants,
} from '../../../../core/constacts/constacts';
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
import { ResourceModel } from '../common/models/resource.model';
import { TECHNOLOGIES } from '@modules/public/resource/common';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { AddSkillAndIntegrationComponent } from '@modules/public/resource/add-skill-and-integration/add-skill-and-integration.component';
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
export class AddResourcesComponent implements OnInit, IDeactivateComponent {
    currentDate = moment();
    pageTitle = '';
    submitInProcess: boolean = false;
    resourcesForm!: FormGroup;
    selectTeamList = ROLE_LIST;
    addOnBlur = false;
    initialLoading = false;
    userData: any;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    filteredTechnologies: Observable<any[]> | undefined;
    technologys: any = [];
    resourcedetails: any;
    mentorModel: any[] = [];
    alltechnologys: Technology[] = [];
    showHideExperience: boolean = true;
    filteredEmails: Observable<any[]>;
    mode: 'edit' | 'add';
    emailList: any[] = [];
    loadingAllEmails: boolean = false;
    personalDetailsArrow: boolean = true;
    technologyArrow: boolean = false;
    otherSkillsArrow: boolean = false;
    certificationArrow: boolean = false;
    resourceId: any;
    existingResource: ResourceModel;
    integrations: any = TECHNOLOGIES?.integrations;

    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private ProjectService: CreateProjecteService,
        private _authService: AuthService,
        private _route: ActivatedRoute,
        private snackBar: SnackBar,
        private datePipe: DatePipe,
        private dialog: MatDialog,
        private resourceService: ResourcesService
    ) {}

    get technologies() {
        return this.resourcesForm?.get('technologies') as FormArray;
    }

    get certificates() {
        return this.resourcesForm?.get('certificates') as FormArray;
    }

    get resourcesValidForm(): { [key: string]: AbstractControl } {
        return this.resourcesForm.controls;
    }
    ngOnInit(): void {
        this.initialLoading = true;
        this.getEmailsList();
        this.addRouteSubscription();
        this.initializeForm();
        this.userData = this._authService.getUser();
    }

    onClickPersonalDetailsArrow(value: boolean) {
        this.personalDetailsArrow = value;
    }

    onClickTechnologyArrow(value: boolean) {
        this.technologyArrow = value;
    }

    onClickOtherSkillsArrow(value: boolean) {
        this.otherSkillsArrow = value;
    }

    onClickCertificationArrow(value: boolean) {
        this.certificationArrow = value;
    }

    getAvtarInit() {
        this.resourcesForm.value.firstName.charAt(0);
    }

    @HostListener('window:beforeunload', ['$event'])
    public onPageUnload($event: BeforeUnloadEvent) {
        if (!this.canExit()) {
            $event.returnValue = true;
        }
    }

    submit() {
        if (this.mode === 'edit') {
            this.editResource();
        } else {
            if (this.resourcesForm?.valid) {
                if (
                    this.resourcesForm?.get('team')?.value === 'PM' ||
                    this.resourcesForm?.value?.technologies?.length > 0
                ) {
                    const payload = this.resourcesForm?.value;
                    this.submitInProcess = true;
                    this.addResourceAPI(payload);
                } else {
                    this.submitInProcess = false;
                    this.snackBar.errorSnackBar('Choose technology');
                }
            }
        }
    }
    gotoBack() {
        this.router.navigate(['/resources']);
    }
    onCheckBoxChange(value: boolean) {
        this.showHideExperience = !value;
        if (value) {
            this.resourcesForm.patchValue(
                {
                    year: 0,
                    month: 0,
                },
                { emitEvent: false }
            );
        }
    }
    getTechnologiesList() {
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

    add(event: MatChipInputEvent): void {
        const isAlreadyExist =
            this.technologies?.value?.filter(
                (item) =>
                    item?.name?.toLowerCase() === event?.value.toLowerCase()
            )?.length > 0;

        if (event?.value && !isAlreadyExist) {
            const technologyControl = this._formBuilder.group({
                technologyId: [null],
                name: [event?.value || null],
                experienceYear: [0, [Validators.required]],
                experienceMonth: [0, [Validators.required]],
                resourceId: [this.userData?.userId || null],
            });
            this.technologies.push(technologyControl);
        }
        this.resourcesForm.get('technology')?.reset();
        const input = event.input;
        if (input) {
            input.value = '';
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        const technology = event?.option?.value;
        const isAlreadyExist =
            this.technologies?.value?.filter(
                (item) =>
                    item?.name?.toLowerCase() === technology?.name.toLowerCase()
            )?.length > 0;

        if (technology && !isAlreadyExist) {
            const technologyControl = this._formBuilder.group({
                technologyId: [technology?.id || null],
                name: [technology?.name || null],
                experienceYear: [0, [Validators.required]],
                experienceMonth: [0, [Validators.required]],
                resourceId: [this.userData?.userId || null],
            });
            this.technologies.push(technologyControl);
        }
        this.resourcesForm.get('technology')?.reset();
    }

    removeTechnology(index: number, technologyControlValue: any) {
        this.technologies.removeAt(index);
    }

    addNewCertificate() {
        this.certificates.push(this.getSingleControl());
    }

    remove(index: number) {
        if (index !== 0) {
            this.certificates.removeAt(index);
        }
    }

    /**
     * Upload avatar
     *
     * @param fileList
     *
     */
    uploadAvatar(): void {
        // Return if canceled
    }

    addSkillAndIntegrations() {
        const dialogRef = this.dialog.open(AddSkillAndIntegrationComponent, {
            disableClose: true,
            width: '98%',
            maxHeight: '700px',
            maxWidth: '700px',
            panelClass: 'warn-dialog-content',
            autoFocus: false,
            data: {
                integrations: this.integrations,
            },
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result) {
                this.integrations.push(...result);

                const integration = (<FormArray>(
                    this.resourcesForm.get('integrations')
                )) as FormArray;

                result?.map((item) => {
                    if (item?.checked) {
                        integration.push(new FormControl(item));
                    }
                });
            }
        });
    }

    onCheckBoxIntergationsChange(selectedOption: any) {
        const integration = (<FormArray>(
            this.resourcesForm.get('integrations')
        )) as FormArray;

        if (selectedOption?.checked) {
            integration.push(new FormControl(selectedOption.source.value));
        } else {
            const i = integration?.controls.findIndex((x: any) => {
                return x.value.name === selectedOption?.source?.value?.name;
            });

            integration?.removeAt(i);
        }
    }

    fetchEditData(id: number) {
        let payload = { id: id };
        this.initialLoading = true;
        this.ProjectService.getresource(payload).subscribe(
            (res: any) => {
                if (res?.data && !res?.error) {
                    this.existingResource = res?.data;
                    this.resourcesForm?.addControl(
                        'id',
                        this._formBuilder.control(this.existingResource?.id)
                    );
                    this.resourcesForm?.patchValue(this.existingResource);
                    this.setTechnologiesListForUpdate();
                    this.setDateOfJoiningForUpdate();
                    this.patchIntegrations();
                    this.patchCertificates();
                }
                this.initialLoading = false;
                if (res.tokenExpire == true) {
                    this._authService.updateAndReload(window.location);
                }
            },
            (error) => {
                this.initialLoading = false;
            }
        );
    }

    private setDateOfJoiningForUpdate() {
        this.resourcesForm?.patchValue({
            dateOfJoining: this.existingResource?.dateOfJoining
                ? this.datePipe.transform(
                      this.existingResource?.dateOfJoining,
                      "yyyy-MM-dd'T'HH:mm:ss.SSS'Z"
                  )
                : null,
        });
    }

    private setTechnologiesListForUpdate() {
        this.existingResource?.technologies?.map((item) => {
            this.technologies.push(
                this._formBuilder.group({
                    id: [item?.id],
                    deleted: [item?.deleted || false],
                    technologyId: [item?.technologyId],
                    name: [item?.name || null],
                    experienceYear: [
                        item?.experienceYear,
                        [Validators.required],
                    ],
                    experienceMonth: [
                        item?.experienceMonth,
                        [Validators.required],
                    ],
                    resourceId: [this.userData?.userId || null],
                })
            );
        });
    }

    canExit(): boolean {
        if (!this.resourcesForm.pristine) {
            return false;
        }
        return true;
    }

    editResource() {
        if (this.resourcesForm?.valid) {
            const technologyWithNoExperience = this.resourcesForm
                ?.get('technologies')
                ?.value?.filter(
                    (item) =>
                        item?.experienceMonth === 0 &&
                        item?.experienceYear === 0
                );

            if (technologyWithNoExperience?.length > 0) {
                this.snackBar?.errorSnackBar('Add technology experience');
                return;
            }

            if (
                this.resourcesForm?.get('role')?.value === 'PM' ||
                this.resourcesForm?.value?.technologies?.length > 0
            ) {
                const resourceForm = this.resourcesForm?.value;
                const payload = {
                    ...resourceForm,
                    menteeModel: this.mentorModel,
                };
                this.submitInProcess = true;
                console.log('Payload : ', payload);
                this.updateReourceApi(payload);
            } else {
                this.submitInProcess = false;
                this.snackBar.errorSnackBar('Choose technology');
            }
        } else {
            this.snackBar.errorSnackBar(
                'You have not updated any fields of this resource.'
            );
        }
    }

    filterEmails(email: string) {
        this.resourcedetails = this.emailList.filter(
            (item) =>
                item?.email.toLowerCase().indexOf(email.toLowerCase()) === 0
        );
        this.mentorModel = [
            {
                email: this.resourcedetails[0]?.email,
                menteeResourceId: this.resourcedetails[0]?.id,
            },
        ];
        return this.resourcedetails.length
            ? this.resourcedetails
            : [{ email: 'No Emails found' }];
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
                role: ['', [Validators.required]],
                year: [
                    0,
                    [Validators.pattern(ValidationConstants.YEAR_VALIDATION)],
                ],
                month: [
                    0,
                    [Validators.pattern(ValidationConstants.YEAR_VALIDATION)],
                ],
                dateOfJoining: ['', [Validators.required]],
                salary: [
                    '',
                    [Validators.pattern(ValidationConstants.SALARY_VALIDATION)],
                ],
                technology: [],
                technologies: this._formBuilder.array([]),
                pmOrMentorEmail: ['', [Validators.required]],
                integrations: this._formBuilder.array([]),
                certificates: this._formBuilder.array([]),
            },
            {
                validator: [MonthValdation('month')],
            }
        );
        this.dynamicFieldValidation();
        this.pmMentorFilterInitialization();
    }

    private patchCertificates() {
        if (this.existingResource?.certificates === null) {
            this.addNewCertificate();
        } else {
            this.existingResource?.certificates?.map((certificate) => {
                const control = this._formBuilder.group({
                    name: [certificate?.name],
                    link: [certificate?.link],
                });

                this.certificates?.push(control);
            });
        }
    }

    private getSingleControl(): FormGroup {
        const control = this._formBuilder.group({
            name: [''],
            link: [''],
        });

        return control;
    }

    private patchIntegrations() {
        const integration = (<FormArray>(
            this.resourcesForm.get('integrations')
        )) as FormArray;

        this.existingResource?.integrations?.map((item) => {
            integration.push(new FormControl(item));
        });

        this.integrations?.map((item) => {
            const skill = this.existingResource?.integrations?.findIndex(
                (obj) => obj.name === item.name
            );
            if (skill > -1) {
                item.checked = true;
            }
        });

        this.existingResource?.integrations?.map((item) => {
            const id = this.integrations?.findIndex(
                (obj) => obj.name === item.name
            );

            if (id === -1) {
                this.integrations?.push(item);
                item.checked = true;
            }
        });
    }

    private dynamicFieldValidation() {
        this.resourcesForm.get('role').valueChanges.subscribe((res: any) => {
            if (res != 'PM') {
                this.resourcesForm
                    .get('pmOrMentorEmail')
                    .setValidators(Validators.required);
                this.resourcesForm
                    .get('pmOrMentorEmail')
                    .updateValueAndValidity();
            } else {
                this.resourcesForm.get('pmOrMentorEmail').clearValidators();
                this.resourcesForm
                    .get('pmOrMentorEmail')
                    .updateValueAndValidity();
            }
        });
    }

    private pmMentorFilterInitialization() {
        this.filteredEmails = this.resourcesForm
            .get('pmOrMentorEmail')
            .valueChanges.pipe(
                startWith(null),
                map((email) =>
                    email ? this.filterEmails(email) : this.emailList.slice()
                )
            );
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

    private updateReourceApi(payload: any) {
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
    }

    private addRouteSubscription() {
        this._route.paramMap.subscribe((paramMap) => {
            const resourceId = paramMap.get('id');
            if (resourceId) {
                this.resourceId = resourceId;
                this.mode = 'edit';
                this.fetchEditData(this.resourceId);
                this.pageTitle = 'Edit Resource';
            } else {
                this.mode = 'add';
                this.pageTitle = 'Add Resource';
            }
        });
    }

    private getEmailsList() {
        this.resourceService.findAllDeveloperEmails().subscribe((res: any) => {
            if (res?.data) {
                this.emailList = res?.data;
            }
            this.getTechnologiesList();
        });
    }
}
