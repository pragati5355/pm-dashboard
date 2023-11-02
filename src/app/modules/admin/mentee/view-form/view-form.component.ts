import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-view-form',
    templateUrl: './view-form.component.html',
    styleUrls: ['./view-form.component.scss'],
})
export class ViewFormComponent implements OnInit {
    public form!: Object;
    formData: any;
    initialLoading = false;
    pdfUrl: string = '';

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<ViewFormComponent>
    ) {}

    ngOnInit(): void {
        console.log('link-->', this.data?.link);
        this.pdfUrl = this.data?.link;
    }

    close() {
        this.matDialogRef.close();
    }
}
