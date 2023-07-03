import { Component, Inject, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '@services/auth/auth.service';
import { valid } from 'chroma-js';

@Component({
    selector: 'app-edit-project-reason-dialog',
    templateUrl: './edit-project-reason-dialog.component.html',
    styleUrls: ['./edit-project-reason-dialog.component.scss'],
})
export class EditProjectReasonDialogComponent implements OnInit {
    reasonForm: FormGroup;
    loggedInUser: any;
    changedBy: any;
    currentDate: string;
    mode: 'ADD' | 'EDIT';
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<EditProjectReasonDialogComponent>,
        private authService: AuthService,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.loggedInUser = this.authService.getUser();
        this.getLoggedInUser();
        this.getCurrentDate();
        this.initializaForm();
    }

    submit() {
        if (this.reasonForm?.valid) {
            this.matDialogRef.close({
                reason: this.reasonForm?.get('editEndDateReason')?.value,
                edited: this.mode === 'EDIT' ? true : false,
            });
        }
    }

    private initializaForm() {
        this.reasonForm = this.formBuilder.group({
            editEndDateReason: [
                this.data?.prefiledReason ? this.data?.prefiledReason : '',
                Validators.required,
            ],
        });
    }

    private getLoggedInUser() {
        this.changedBy = `${this.loggedInUser?.firstName}
        ${this.loggedInUser?.lastName}
        `;
    }

    private getCurrentDate() {
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        this.currentDate = `${day}-${month}-${year}`;
    }

    close() {
        this.matDialogRef.close();
    }
}
