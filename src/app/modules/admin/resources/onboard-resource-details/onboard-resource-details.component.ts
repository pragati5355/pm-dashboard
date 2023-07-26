import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-onboard-resource-details',
    templateUrl: './onboard-resource-details.component.html',
    styleUrls: ['./onboard-resource-details.component.scss'],
})
export class OnboardResourceDetailsComponent implements OnInit {
    initialLoading = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<OnboardResourceDetailsComponent>
    ) {}

    ngOnInit(): void {}

    close() {
        this.matDialogRef.close();
    }
}
