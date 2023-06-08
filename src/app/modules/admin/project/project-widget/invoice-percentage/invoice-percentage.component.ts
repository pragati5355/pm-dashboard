import { Component, Inject, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlatformUsersFormComponent } from '@modules/admin/platform-users/platform-users-form/platform-users-form.component';
import { AuthService } from '@services/auth/auth.service';
import { SnackBar } from 'app/core/utils/snackBar';
import { InvoicePercentageService } from '../../common/services/invoice-percentage.service';

@Component({
    selector: 'app-invoice-percentage',
    templateUrl: './invoice-percentage.component.html',
    styleUrls: ['./invoice-percentage.component.scss'],
})
export class InvoicePercentageComponent implements OnInit {
    invoicePercentage = new FormControl();
    invoiceForm: FormGroup;
    submitInProcess: boolean = false;
    constructor(
        private matDialogRef: MatDialogRef<PlatformUsersFormComponent>,
        private formBuilder: FormBuilder,
        private invoicePercentageService: InvoicePercentageService,
        private snackBar: SnackBar,
        private authService: AuthService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit(): void {
        this.initializeForm();
    }

    close() {
        this.matDialogRef.close();
    }

    submit() {
        if (this.invoiceForm?.valid) {
            this.submitInProcess = true;
            const payload = {
                sprintId: this.data?.sprintData?.id,
                invoicePercentage:
                    this.invoiceForm?.get('invoicePercentage')?.value,
            };
            this.invoicePercentageService.invoicePercentage(payload).subscribe(
                (res: any) => {
                    if (!res?.error) {
                        this.submitInProcess = false;
                        this.snackBar.successSnackBar(res?.message);
                        this.matDialogRef.close(true);
                    } else {
                        this.submitInProcess = false;
                        this.snackBar.errorSnackBar(res?.message);
                    }
                    if (res?.tokenExpire == true) {
                        this.authService.updateAndReload(window.location);
                    }
                },
                (err: any) => {
                    this.submitInProcess = false;
                    this.snackBar.errorSnackBar('Something Went Wrong');
                }
            );
        }
    }

    increasePercentage() {
        const value =
            Number(this.invoiceForm?.get('invoicePercentage')?.value) + 1;
        if (value <= 100) {
            this.invoiceForm?.get('invoicePercentage')?.setValue(value);
        }
    }

    decreasePercentage() {
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
