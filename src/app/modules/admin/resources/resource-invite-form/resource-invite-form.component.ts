import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ResourcesService } from '../common/services/resources.service';
import { SnackBar } from 'app/core/utils/snackBar';

@Component({
    selector: 'app-resource-invite-form',
    templateUrl: './resource-invite-form.component.html',
    styleUrls: ['./resource-invite-form.component.scss'],
})
export class ResourceInviteFormComponent implements OnInit {
    inviteResourceForm: FormGroup;
    submitInProcess: boolean = false;
    invitedResources: any = [];

    constructor(
        private _fb: FormBuilder,
        private matDialogRef: MatDialogRef<ResourceInviteFormComponent>,
        private resourcesService: ResourcesService,
        private snackBar: SnackBar
    ) {}

    ngOnInit(): void {
        this.onInviteResouceFormInit();
        this.getInvitedRourceList();
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

    onInviteResource(formValues: any) {
        const payload = { ...formValues };
        console.log('FormValues', payload);
        this.resourcesService.inviteResource(payload).subscribe({
            next: (res: any) => {
                if (res.status == 200 || res.code == 200) {
                    this.snackBar.successSnackBar('Invitation has been sent !');
                    this.cancel();
                } else if (res.status == 208 || res.code == 208) {
                    this.snackBar.successSnackBar('Invitation already sent !');
                    this.cancel();
                } else {
                    this.snackBar.successSnackBar('Something wents wrong !');
                    this.cancel();
                }
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    getInvitedRourceList() {
        this.resourcesService.getResourcesList().subscribe({
            next: (res: any) => {
                if (res.code == 200) {
                    this.invitedResources = res?.data;
                }
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    onReinviteResource(idx: number) {
        const payload = { ...this.invitedResources[idx] };
        payload.reInvite = true;
        this.onInviteResource(payload);
    }
}
