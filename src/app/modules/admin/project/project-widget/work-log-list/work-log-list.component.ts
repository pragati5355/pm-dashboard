import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-work-log-list',
    templateUrl: './work-log-list.component.html',
    styleUrls: ['./work-log-list.component.scss'],
})
export class WorkLogListComponent implements OnInit {
    selected = 'option2';
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<WorkLogListComponent>
    ) {}

    ngOnInit(): void {}

    close() {
        this.matDialogRef.close('close');
    }
}
