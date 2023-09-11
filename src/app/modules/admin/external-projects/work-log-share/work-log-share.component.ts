import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-work-log-share',
    templateUrl: './work-log-share.component.html',
    styleUrls: ['./work-log-share.component.scss'],
})
export class WorkLogShareComponent implements OnInit {
    color: any = 'primary';
    checked = false;
    disabled = false;
    shareForm: FormGroup;
    constructor(
        public dialogRef: MatDialogRef<WorkLogShareComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.shareForm = this.fb.group({
            workLogShare: false,
        });
    }

    cancel() {
        this.dialogRef.close();
    }
}
