import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-work-logs',
    templateUrl: './work-logs.component.html',
    styleUrls: ['./work-logs.component.scss'],
})
export class WorkLogsComponent implements OnInit {
    workLogForm: FormGroup;
    submitInProgress: boolean = false;
    onLeave: boolean = false;
    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.initializeForm();
    }

    submit() {
        if (this.workLogForm?.valid && !this.onLeave) {
            this.submitInProgress = true;
            console.log(this.workLogForm?.value);
            console.log(this.onLeave);
        }

        if (!this.workLogForm?.valid && this.onLeave) {
            this.submitInProgress = true;

            console.log(this.workLogForm?.value);
            console.log(this.onLeave);
        }
    }

    checkBox(value: boolean) {
        this.onLeave = value;
        if (value) {
            this.workLogForm?.get('totalHours')?.disable();
            this.workLogForm?.get('description')?.disable();
            this.workLogForm?.get('totalHours')?.setValue('');
            this.workLogForm?.get('description')?.setValue('');
        } else {
            this.workLogForm?.get('totalHours')?.enable();
            this.workLogForm?.get('description')?.enable();
        }
    }

    private initializeForm() {
        this.workLogForm = this.formBuilder.group({
            totalHours: ['', [Validators.required]],
            description: ['', [Validators.required]],
        });
    }
}
