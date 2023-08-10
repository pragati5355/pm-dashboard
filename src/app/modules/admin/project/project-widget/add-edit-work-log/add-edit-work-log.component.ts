import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-add-edit-work-log',
    templateUrl: './add-edit-work-log.component.html',
    styleUrls: ['./add-edit-work-log.component.scss'],
})
export class AddEditWorkLogComponent implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<AddEditWorkLogComponent>
    ) {}

    ngOnInit(): void {}
    close() {
        this.matDialogRef.close();
    }
}
