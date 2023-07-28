import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatChipInputEvent } from '@angular/material/chips';
import {
    MAT_DIALOG_DATA,
    MatDialogRef,
    MatDialog,
} from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AddSkillAndIntegrationComponent } from '@modules/public/resource/add-skill-and-integration/add-skill-and-integration.component';
import { AddTechnologyComponent } from '@modules/public/resource/add-technology/add-technology.component';
import {
    TEAM_LIST,
    TECHNOLOGIES,
    TECHNOLOGIES_V2,
} from '@modules/public/resource/common';
import { ResourceService } from '@modules/public/resource/common/services/resource.service';
import { ROLE_LIST, ValidationConstants } from 'app/core/constacts/constacts';
import { SnackBar } from 'app/core/utils/snackBar';
import { MonthValdation } from 'app/core/utils/Validations';
import { map, Observable, startWith } from 'rxjs';

@Component({
    selector: 'app-onboard-resource-details',
    templateUrl: './onboard-resource-details.component.html',
    styleUrls: ['./onboard-resource-details.component.scss'],
})
export class OnboardResourceDetailsComponent implements OnInit {
    initialLoading = false;
    resourceForm: FormGroup;
    mode: string;
    patchData: any;
    submitInProcess = false;
    disableField: boolean = false;
    minFromDate: Date;
    maxToDate: Date;
    showExperience: boolean = true;
    alltechnologys: any[] = [];
    isPm: boolean = false;
    selectTeamList: any[] = ROLE_LIST;
    filteredTechnologies: Observable<any[]> | undefined;
    technologys: any = [];
    integrations: any = TECHNOLOGIES?.integrations;
    submitInProgress: boolean = false;
    selectedRole: any = 'FRONTEND';
    configForm: FormGroup;
    AlreadyExistConfigForm: FormGroup;

    get resourcesValidForm(): { [key: string]: AbstractControl } {
        return this.resourceForm.controls;
    }

    get technologies() {
        return this.resourceForm?.get('technologies') as FormArray;
    }

    get certificates() {
        return this.resourceForm?.get('certificates') as FormArray;
    }

    get mbProjects() {
        return this.resourceForm?.get('mbProjects') as FormArray;
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        public matDialogRef: MatDialogRef<OnboardResourceDetailsComponent>,
        private dialog: MatDialog,
        private snackBar: SnackBar,
        private datePipe: DatePipe,
        private resourceService: ResourceService,
        private fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit(): void {
        this.loadData();
        this.initializeForm();
        console.log('integrations :', this.integrations);
        this.minFromDate = new Date(2012, 3, 24);
        this.maxToDate = new Date();
    }

    add(event: MatChipInputEvent): void {
        const isAlreadyExist =
            this.technologies?.value?.filter(
                (item) =>
                    item?.name?.toLowerCase() === event?.value.toLowerCase()
            )?.length > 0;

        if (event?.value && !isAlreadyExist) {
            const technologyControl = this.formBuilder.group({
                technologyId: [null],
                name: [event?.value || null],
                experienceYear: [0],
                experienceMonth: [0],
                resourceId: [null],
            });
            this.technologies.push(technologyControl);
        }
        this.resourceForm.get('technology')?.reset();
        const input = event.input;
        if (input) {
            input.value = '';
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        const isAlreadyExist =
            this.technologies?.value?.filter(
                (item) =>
                    item?.name?.toLowerCase() ===
                    event?.option?.value.toLowerCase()
            )?.length > 0;
        if (isAlreadyExist) {
            return;
        }
        const technology = event?.option?.value;
        if (technology) {
            const technologyControl = this.formBuilder.group({
                name: [technology || null],
                experienceYear: [0, [Validators.required]],
                experienceMonth: [0, [Validators.required]],
                resourceId: [null],
            });
            this.technologies.push(technologyControl);
        }
        this.resourceForm.get('technology')?.reset();
    }

    close() {
        this.integrations?.map((item) => (item.checked = false));
        this.matDialogRef.close();
    }

    submitResourceData() {
        if (this.mode === 'VIEW') {
            this.matDialogRef.close();
        }
    }

    getRadioBtnValues($event: any) {
        if ($event?.value === 'yes') {
            this.showExperience = false;
            this.resourceForm?.get('year')?.setValue(0);
            this.resourceForm?.get('month')?.setValue(0);
        }
        if ($event?.value === 'no') {
            this.showExperience = true;
        }
    }

    teamType($event: any) {
        const team = $event?.value;

        if (team === TEAM_LIST.PM) {
            this.isPm = true;
        } else {
            this.isPm = false;
        }

        if (team === TEAM_LIST.FULLSTACK) {
            this.alltechnologys = TECHNOLOGIES_V2.filter(
                (item) =>
                    item?.team?.includes(TEAM_LIST.FRONTEND) ||
                    item?.team?.includes(TEAM_LIST.BACKEND)
            ).map((item) => item?.name);
        } else {
            this.alltechnologys = TECHNOLOGIES_V2.filter((item) =>
                item?.team?.includes(team)
            ).map((item) => item?.name);
        }
        this.resourceForm?.get('technology')?.reset();
    }

    getTechnologiesList() {
        this.filteredTechnologies = this.resourceForm
            .get('technology')
            ?.valueChanges.pipe(
                startWith(''),
                map((technology: any | null) =>
                    technology ? this._filter(technology) : this._filterslice()
                )
            );
    }

    _filter(value: any) {
        const res = this.alltechnologys.filter(
            (tech) => tech.toLowerCase().indexOf(value) === 0
        );
        return res;
    }
    _filterslice() {
        return this.alltechnologys?.filter(
            (tech) => !this.technologys.includes(tech)
        );
    }

    removeTechnology(index: number, technologyControlValue: any) {
        if (technologyControlValue?.id) {
            const control = this.technologies?.at(index);
            control?.get('experienceYear').setErrors(null);
            control?.get('experienceMonth').setErrors(null);
            control?.get('deleted')?.setValue(true);
        } else {
            this.technologies.removeAt(index);
        }
    }

    addTechnology() {
        const dialogRef = this.dialog.open(AddTechnologyComponent, {
            disableClose: true,
            width: '98%',
            maxHeight: '700px',
            maxWidth: '700px',
            panelClass: 'warn-dialog-content',
            autoFocus: false,
            data: {
                technologies: this.technologies?.value,
            },
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result) {
                result?.map((item) => {
                    const technologyControl = this.formBuilder.group({
                        technologyId: [null],
                        name: [item?.name],
                        experienceYear: [0, [Validators.required]],
                        experienceMonth: [0, [Validators.required]],
                        resourceId: [null],
                    });
                    this.technologies.push(technologyControl);
                });
            }
        });
    }

    onCheckBoxChange(selectedOption: MatCheckboxChange) {
        const integration = (<FormArray>(
            this.resourceForm.get('integrations')
        )) as FormArray;

        if (selectedOption?.checked) {
            integration.push(new FormControl(selectedOption.source.value));
        } else {
            const i = integration?.controls.findIndex(
                (x) => x.value === selectedOption.source.value
            );
            integration?.removeAt(i);
        }
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
                    this.resourceForm.get('integrations')
                )) as FormArray;

                result?.map((item) => {
                    if (item?.checked) {
                        integration.push(new FormControl(item));
                    }
                });
            }
        });
    }

    addNewCertificate() {
        this.certificates.push(this.getSingleControl());
    }

    remove(index: number) {
        if (index !== 0) {
            this.certificates.removeAt(index);
        }
    }

    addNewProject() {
        this.mbProjects.push(this.getSingleProjectsControl());
    }

    removeProject(index: number) {
        if (index !== 0) {
            this.mbProjects.removeAt(index);
        }
    }

    submit() {
        const technologyWithNoExperience = this.resourceForm
            ?.get('technologies')
            ?.value?.filter(
                (item) =>
                    item?.experienceMonth === 0 && item?.experienceYear === 0
            );

        if (this.resourceForm?.valid) {
            if (
                this.showExperience &&
                this.resourceForm?.get('month')?.value === 0 &&
                this.resourceForm?.get('year')?.value === 0
            ) {
                this.snackBar.errorSnackBar('Fill previous experience');
                return;
            }
            if (
                this.resourceForm?.get('role')?.value !== 'PM' &&
                this.resourceForm?.get('technologies')?.value?.length === 0
            ) {
                this.snackBar.errorSnackBar('choose technologies');
                return;
            }

            if (this.resourceForm?.get('integrations')?.value?.length === 0) {
                this.snackBar.errorSnackBar('choose skill/integrations');
                return;
            }

            if (technologyWithNoExperience?.length > 0) {
                this.snackBar?.errorSnackBar('Add technology experience');
                return;
            }

            const dialogRef = this.fuseConfirmationService.open(
                this.configForm.value
            );

            dialogRef.afterClosed().subscribe((result) => {
                if (result == 'confirmed') {
                    this.saveResource();
                }
            });
        }
    }

    saveResource() {
        const payload = this.saveResourcePayload();
        this.submitInProgress = true;
        this.resourceService?.saveResource(payload)?.subscribe(
            (res: any) => {
                this.submitInProgress = false;
                if (!res?.error && !res?.data?.alreadyExist) {
                    this.snackBar.successSnackBar('Update success');
                    this.matDialogRef.close('success');
                }
                if (res?.data?.alreadyExist) {
                    this.submitInProgress = true;
                    const payload = this.saveResourcePayload();
                    payload.confirmed = true;

                    this.resourceService?.saveResource(payload)?.subscribe(
                        (res: any) => {
                            this.submitInProgress = false;
                            if (!res?.error) {
                                this.snackBar.successSnackBar('Update success');
                                const integration = (<FormArray>(
                                    this.resourceForm.get('integrations')
                                )) as FormArray;
                                integration?.clear();
                                this.matDialogRef.close('success');
                            } else {
                                this.snackBar.errorSnackBar(
                                    'Something went wrong'
                                );
                            }
                        },
                        (err) => {
                            this.submitInProgress = false;
                            this.snackBar.errorSnackBar('Something went wrong');
                        }
                    );
                }
                if (res?.error && !res?.data?.alreadyExist) {
                    this.snackBar.errorSnackBar('Something went wrong');
                }
            },
            (err) => {
                this.submitInProgress = false;
                this.snackBar.errorSnackBar('Something went wrong');
            }
        );
    }

    private saveResourcePayload() {
        const integration = (<FormArray>(
            this.resourceForm.get('integrations')
        )) as FormArray;

        integration?.value?.map((item) => (item.checked = true));

        return {
            email: this.resourceForm?.get('email')?.value,
            details: {
                ...this.resourceForm?.value,
                resourceUrl: this.patchData?.details?.resourceUrl,
            },
            confirmed: false,
        };
    }

    private loadData() {
        this.mode = this.data?.mode;
        this.patchData = this.data?.editData;
        this.selectedRole = this.data?.editData?.details?.role;

        if (
            this.patchData?.details?.year === 0 &&
            this.patchData?.details?.month === 0
        ) {
            this.showExperience = false;
        } else {
            this.showExperience = true;
        }
    }

    private patchValuesInEditMode() {
        if (this.mode === 'VIEW') {
            this.resourceForm.patchValue({
                email: this.data?.editData?.email,
                role: this.data?.editData?.role,
                firstName: this.data?.editData?.details?.firstName,
                lastName: this.data?.editData?.details?.lastName,
            });
        }
        if (this.mode === 'EDIT') {
            this.resourceForm.patchValue({
                email: this.data?.editData?.email,
                role: this.data?.editData?.role,
                firstName: this.data?.editData?.details?.firstName,
                lastName: this.data?.editData?.details?.lastName,
            });
        }
    }

    private initializeForm() {
        this.resourceForm = this.formBuilder.group(
            {
                firstName: [
                    this.data?.editData?.details?.firstName
                        ? this.data?.editData?.details?.firstName
                        : '',
                    [
                        Validators.required,
                        Validators.pattern(ValidationConstants.NAME_VALIDATION),
                    ],
                ],
                lastName: [
                    this.data?.editData?.details?.lastName
                        ? this.data?.editData?.details?.lastName
                        : '',
                    [
                        Validators.required,
                        Validators.pattern(ValidationConstants.NAME_VALIDATION),
                    ],
                ],
                email: [
                    this.data?.editData?.details?.email
                        ? this.data?.editData?.details?.email
                        : '',
                    [
                        Validators.required,
                        Validators.email,
                        Validators.pattern(/@mindbowser.com\s*$/),
                    ],
                ],
                role: [
                    this.data?.editData?.details?.role,
                    [Validators.required],
                ],
                year: [
                    this.data?.editData?.details?.year
                        ? this.data?.editData?.details?.year
                        : 0,
                    [Validators.pattern(ValidationConstants.YEAR_VALIDATION)],
                ],
                month: [
                    this.data?.editData?.details?.month
                        ? this.data?.editData?.details?.month
                        : 0,
                    [Validators.pattern(ValidationConstants.YEAR_VALIDATION)],
                ],
                dateOfJoining: [
                    this.datePipe.transform(
                        this.data?.editData?.details?.dateOfJoining,
                        "yyyy-MM-dd'T'HH:mm:ss.SSS'Z"
                    ),
                    [Validators.required],
                ],
                salary: [
                    '',
                    [Validators.pattern(ValidationConstants.SALARY_VALIDATION)],
                ],
                technology: [],
                technologies: this.formBuilder.array([]),
                certificates: this.formBuilder.array([]),
                mbProjects: this.formBuilder.array([]),
                integrations: this.formBuilder.array([]),
            },
            {
                validator: [MonthValdation('month')],
            }
        );

        if (this.patchData?.details?.role === TEAM_LIST.PM) {
            this.isPm = true;
        }

        this.patchTechnologies();
        this.patchProjects();
        this.patchCertificates();
        this.patchIntegrations();
        this.setInitialTechnologyList();
        this.initializeConfigForm();
        this.initializeAlreadyExistConfigForm();

        this.patchValuesInEditMode();
        if (this.mode === 'VIEW') {
            this.resourceForm?.disable();
        }

        this.getTechnologiesList();
    }

    private setInitialTechnologyList() {
        if (this.patchData?.details?.role === TEAM_LIST.FULLSTACK) {
            this.alltechnologys = TECHNOLOGIES_V2.filter(
                (item) =>
                    item?.team?.includes(TEAM_LIST.FRONTEND) ||
                    item?.team?.includes(TEAM_LIST.BACKEND)
            ).map((item) => item?.name);
        } else {
            this.alltechnologys = TECHNOLOGIES_V2.filter((item) =>
                item?.team?.includes(this.patchData?.details?.role)
            ).map((item) => item?.name);
        }
    }

    private patchIntegrations() {
        const integration = (<FormArray>(
            this.resourceForm.get('integrations')
        )) as FormArray;

        this.patchData?.details?.integrations?.map((item) => {
            integration.push(new FormControl(item));
        });

        this.integrations?.map((item) => {
            const skill = this.patchData?.details?.integrations?.findIndex(
                (obj) => obj.name === item.name
            );
            if (skill > -1) {
                item.checked = true;
            }
        });

        this.patchData?.details?.integrations?.map((item) => {
            const id = this.integrations?.findIndex(
                (obj) => obj.name === item.name
            );

            if (id === -1) {
                this.integrations?.push(item);
            }
        });
    }

    private patchTechnologies() {
        this.patchData?.details?.technologies?.map((tech) => {
            const control = this.formBuilder.group({
                name: this.formBuilder.control(tech?.name, [
                    Validators.required,
                ]),
                experienceYear: this.formBuilder.control(tech?.experienceYear, [
                    Validators.required,
                ]),
                experienceMonth: this.formBuilder.control(
                    tech?.experienceMonth
                ),
            });
            this.technologies.push(control);
        });
    }

    private patchCertificates() {
        this.patchData?.details?.certificates?.map((certificate) => {
            const control = this.formBuilder.group({
                name: [certificate?.name],
                link: [certificate?.link],
            });

            this.certificates?.push(control);
        });
    }

    private initializeConfigForm() {
        this.configForm = this.formBuilder.group({
            title: 'Save Details',
            message: 'Are you sure you want to submit?',
            icon: this.formBuilder.group({
                show: true,
                name: 'heroicons_outline:exclamation',
                color: 'warn',
            }),
            actions: this.formBuilder.group({
                confirm: this.formBuilder.group({
                    show: true,
                    label: 'Submit',
                    color: 'mat-warn',
                }),
                cancel: this.formBuilder.group({
                    show: true,
                    label: 'Cancel',
                }),
            }),
            dismissible: false,
        });
    }

    private initializeAlreadyExistConfigForm() {
        this.AlreadyExistConfigForm = this.formBuilder.group({
            title: 'Overwrite Details',
            message:
                'Data with this email already exists do you want to overwrite it?',
            icon: this.formBuilder.group({
                show: true,
                name: 'heroicons_outline:exclamation',
                color: 'warn',
            }),
            actions: this.formBuilder.group({
                confirm: this.formBuilder.group({
                    show: true,
                    label: 'Submit',
                    color: 'mat-warn',
                }),
                cancel: this.formBuilder.group({
                    show: true,
                    label: 'Cancel',
                }),
            }),
            dismissible: false,
        });
    }

    private patchProjects() {
        this.patchData?.details?.mbProjects?.map((project) => {
            const control = this.formBuilder.group({
                name: [project?.name],
            });
            this.mbProjects?.push(control);
        });
    }

    private getMbProjectsControls(): FormArray {
        return this.formBuilder.array([this.getSingleProjectsControl()]);
    }

    private getSingleProjectsControl(): FormGroup {
        const control = this.formBuilder.group({
            name: ['', [Validators.required]],
        });

        return control;
    }

    private getCertifcatesControls(): FormArray {
        return this.formBuilder.array([this.getSingleControl()]);
    }

    private getSingleControl(): FormGroup {
        const control = this.formBuilder.group({
            name: [''],
            link: [''],
        });

        return control;
    }
}
