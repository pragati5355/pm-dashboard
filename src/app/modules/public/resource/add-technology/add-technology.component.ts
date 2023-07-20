import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-add-technology',
    templateUrl: './add-technology.component.html',
    styleUrls: ['./add-technology.component.scss'],
})
export class AddTechnologyComponent implements OnInit {
    addTechnologyForm: FormGroup;

    get technology() {
        return this.addTechnologyForm?.get('technology') as FormArray;
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private matDialogRef: MatDialogRef<AddTechnologyComponent>
    ) {}

    ngOnInit(): void {
        this.addTechnologyForm = this.formBuilder.group({
            technology: this.getControls(),
        });
    }

    add() {
        this.technology?.push(this.getSingleControl());
    }

    remove(index: number) {
        if (index !== 0) {
            this.technology.removeAt(index);
        }
    }

    cancel() {
        this.matDialogRef.close();
    }

    submit() {
        if (this.technology?.valid) {
            const values = this.technology?.value?.map((item) => item);
            const newArr = values.filter((x) => {
                return !this?.data?.technologies?.find(
                    (y) => y?.name?.toLowerCase() === x?.name?.toLowerCase()
                );
            });
            this.matDialogRef.close(newArr);
        }
    }

    private getSingleControl(): FormGroup {
        const technologyControl = this.formBuilder.group({
            name: [null, [Validators.required]],
            experienceYear: [0, [Validators.required]],
            experienceMonth: [0, [Validators.required]],
            resourceId: [null],
        });

        return technologyControl;
    }

    private getControls(): FormArray {
        return this.formBuilder.array([this.getSingleControl()]);
    }
}
