import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
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
import { ROLE_LIST, ValidationConstants } from 'app/core/constacts/constacts';
import { MonthValdation } from 'app/core/utils/Validations';
import moment from 'moment';
import { map, Observable, of, startWith } from 'rxjs';
import { AddSkillAndIntegrationComponent } from '../add-skill-and-integration/add-skill-and-integration.component';
import {
    EMAIL_LIST,
    TEAM_LIST,
    TECHNOLOGIES,
    TECHNOLOGIES_V2,
} from '../common';

@Component({
    selector: 'app-register-resource',
    templateUrl: './register-resource.component.html',
    styleUrls: ['./register-resource.component.scss'],
})
export class RegisterResourceComponent implements OnInit {
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
    emailList: any[] = EMAIL_LIST;
    allTeamsTechnologyList: any = TECHNOLOGIES;
    integrations: any = TECHNOLOGIES?.integrations;
    extraSkillIntegration: FormGroup;

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

    constructor(private formBuilder: FormBuilder, private dialog: MatDialog) {}

    ngOnInit(): void {
        this.initializeForm();
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
        this.resourcesForm
            ?.get('technology')
            ?.setValue(null, { emitEvent: true });
        const team = $event?.value;

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

        this.filteredTechnologies = of(this.alltechnologys);
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
            console.log(this.resourcesForm?.value);
        }
    }

    addSkillAndIntegrations() {
        const dialogRef = this.dialog.open(AddSkillAndIntegrationComponent, {
            disableClose: true,
            width: '100%',
            maxWidth: '700px',
            panelClass: 'warn-dialog-content',
            autoFocus: false,
            data: {},
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result == 'success') {
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
        console.log(this.alltechnologys);
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

    private initializeForm() {
        this.resourcesForm = this.formBuilder.group(
            {
                firstName: [
                    'rohan',
                    [
                        Validators.required,
                        Validators.pattern(ValidationConstants.NAME_VALIDATION),
                    ],
                ],
                lastName: [
                    'kadam',
                    [
                        Validators.required,
                        Validators.pattern(ValidationConstants.NAME_VALIDATION),
                    ],
                ],
                email: [
                    'r@mindbowser.com',
                    [
                        Validators.required,
                        Validators.email,
                        Validators.pattern(/@mindbowser.com\s*$/),
                    ],
                ],
                role: ['', [Validators.required]],
                year: [
                    3,
                    [Validators.pattern(ValidationConstants.YEAR_VALIDATION)],
                ],
                month: [
                    4,
                    [Validators.pattern(ValidationConstants.YEAR_VALIDATION)],
                ],
                dateOfJoining: ['07/06/2023', [Validators.required]],
                salary: [
                    '',
                    [Validators.pattern(ValidationConstants.SALARY_VALIDATION)],
                ],
                technology: [],
                technologies: this.formBuilder.array([]),
                pmOrMentorEmail: ['rohan.kadam@mindbowser.com'],
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

    private filterEmails(email: string) {
        let arr = this.emailList.filter(
            (item) =>
                item?.email.toLowerCase().indexOf(email.toLowerCase()) === 0
        );

        return arr.length ? arr : [{ email: 'No Emails found' }];
    }
}
