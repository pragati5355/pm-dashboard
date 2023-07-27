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
import { AddSkillAndIntegrationComponent } from '@modules/public/resource/add-skill-and-integration/add-skill-and-integration.component';
import { AddTechnologyComponent } from '@modules/public/resource/add-technology/add-technology.component';
import {
    TEAM_LIST,
    TECHNOLOGIES,
    TECHNOLOGIES_V2,
} from '@modules/public/resource/common';
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
        private datePipe: DatePipe
    ) {}

    ngOnInit(): void {
        this.loadData();
        this.initializeForm();

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
                experienceYear: [0, [Validators.required]],
                experienceMonth: [0, [Validators.required]],
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
            this.saveResource();

            // const dialogRef = this.fuseConfirmationService.open(
            //     this.configForm.value
            // );

            // dialogRef.afterClosed().subscribe((result) => {
            //     if (result == 'confirmed') {
            //     }
            // });
        }
    }

    saveResource() {
        const payload = this.saveResourcePayload();
        console.log('payload :', payload);
        // this.submitInProgress = true;
        // this.resourceService?.saveResource(payload)?.subscribe(
        //     (res: any) => {
        //         this.submitInProgress = false;
        //         if (!res?.error && !res?.data?.alreadyExist) {
        //             this.router.navigate([`/resource/success`]);
        //         }
        //         if (res?.data?.alreadyExist) {
        //             const dialogRef = this.fuseConfirmationService.open(
        //                 this.AlreadyExistConfigForm.value
        //             );

        //             dialogRef.afterClosed().subscribe((result) => {
        //                 if (result == 'confirmed') {
        //                     this.submitInProgress = true;
        //                     const payload = this.saveResourcePayload();
        //                     payload.confirmed = true;

        //                     this.resourceService
        //                         ?.saveResource(payload)
        //                         ?.subscribe(
        //                             (res: any) => {
        //                                 this.submitInProgress = false;
        //                                 if (!res?.error) {
        //                                     this.router.navigate([
        //                                         `/resource/success`,
        //                                     ]);
        //                                 } else {
        //                                     this.snackBar.errorSnackBar(
        //                                         'Something went wrong'
        //                                     );
        //                                 }
        //                             },
        //                             (err) => {
        //                                 this.submitInProgress = false;
        //                                 this.snackBar.errorSnackBar(
        //                                     'Something went wrong'
        //                                 );
        //                             }
        //                         );
        //                 }
        //             });
        //         }
        //         if (res?.error && !res?.data?.alreadyExist) {
        //             this.snackBar.errorSnackBar('Something went wrong');
        //         }
        //     },
        //     (err) => {
        //         this.submitInProgress = false;
        //         this.snackBar.errorSnackBar('Something went wrong');
        //     }
        // );
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

        console.log('this.mode -> ', this.mode);
        console.log('this.patchData -> ', this.patchData);
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
                    this.data?.editData?.details?.role
                        ? this.data?.editData?.details?.role
                        : '',
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

        this.patchTechnologies();
        this.patchProjects();
        this.patchCertificates();

        this.patchValuesInEditMode();
        if (this.mode === 'VIEW') {
            this.resourceForm.get('email').disable();
            this.resourceForm.get('firstName').disable();
            this.resourceForm.get('lastName').disable();
        }

        this.getTechnologiesList();
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
                    tech?.experienceMonth,
                    [Validators.email]
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
