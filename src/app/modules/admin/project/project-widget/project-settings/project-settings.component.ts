import { COMMA, ENTER } from '@angular/cdk/keycodes';
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
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import {
    PRIMARY_TIMES,
    ROLE_LIST,
    SECONDARY_TIMES,
} from '@modules/admin/external-projects/common/constants';
import { ExternalProjectService } from '@modules/admin/external-projects/common/services/external-project.service';
import { SnackBar } from 'app/core/utils/snackBar';
interface costTypeInterface {
    value: string;
    label: string;
}
@Component({
    selector: 'app-project-settings',
    templateUrl: './project-settings.component.html',
    styleUrls: ['./project-settings.component.scss'],
})
export class ProjectSettingsComponent implements OnInit {
    firstReminderCheck: boolean = false;
    secondReminderCheck: boolean = false;
    thirdReminderCheck: boolean = false;
    firstReminderControl: any = '';
    secondReminderControl: any = '';
    thirdReminderControl: any = '';
    secondSelect: any = null;
    thirdSelect: any = null;
    firstSelect: any = null;
    primaryTimings: any[] = PRIMARY_TIMES;
    secondaryTimings: any[] = SECONDARY_TIMES;
    selectTechnologyList: any[] = ROLE_LIST;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    addOnBlur = false;
    isLoading: boolean = false;
    isLoadingclearReminder: boolean = false;
    showStep: number = 0;
    fixedCostForm: FormGroup;
    fixedCostInput: FormControl;
    timeAndMaterialForm: FormGroup;
    costTypes: costTypeInterface[] = [
        {
            value: 'FIXED_COST',
            label: 'Fixed cost',
        },
        {
            value: 'TANDM',
            label: 'T&M',
        },
    ];
    timeAndMaterialType: costTypeInterface[] = [
        {
            value: 'FLAT_RATE',
            label: 'Flat rate',
        },
        {
            value: 'RESOURCE_SPECIFIC',
            label: 'Resource specific',
        },
    ];
    patchCostType: any = null;
    patchtimeAndMaterialType: any = null;

    get resources() {
        return this.timeAndMaterialForm?.get('resources') as FormArray;
    }

    get technologies() {
        return this.fixedCostForm?.get('technologies') as FormArray;
    }

    get resourcesValidForm(): { [key: string]: AbstractControl } {
        return this.fixedCostForm.controls;
    }

    constructor(
        public dialogRef: MatDialogRef<ProjectSettingsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private snackBar: SnackBar,
        private externalProjectService: ExternalProjectService,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.patchReminders();
        this.initializeForm();
    }

    costTypeChange(event: MatSelectChange) {
        // console.log(this.fixedCostForm?.value);
    }

    cancel() {
        this.dialogRef.close();
    }

    changeStep(step: number) {
        this.showStep = step;
    }

    changeTime(event: any) {
        this.firstReminderControl = event?.source?.value;
        this.secondSelect = null;
        this.thirdSelect = null;
        this.secondReminderControl = '';
        this.thirdReminderControl = '';
    }

    changeTimeSecond(event: any) {
        this.thirdSelect = null;
        this.secondReminderControl = event?.source?.value;
        this.thirdReminderControl = '';
    }
    changeTimeThird(event: any) {
        this.thirdReminderControl = event?.source?.value;
    }

    firstReminderCheckbox($event: any) {
        if (!$event?.checked) {
            this.thirdSelect = null;
            this.secondSelect = null;
            this.firstSelect = null;
            this.firstReminderControl = '';
            this.secondReminderControl = '';
            this.thirdReminderControl = '';
            this.secondReminderCheck = false;
            this.thirdReminderCheck = false;
        } else {
        }
    }

    secondReminderCheckbox($event: any) {
        if (!$event?.checked) {
            this.secondSelect = null;
            this.thirdSelect = null;
            this.secondReminderControl = '';
            this.thirdReminderControl = '';
            this.secondReminderCheck = false;
            this.thirdReminderCheck = false;
        } else {
            this.secondReminderCheck = true;
        }
    }

    thirdReminderCheckbox($event: any) {
        if (!$event?.checked) {
            this.thirdReminderControl = '';
            this.thirdSelect = null;
            this.thirdReminderCheck = false;
        } else {
            this.thirdReminderCheck = true;
        }
    }

    submit() {
        if (this.firstReminderCheck && this.firstReminderControl === '') {
            this.snackBar.errorSnackBar('Select time for reminder');
            return;
        }
        if (this.secondReminderCheck && this.secondReminderControl === '') {
            this.snackBar.errorSnackBar('Select time for reminder');
            return;
        }
        if (this.thirdReminderCheck && this.thirdReminderControl === '') {
            this.snackBar.errorSnackBar('Select time for reminder');
            return;
        }

        if (
            this.fixedCostForm?.get('costType')?.value?.value ===
                'FIXED_COST' &&
            this.fixedCostForm?.get('technologies')?.value?.length === 0
        ) {
            this.snackBar.errorSnackBar('Please select technology');
            return;
        }

        const technologyWithNoHourlyRate = this.fixedCostForm
            ?.get('technologies')
            ?.value?.filter(
                (item) => item?.techHours === 0 && item?.techRate === 0
            );

        if (
            this.fixedCostForm?.get('costType')?.value?.value ===
                'FIXED_COST' &&
            technologyWithNoHourlyRate?.length > 0
        ) {
            this.snackBar.errorSnackBar(
                'Please add selected technology Hours and Rate'
            );
            return;
        }

        if (
            this.fixedCostForm?.get('costType')?.value?.value ===
                'FIXED_COST' &&
            this.fixedCostForm?.invalid
        ) {
            this.snackBar.errorSnackBar('Please enter valid data');
            return;
        }

        if (
            this.fixedCostForm?.get('costType')?.value?.value === 'TANDM' &&
            this.timeAndMaterialForm?.get('type')?.value === null
        ) {
            this.snackBar.errorSnackBar('Please select nature of cost');
            return;
        }

        if (
            this.fixedCostForm?.get('costType')?.value?.value === 'TANDM' &&
            this.timeAndMaterialForm?.get('type')?.value.value ===
                'RESOURCE_SPECIFIC' &&
            this.timeAndMaterialForm?.invalid
        ) {
            this.snackBar.errorSnackBar('Please enter valid data');
            return;
        }

        if (
            this.fixedCostForm?.get('costType')?.value?.value === 'TANDM' &&
            this.timeAndMaterialForm?.get('type')?.value.value ===
                'FLAT_RATE' &&
            this.timeAndMaterialForm?.invalid
        ) {
            this.snackBar.errorSnackBar('Please enter valid data');
            return;
        }

        const payload = this.getPayload();
        this.isLoading = true;
        console.log("payload : ", payload);
        this.externalProjectService
            .saveSettings(payload)
            .subscribe((res: any) => {
                this.isLoading = false;
                if (!res?.error) {
                    this.snackBar.successSnackBar(res?.message);
                    this.dialogRef.close(true);
                } else {
                    this.snackBar.errorSnackBar(res?.message);
                }
            });
    }

    clearReminders() {
        const payload = {
            id: this.data?.projectSettings?.id,
            projectId: this.data?.projectModel?.id,
            deleted: true,
        };
        this.isLoadingclearReminder = true;
        this.externalProjectService
            .sendReminder(payload)
            .subscribe((res: any) => {
                this.isLoadingclearReminder = false;
                if (!res?.error) {
                    this.snackBar.successSnackBar(res?.message);
                    this.dialogRef.close(true);
                } else {
                    this.snackBar.errorSnackBar(res?.message);
                }
            });
    }

    add(event: MatChipInputEvent): void {
        const isAlreadyExist =
            this.technologies?.value?.filter(
                (item) =>
                    item?.name?.toLowerCase() === event?.value.toLowerCase()
            )?.length > 0;

        if (event?.value && !isAlreadyExist) {
            const technologyControl = this.fb.group({
                id: [null],
                name: [event?.value || null],
                techHours: [0, [Validators.required]],
                techRate: [0, [Validators.required]],
            });
            this.technologies.push(technologyControl);
        }
        const input = event.input;
        if (input) {
            input.value = '';
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        const technology = event?.option?.value;
        const isAlreadyExist =
            this.technologies?.value?.filter(
                (item) => item?.name?.toLowerCase() === technology.toLowerCase()
            )?.length > 0;

        if (technology && !isAlreadyExist) {
            const technologyControl = this.fb.group({
                id: [null],
                name: [technology || null],
                techHours: [0, [Validators.required]],
                techRate: [0, [Validators.required]],
            });
            console.log('technologyControl : ', technologyControl);
            this.technologies.push(technologyControl);
        }
        this.fixedCostForm.get('technology')?.reset();
    }

    removeTechnology(index: number, technologyControlValue: any) {
        if (technologyControlValue?.id) {
            const control = this.technologies?.at(index);
            control?.get('techHours').setErrors(null);
            control?.get('techRate').setErrors(null);
            control?.get('deleted')?.setValue(true);
        } else {
            this.technologies.removeAt(index);
        }
    }

    private initializeForm() {
        this.initializeFixedCostForm();
        this.initializeTimeAndMaterialForm();
        this.patchResourcesForTandM();
    }

    private patchResourcesForTandM() {
        this.data?.teamModel?.map((resource) => {
            if (resource?.vendor) {
                const control = this.fb.group({
                    name: [resource?.firstName + ' ' + resource?.lastName],
                    resourceId: resource?.resourceId,
                    vendor: resource?.vendor ? true : false,
                    cost: [
                        resource?.cost ? resource?.cost : 0,
                        [
                            Validators.required,
                            Validators.pattern(/^\d+(\.\d+)?$/),
                        ],
                    ],
                    costToCompany: [
                        resource?.vendorHourlyCost
                            ? resource?.vendorHourlyCost
                            : 0,
                        [
                            Validators.required,
                            Validators.pattern(/^\d+(\.\d+)?$/),
                            Validators.max(1000),
                        ],
                    ],
                });
                control?.get('name')?.disable();
                this.resources?.push(control);
            } else {
                const control = this.fb.group({
                    name: [resource?.firstName + ' ' + resource?.lastName],
                    resourceId: resource?.resourceId,
                    vendor: resource?.vendor ? true : false,
                    cost: [
                        resource?.cost ? resource?.cost : 0,
                        [
                            Validators.required,
                            Validators.pattern(/^\d+(\.\d+)?$/),
                            Validators.max(1000),
                        ],
                    ],
                });
                control?.get('name')?.disable();
                this.resources?.push(control);
            }
        });

        this.patchTandMCost();
    }

    private patchTandMCost() {
        this.timeAndMaterialForm
            ?.get('resources')
            ?.value?.map((resource: any, index) => {
                const match =
                    this.data?.projectSettings?.projectCostModel?.resourceCostModel?.filter(
                        (innerResource) => {
                            return (
                                resource?.resourceId ===
                                innerResource?.resourceId
                            );
                        }
                    );

                if (match?.length > 0) {
                    if (resource?.vendor) {
                        this.resources?.at(index)?.patchValue({
                            ...resource,
                            cost: match[0]?.cost,
                            costToCompany: match[0]?.vendorHourlyCost,
                        });
                    } else {
                        this.resources
                            ?.at(index)
                            ?.patchValue({ ...resource, cost: match[0]?.cost });
                    }
                }
            });
    }

    private initializeTimeAndMaterialForm() {
        this.patchtimeAndMaterialType = this.timeAndMaterialType?.filter(
            (type) =>
                type?.value ===
                this.data?.projectSettings?.projectCostModel?.tmType
        );

        this.timeAndMaterialForm = this.fb.group({
            type: this.patchtimeAndMaterialType
                ? this.patchtimeAndMaterialType
                : this.timeAndMaterialType[0],
            costInput: [
                this.data?.projectSettings?.projectCostModel?.flatRate
                    ? this.data?.projectSettings?.projectCostModel?.flatRate
                    : 0,
                [
                    Validators.required,
                    Validators.pattern(/^\d+(\.\d+)?$/),
                    Validators.max(1000),
                ],
            ],
            resources: this.fb.array([]),
        });

        if (this.data?.projectSettings?.projectCostModel?.tmType) {
            this.timeAndMaterialForm?.get('type')?.disable();
        }
    }

    private initializeFixedCostForm() {
        this.patchCostType = this.costTypes?.filter(
            (type) =>
                type?.value ===
                this.data?.projectSettings?.projectCostModel?.costType
        );

        this.fixedCostForm = this.fb.group({
            costType: this.patchCostType
                ? this.patchCostType
                : this.costTypes[0],
            costInput: [
                this.data?.projectSettings?.projectCostModel?.flatRate
                    ? this.data?.projectSettings?.projectCostModel?.flatRate
                    : 0,
                [
                    Validators.required,
                    Validators.pattern(/^\d+(\.\d+)?$/),
                    Validators.max(1000),
                ],
            ],
            technology: [],
            technologies: this.fb.array([]),
        });

        this.setTechnologiesListForUpdate();

        if (this.data?.projectSettings?.projectCostModel?.costType) {
            this.fixedCostForm?.get('costType')?.disable();
        }
    }

    private setTechnologiesListForUpdate() {
        this.data?.projectSettings?.projectTechCostModel?.map((item) => {
            this.technologies.push(
                this.fb.group({
                    id: [item?.id],
                    name: [item?.technology || null],
                    techHours: [item?.hours, [Validators.required]],
                    techRate: [item?.rate, [Validators.required]],
                })
            );
        });
    }

    private patchReminders() {
        this.data?.projectSettings?.reminderModel?.map((item) => {
            if (item?.reminderType === 'FIRST') {
                const idx = PRIMARY_TIMES?.findIndex(
                    (obj) => obj.value === item?.time
                );
                this.firstSelect = PRIMARY_TIMES[idx];
                this.firstReminderControl = this.firstSelect;
                this.firstReminderCheck = true;
            }
            if (item?.reminderType === 'SECOND') {
                const idx = PRIMARY_TIMES?.findIndex(
                    (obj) => obj.value === item?.time
                );
                this.secondSelect = PRIMARY_TIMES[idx];
                this.secondReminderControl = this.secondSelect;
                this.secondReminderCheck = true;
            }
            if (item?.reminderType === 'THIRD') {
                const idx = SECONDARY_TIMES?.findIndex(
                    (obj) => obj.value === item?.time
                );
                this.thirdSelect = SECONDARY_TIMES[idx];
                this.thirdReminderControl = this.thirdSelect;
                this.thirdReminderCheck = true;
            }
        });
    }

    private getPayload() {
        const payload = {
            id: this.data?.projectSettings?.id
                ? this.data?.projectSettings?.id
                : null,
            projectId: this.data?.projectModel?.id,
            sourceType: 'SLACK',
            deleted: false,
            reminderModel: [
                {
                    reminderType: 'FIRST',
                    time: this.firstReminderControl?.value,
                },
                {
                    reminderType: 'SECOND',
                    time: this.secondReminderControl?.value,
                },
                {
                    reminderType: 'THIRD',
                    time: this.thirdReminderControl?.value,
                },
            ],
            projectCostModel: {},
            projectTechCostModel: [],
        };
        for (let i = 0; i < payload?.sourceType?.length - 1; i++) {
            if (payload?.reminderModel[i]?.time === undefined) {
                delete payload?.reminderModel[i];
            }
        }
        const timeModel = payload?.reminderModel?.filter((item) => item);
        payload.reminderModel = timeModel;

        const resourceCostModel = this.getResourceCostModel();
        const projectTechCostModel = this.getTechnologyHourlyRate();
        payload.projectTechCostModel = projectTechCostModel;

        if (
            this.fixedCostForm?.get('costType')?.value?.value === 'FIXED_COST'
        ) {
            payload.projectCostModel = {
                costType: 'FIXED_COST',
                flatRate: this.fixedCostForm?.get('costInput')?.value,
            };
        } else {
            if (
                this.timeAndMaterialForm?.get('type')?.value?.value ===
                'FLAT_RATE'
            ) {
                payload.projectCostModel = {
                    costType: 'TANDM',
                    flatRate: this.timeAndMaterialForm?.get('costInput')?.value,
                    tmType: 'FLAT_RATE',
                };
            } else if (
                this.timeAndMaterialForm?.get('type')?.value?.value ===
                'RESOURCE_SPECIFIC'
            ) {
                payload.projectCostModel = {
                    costType: 'TANDM',
                    tmType: 'RESOURCE_SPECIFIC',
                    resourceCostModel: resourceCostModel,
                };
            }
        }

        return payload;
    }

    private getResourceCostModel() {
        return this.timeAndMaterialForm
            ?.get('resources')
            ?.value?.map((resource: any) => {
                if (resource?.vendor) {
                    return {
                        resourceId: resource?.resourceId,
                        cost: resource?.cost,
                        vendorHourlyCost: resource?.costToCompany,
                    };
                }
                return {
                    resourceId: resource?.resourceId,
                    cost: resource?.cost,
                };
            });
    }

    private getTechnologyHourlyRate() {
        return this.fixedCostForm
            ?.get('technologies')
            ?.value?.map((tech: any) => {
                return {
                    id: tech?.id || null,
                    technology: tech?.name,
                    hours: tech?.techHours,
                    rate: tech?.techRate,
                };
            });
    }
}
