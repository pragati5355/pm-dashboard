import { Component, Inject, OnInit } from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { SnackBar } from 'app/core/utils/snackBar';
import { ExternalProjectService } from '../common/services/external-project.service';

interface costTypeInterface {
    value: string;
    label: string;
}

@Component({
    selector: 'app-cost-type-setting',
    templateUrl: './cost-type-setting.component.html',
    styleUrls: ['./cost-type-setting.component.scss'],
})
export class CostTypeSettingComponent implements OnInit {
    fixedCostForm: FormGroup;
    fixedCostInput: FormControl;
    timeAndMaterialForm: FormGroup;
    costTypes: costTypeInterface[] = [
        {
            value: 'fixedCost',
            label: 'Fixed cost',
        },
        {
            value: 'timeAndMaterial',
            label: 'T&M',
        },
    ];
    timeAndMaterialType: costTypeInterface[] = [
        {
            value: 'flatRate',
            label: 'Flat rate',
        },
        {
            value: 'RESOURCE_SPECIFIC',
            label: 'Resource specific',
        },
    ];

    get resources() {
        return this.timeAndMaterialForm?.get('resources') as FormArray;
    }

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<CostTypeSettingComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private snackBar: SnackBar,
        private externalProjectService: ExternalProjectService
    ) {}

    ngOnInit(): void {
        this.fixedCostForm = this.fb.group({
            costType: this.costTypes[0],
            costInput: [
                '',
                [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)],
            ],
        });

        this.timeAndMaterialForm = this.fb.group({
            type: this.timeAndMaterialType[0],
            costInput: [
                '',
                [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)],
            ],
            resources: this.fb.array([]),
        });

        this.data?.teamModel?.map((resource) => {
            const control = this.fb.group({
                name: [resource?.firstName + ' ' + resource?.lastName],
                cost: [
                    '',
                    [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)],
                ],
            });
            this.resources?.push(control);
        });

        console.log(this.timeAndMaterialForm);
    }

    costTypeChange(event: MatSelectChange) {
        console.log(this.fixedCostForm?.value);
    }
}
