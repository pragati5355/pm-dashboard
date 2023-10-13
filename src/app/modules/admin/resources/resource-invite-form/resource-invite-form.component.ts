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
    users : any  = [
        {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
        {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
        {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
        {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
        {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
        {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
        {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
        {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
        {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
        {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
        {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
        {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
        {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
        {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
        {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
        {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
        {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
        {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
        {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
        {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
      ];
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
