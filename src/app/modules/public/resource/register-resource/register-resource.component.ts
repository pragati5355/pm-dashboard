import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { ROLE_LIST, ValidationConstants } from 'app/core/constacts/constacts';
import { MonthValdation } from 'app/core/utils/Validations';
import moment from 'moment';
import { map, Observable, startWith } from 'rxjs';
import { EMAIL_LIST, TECHNOLOGIES } from '../common';

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

    constructor(private formBuilder: FormBuilder) {}

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
        this.resourcesForm?.get('technology')?.setValue([]);
        const team = $event?.value;
        this.alltechnologys = [];
        if (team === ROLE_LIST[0]) {
            this.alltechnologys?.push(this.allTeamsTechnologyList?.frontEnd);
        } else if (team === ROLE_LIST[1]) {
            this.alltechnologys?.push(this.allTeamsTechnologyList?.backEnd);
        } else if (team === ROLE_LIST[2]) {
            const fe: any[] = this.allTeamsTechnologyList?.frontEnd;
            const be: any[] = fe.concat(this.allTeamsTechnologyList?.backEnd);
            this.alltechnologys?.push([...new Set(be)]);
        } else if (team === ROLE_LIST[3]) {
        } else if (team === ROLE_LIST[4]) {
            this.alltechnologys?.push(this.allTeamsTechnologyList?.devOps);
        } else if (team === ROLE_LIST[5]) {
            this.alltechnologys?.push(this.allTeamsTechnologyList?.qa);
        } else if (team === ROLE_LIST[6]) {
            this.alltechnologys?.push(this.allTeamsTechnologyList?.designer);
        } else if (team === ROLE_LIST[7]) {
            this.alltechnologys?.push(this.allTeamsTechnologyList?.dataScience);
        }
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
        const res = this.alltechnologys[0]?.filter(
            (tech) => tech.toLowerCase().indexOf(value) === 0
        );
        return res;
    }
    _filterslice() {
        return this.alltechnologys[0]?.filter(
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
                pmOrMentorEmail: [''],
                certificates: this.getCertifcatesControls(),
                mbProjects: this.getMbProjectsControls(),
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
