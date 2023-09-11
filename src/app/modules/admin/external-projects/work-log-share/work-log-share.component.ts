import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-work-log-share',
    templateUrl: './work-log-share.component.html',
    styleUrls: ['./work-log-share.component.scss'],
})
export class WorkLogShareComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<WorkLogShareComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit(): void {}

    cancel() {
        this.dialogRef.close();
    }
}
