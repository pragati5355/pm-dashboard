import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-add-form',
    templateUrl: './add-form.component.html',
    styleUrls: ['./add-form.component.scss'],
})
export class AddFormComponent implements OnInit {
    public form!: Object;
    dummyData: any;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<AddFormComponent>
    ) {}

    ngOnInit(): void {
        this.form = this.data?.formData;
        this.dummyData = {
            data: {
                nameOfThePersonWhoFilledTheFormReviewer: 'Joe',
                emailIdOfPersonForWhomTheFormIsFilled:
                    'rohan.kadam@mindbowser.com',
            },
        };
    }

    submit(event: any) {
        console.log('form io-->', event);
    }

    close() {
        this.matDialogRef.close();
    }
}
