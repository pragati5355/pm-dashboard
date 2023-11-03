import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-add-form',
    templateUrl: './add-form.component.html',
    styleUrls: ['./add-form.component.scss'],
})
export class AddFormComponent implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<AddFormComponent>
    ) {}

    ngOnInit(): void {}

    close() {
        this.matDialogRef.close();
    }
}
