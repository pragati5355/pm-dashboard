import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PlatformUsersFormComponent } from '@modules/admin/platform-users/platform-users-form/platform-users-form.component';

@Component({
    selector: 'app-invoice-percentage',
    templateUrl: './invoice-percentage.component.html',
    styleUrls: ['./invoice-percentage.component.scss'],
})
export class InvoicePercentageComponent implements OnInit {
    invoicePercentage: FormControl;
    constructor(
        private matDialogRef: MatDialogRef<PlatformUsersFormComponent>
    ) {}

    ngOnInit(): void {}

    close() {
        this.matDialogRef.close();
    }
}
