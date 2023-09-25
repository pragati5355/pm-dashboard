import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

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
    constructor(private fb: FormBuilder) {}

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
        });
    }

    costTypeChange(event: MatSelectChange) {
        console.log(this.fixedCostForm?.value);
    }
}
