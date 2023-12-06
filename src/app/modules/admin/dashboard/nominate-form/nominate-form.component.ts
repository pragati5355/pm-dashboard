import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBar } from 'app/core/utils/snackBar';
import { map, Observable, startWith } from 'rxjs';
import { DashboardApiService } from '../common/services/dashboard-api.service';

export interface NominateModel {
    nominatedBy: string;
    nominee: string;
    reason: string;
    award: 'RISING_STAR' | 'SUPER_STAR';
}

@Component({
    selector: 'app-nominate-form',
    templateUrl: './nominate-form.component.html',
    styleUrls: ['./nominate-form.component.scss'],
})
export class NominateFormComponent implements OnInit {
    nominateForm: FormGroup;
    filteredEmails: Observable<any[]>;
    emailList: any[] = [];
    awardOptions: any[] = [
        {
            value: 'RISING_STAR',
            label: 'Rising star',
        },
        {
            value: 'SUPER_STAR',
            label: 'Super star',
        },
    ];
    submitInProcess: boolean = false;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private matDialogRef: MatDialogRef<NominateFormComponent>,
        private dashboardService: DashboardApiService,
        private snackBar: SnackBar
    ) {}

    ngOnInit(): void {
        this.emailList = this.data?.emails;
        this.initializeForm();
    }

    cancel() {
        this.matDialogRef.close();
    }

    getSelectedEmail(email: string) {}

    filterEmails(email: string) {
        let arr = this.emailList.filter(
            (item) =>
                item?.email.toLowerCase().indexOf(email.toLowerCase()) === 0
        );

        return arr.length ? arr : [{ email: '' }];
    }

    submit() {
        if (this.nominateForm?.valid) {
            this.submitInProcess = true;
            const payload = this.nominatePayload();
            this.dashboardService.saveNominee(payload).subscribe(
                (res: any) => {
                    this.submitInProcess = false;
                    if (res?.statusCode === 200) {
                        this.snackBar.successSnackBar(res?.message);
                        this.matDialogRef.close('success');
                    }
                },
                (err) => {
                    this.submitInProcess = false;
                }
            );
        }
    }

    private initializeForm() {
        this.nominateForm = this.formBuilder.group({
            nominee: ['', [Validators.required]],
            award: ['', [Validators.required]],
            reason: ['', [Validators.required]],
        });
        this.addEmailFilteringAndSubscription();
    }

    private addEmailFilteringAndSubscription() {
        this.filteredEmails = this.nominateForm
            .get('nominee')
            .valueChanges.pipe(
                startWith(null),
                map((email) =>
                    email ? this.filterEmails(email) : this.emailList.slice()
                )
            );
    }

    private nominatePayload() {
        return {
            nominatedBy: this.data?.loggedInUser?.email,
            nominee: this.nominateForm?.get('nominee')?.value,
            award: this.nominateForm?.get('award')?.value,
            reason: this.nominateForm?.get('reason')?.value,
        };
    }
}
