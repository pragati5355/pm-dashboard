import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-add-cr',
    templateUrl: './add-cr.component.html',
    styleUrls: ['./add-cr.component.scss'],
})
export class AddCrComponent implements OnInit {
    addCrForm: FormGroup;
    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.initializeForm();
    }

    private initializeForm() {
        this.addCrForm = this.formBuilder.group({
            totalCrHours: ['', [Validators.required]],
            crLink: [''],
            newProjectEndDate: ['', [Validators.required]],
        });
    }
}
