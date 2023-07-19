import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ROLE_LIST, ValidationConstants } from 'app/core/constacts/constacts';
import { SnackBar } from 'app/core/utils/snackBar';
import { MonthValdation } from 'app/core/utils/Validations';
import moment from 'moment';
import { map, Observable, of, startWith } from 'rxjs';
import { AddSkillAndIntegrationComponent } from '../add-skill-and-integration/add-skill-and-integration.component';
import { AddTechnologyComponent } from '../add-technology/add-technology.component';
import {
    EMAIL_LIST,
    TEAM_LIST,
    TECHNOLOGIES,
    TECHNOLOGIES_V2,
} from '../common';
import { ResourceService } from '../common/services/resource.service';

@Component({
    selector: 'app-register-resource',
    templateUrl: './register-resource.component.html',
    styleUrls: ['./register-resource.component.scss'],
})
export class RegisterResourceComponent implements OnInit {
    @ViewChild('fileUpload') fileUpload: ElementRef;
    resourcesForm!: FormGroup;
    initialLoading: boolean = false;
    currentDate = moment();
    showExperience: boolean = true;
    selectTeamList: any[] = ROLE_LIST;
    filteredEmails: Observable<any[]>;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    addOnBlur = false;
    userData: any;
    filteredTechnologies: Observable<any[]> | undefined;
    alltechnologys: any[] = [];
    technologys: any = [];
    emailList: any[] = [];
    allTeamsTechnologyList: any = TECHNOLOGIES;
    integrations: any = TECHNOLOGIES?.integrations;
    extraSkillIntegration: FormGroup;
    submitInProgress: boolean = false;
    resumeFileToBeUploaded: any;
    preSignedUrl: string | null = null;
    isFileUploadedToS3: boolean = false;
    resourceUrl: string | null = null;
    configForm: FormGroup;
    AlreadyExistConfigForm: FormGroup;
    isPm: boolean = false;

    get resourcesValidForm(): { [key: string]: AbstractControl } {
        return this.resourcesForm.controls;
    }

    get certificates() {
        return this.resourcesForm?.get('certificates') as FormArray;
    }

    get mbProjects() {
        return this.resourcesForm?.get('mbProjects') as FormArray;
    }

    get technologies() {
        return this.resourcesForm?.get('technologies') as FormArray;
    }

    constructor(
        private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private snackBar: SnackBar,
        private resourceService: ResourceService,
        private fuseConfirmationService: FuseConfirmationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.initializeForm();
        // this.getEmails();
    }

    getRadioBtnValues($event: any) {
        if ($event?.value === 'yes') {
            this.showExperience = false;
        }
        if ($event?.value === 'no') {
            this.showExperience = true;
        }
    }

    onCheckBoxChange(selectedOption: MatCheckboxChange) {
        const integration = (<FormArray>(
            this.resourcesForm.get('integrations')
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

    uploadChange({ target }: any) {
        if (target?.files[0]) {
            this.submitInProgress = true;
            this.resumeFileToBeUploaded = target?.files[0];
            const file = target?.files[0];

            const uploadedFile = new FormData();
            uploadedFile.append(
                'file',
                this.resumeFileToBeUploaded,
                this.resumeFileToBeUploaded?.name
            );

            const payload = {
                fileName: target?.files[0]?.name,
            };
            this.resourceService.getPreSignedUrl(payload).subscribe(
                (res: any) => {
                    this.submitInProgress = false;
                    if (res?.error === false) {
                        this.preSignedUrl = res?.data?.preSignedURL;
                        this.resourceUrl = res?.data?.resourceUrl;
                        if (this.preSignedUrl) {
                            this.submitInProgress = true;
                            this.resourceService
                                .uploadFileToS3(
                                    this.preSignedUrl,
                                    this.resumeFileToBeUploaded
                                )
                                .subscribe(
                                    (res: any) => {
                                        this.isFileUploadedToS3 = true;
                                        this.submitInProgress = false;
                                    },
                                    (err) => {
                                        this.submitInProgress = false;
                                        this.snackBar.errorSnackBar(
                                            'Somethin went wrong'
                                        );
                                    }
                                );
                        }
                    } else {
                        this.snackBar.errorSnackBar('Somethin went wrong');
                    }
                },
                (err) => {
                    this.submitInProgress = false;
                    this.snackBar.errorSnackBar('Somethin went wrong');
                }
            );
        }
    }

    onClick() {
        if (this.fileUpload) this.fileUpload.nativeElement.click();
    }

    removeUploadedFile() {
        this.fileUpload.nativeElement.value = '';
        this.resumeFileToBeUploaded = null;
        this.preSignedUrl = null;
        this.resourceUrl = null;
        this.isFileUploadedToS3 = false;
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        const technology = event?.option?.value;
        if (technology) {
            const technologyControl = this.formBuilder.group({
                name: [technology || null],
                experienceYear: [0, [Validators.required]],
                experienceMonth: [0, [Validators.required]],
                resourceId: [this.userData?.userId || null],
            });
            this.technologies.push(technologyControl);
        }
        this.resourcesForm.get('technology')?.reset();
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

        this.resourcesForm?.get('technology')?.reset();

        // this.filteredTechnologies = of(this.alltechnologys);
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

    submit() {
        if (this.resourcesForm?.valid) {
            if (
                this.resourcesForm?.get('role')?.value !== 'PM' &&
                this.resourcesForm?.get('technologies')?.value?.length === 0
            ) {
                this.snackBar.errorSnackBar('choose technologies');
                return;
            }

            if (this.resourcesForm?.get('integrations')?.value?.length === 0) {
                this.snackBar.errorSnackBar('choose skill/integrations');
                return;
            }

            if (!this.isFileUploadedToS3) {
                this.snackBar.errorSnackBar('Upload resume');
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
        this.submitInProgress = true;
        const payload = this.saveResourcePayload();
        this.resourceService?.saveResource(payload)?.subscribe(
            (res: any) => {
                this.submitInProgress = false;
                if (!res?.error && !res?.data?.alreadyExist) {
                    this.router.navigate([`/resource/success`]);
                }
                if (res?.data?.alreadyExist) {
                    const dialogRef = this.fuseConfirmationService.open(
                        this.AlreadyExistConfigForm.value
                    );

                    dialogRef.afterClosed().subscribe((result) => {
                        if (result == 'confirmed') {
                            this.submitInProgress = true;
                            const payload = this.saveResourcePayload();
                            payload.confirmed = true;

                            this.resourceService
                                ?.saveResource(payload)
                                ?.subscribe(
                                    (res: any) => {
                                        this.submitInProgress = false;
                                        if (!res?.error) {
                                            this.router.navigate([
                                                `/resource/success`,
                                            ]);
                                        } else {
                                            this.snackBar.errorSnackBar(
                                                'Something went wrong'
                                            );
                                        }
                                    },
                                    (err) => {
                                        this.submitInProgress = false;
                                        this.snackBar.errorSnackBar(
                                            'Something went wrong'
                                        );
                                    }
                                );
                        }
                    });
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

    addSkillAndIntegrations() {
        const dialogRef = this.dialog.open(AddSkillAndIntegrationComponent, {
            disableClose: true,
            width: '98%',
            maxWidth: '700px',
            panelClass: 'warn-dialog-content',
            autoFocus: false,
            data: {},
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

    addTechnology() {
        const dialogRef = this.dialog.open(AddTechnologyComponent, {
            disableClose: true,
            width: '98%',
            maxWidth: '700px',
            panelClass: 'warn-dialog-content',
            autoFocus: false,
            data: {},
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result) {
                result?.map((item) => {
                    const technologyControl = this.formBuilder.group({
                        technologyId: [null],
                        name: [item?.name],
                        experienceYear: [0, [Validators.required]],
                        experienceMonth: [0, [Validators.required]],
                        resourceId: [this.userData?.userId || null],
                    });
                    this.technologies.push(technologyControl);
                });
            }
        });
    }

    getTechnologiesList() {
        this.filteredTechnologies = this.resourcesForm
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

    addNewCertificate() {
        this.certificates.push(this.getSingleControl());
    }

    addNewProject() {
        this.mbProjects.push(this.getSingleProjectsControl());
    }

    removeProject(index: number) {
        if (index !== 0) {
            this.mbProjects.removeAt(index);
        }
    }

    remove(index: number) {
        if (index !== 0) {
            this.certificates.removeAt(index);
        }
    }

    private getEmails() {
        this.initialLoading = true;
        this.resourceService.getEmails().subscribe((res: any) => {
            this.initialLoading = false;
            if (res?.data) {
                this.emailList = res?.data;
            }
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

    private saveResourcePayload() {
        return {
            email: this.resourcesForm?.get('email')?.value,
            details: {
                ...this.resourcesForm?.value,
                resourceUrl: this.resourceUrl,
            },
            confirmed: false,
        };
    }

    private initializeForm() {
        this.resourcesForm = this.formBuilder.group(
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
                technologies: this.formBuilder.array([]),
                certificates: this.getCertifcatesControls(),
                mbProjects: this.getMbProjectsControls(),
                integrations: this.formBuilder.array([]),
            },
            {
                validator: [MonthValdation('month')],
            }
        );

        this.pmMentorFilterInitialization();
        this.dynamicFieldValidation();
        this.getTechnologiesList();
        this.initializeConfigForm();
        this.initializeAlreadyExistConfigForm();
    }

    private getMbProjectsControls(): FormArray {
        return this.formBuilder.array([this.getSingleProjectsControl()]);
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

    private getSingleProjectsControl(): FormGroup {
        const control = this.formBuilder.group({
            name: ['', [Validators.required]],
        });

        return control;
    }

    private dynamicFieldValidation() {
        this.resourcesForm.get('role').valueChanges.subscribe((res: any) => {
            // if (res != 'PM') {
            //     this.resourcesForm
            //         .get('pmOrMentorEmail')
            //         .setValidators(Validators.required);
            //     this.resourcesForm
            //         .get('pmOrMentorEmail')
            //         .updateValueAndValidity();
            // } else {
            //     this.resourcesForm.get('pmOrMentorEmail').clearValidators();
            //     this.resourcesForm
            //         .get('pmOrMentorEmail')
            //         .updateValueAndValidity();
            // }
        });
    }

    private pmMentorFilterInitialization() {
        // this.filteredEmails = this.resourcesForm
        //     .get('pmOrMentorEmail')
        //     .valueChanges.pipe(
        //         startWith(null),
        //         map((email) =>
        //             email ? this.filterEmails(email) : this.emailList?.slice()
        //         )
        //     );
    }

    private filterEmails(email: string) {
        console.log(this.emailList);
        let arr = this.emailList.filter(
            (item) =>
                item?.email.toLowerCase().indexOf(email.toLowerCase()) === 0
        );

        return arr.length ? arr : [{ email: 'No Emails found' }];
    }
}
