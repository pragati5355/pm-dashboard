import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-add-skill-and-integration',
    templateUrl: './add-skill-and-integration.component.html',
    styleUrls: ['./add-skill-and-integration.component.scss'],
})
export class AddSkillAndIntegrationComponent implements OnInit {
    skillAndIntegrationsForm: FormGroup;

    get skillandIntegration() {
        return this.skillAndIntegrationsForm?.get(
            'skillandIntegration'
        ) as FormArray;
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private matDialogRef: MatDialogRef<AddSkillAndIntegrationComponent>
    ) {}

    ngOnInit(): void {
        this.skillAndIntegrationsForm = this.formBuilder.group({
            skillandIntegration: this.getControls(),
        });
    }

    add() {
        this.skillandIntegration?.push(this.getSingleControl());
    }

    remove(index: number) {
        if (index !== 0) {
            this.skillandIntegration.removeAt(index);
        }
    }

    cancel() {
        this.matDialogRef.close();
    }

    submit() {
        if (this.skillandIntegration?.valid) {
            const values = this.skillandIntegration?.value?.map((item) => item);

            const newArr = values.filter((x) => {
                return !this?.data?.integrations?.find(
                    (y) => y?.name?.toLowerCase() === x?.name?.toLowerCase()
                );
            });

            this.matDialogRef.close(newArr);
        }
    }

    private getSingleControl(): FormGroup {
        const control = this.formBuilder.group({
            name: ['', [Validators.required]],
            checked: [true],
        });

        return control;
    }

    private getControls(): FormArray {
        return this.formBuilder.array([this.getSingleControl()]);
    }
}
