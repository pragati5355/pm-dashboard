import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PlatformUsersFormComponent } from '@modules/admin/platform-users/platform-users-form/platform-users-form.component';

@Component({
    selector: 'app-invoice-percentage',
    templateUrl: './invoice-percentage.component.html',
    styleUrls: ['./invoice-percentage.component.scss'],
})
export class InvoicePercentageComponent implements OnInit {
    invoicePercentage = new FormControl();
    invoiceForm: FormGroup;
    constructor(
        private matDialogRef: MatDialogRef<PlatformUsersFormComponent>,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.initializeForm();
    }

    close() {
        this.matDialogRef.close();
    }

    submit() {
        if (this.invoiceForm?.valid) {
            console.log(this.invoiceForm?.get('invoicePercentage')?.value);
        }
    }

    increase() {
        const value =
            Number(this.invoiceForm?.get('invoicePercentage')?.value) + 1;
        if (value <= 100) {
            this.invoiceForm?.get('invoicePercentage')?.setValue(value);
        }
    }

    decrease() {
        const value =
            Number(this.invoiceForm?.get('invoicePercentage')?.value) - 1;
        if (value >= 0) {
            this.invoiceForm?.get('invoicePercentage')?.setValue(value);
        }
    }

    private initializeForm() {
        this.invoiceForm = this.formBuilder.group({
            invoicePercentage: ['', [Validators.min(0), Validators.max(100)]],
        });
    }
}
