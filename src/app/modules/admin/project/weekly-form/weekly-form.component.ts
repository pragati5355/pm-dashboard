import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-weekly-form',
    templateUrl: './weekly-form.component.html',
    styleUrls: ['./weekly-form.component.scss'],
})
export class WeeklyFormComponent implements OnInit {
    public form!: Object;
    formData: any;
    initialLoading = false;
    pdfUrl: string = '';

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<WeeklyFormComponent>
    ) {}

    ngOnInit(): void {
        this.pdfUrl = this.data?.pdfUrl;
    }

    close() {
        this.matDialogRef.close();
    }
}
