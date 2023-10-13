import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-resource-invite-form',
    templateUrl: './resource-invite-form.component.html',
    styleUrls: ['./resource-invite-form.component.scss'],
})
export class ResourceInviteFormComponent implements OnInit {
    inviteResourceForm: FormGroup;
    submitInProcess: boolean = false;
    constructor(
        private _fb: FormBuilder,
        private matDialogRef: MatDialogRef<ResourceInviteFormComponent>
    ) {}

    ngOnInit(): void {
        this.onInviteResouceFormInit();
    }

    cancel() {
        this.matDialogRef.close();
        this.inviteResourceForm.reset();
    }

    onInviteResouceFormInit() {
        this.inviteResourceForm = this._fb.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: [
                '',
                [
                    Validators.required,
                    Validators.email,
                    Validators.pattern(/@mindbowser.com\s*$/),
                ],
            ],
        });
    }

    onInviteResource() {
        console.log('FormValue ::', this.inviteResourceForm.value);
    }
}
