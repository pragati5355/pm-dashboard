import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBar } from '../../../../core/utils/snackBar';
import { map, Observable, startWith } from 'rxjs';
import { ROLE_LIST, UTILIZATION_VALUES } from '../common/constants';
import { AuthService } from '@services/auth/auth.service';
import { ExternalProjectsApiService } from '../common/services/external-projects-api.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-external-projects-add-resource',
    templateUrl: './external-projects-add-resource.component.html',
    styleUrls: ['./external-projects-add-resource.component.scss'],
})
export class ExternalProjectsAddResourceComponent implements OnInit {
    addResourceForm: FormGroup;
    submitInProcess = false;
    filteredEmails: Observable<any[]>;
    emailList: any[] = [];
    utilizationValue: string;
    utilizationValues: string[] = UTILIZATION_VALUES;
    ROLE_LIST: string[] = ROLE_LIST;
    resourceId: Number;
    userID: Number;
    projectId: any = this.data?.projectId;
    currentCapacity: any;
    mode: string;
    patchData: [] | null;
    constructor(
        private matDialogRef: MatDialogRef<ExternalProjectsAddResourceComponent>,
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private snackBar: SnackBar,
        private _authService: AuthService,
        private externalProjectsService: ExternalProjectsApiService,
        private datePipe: DatePipe
    ) {}

    ngOnInit(): void {
        this.loadData();
        this.initializeFormGroup();
    }

    cancel() {
        this.matDialogRef.close();
    }

    submitResourceData() {
        if (this.utilizationValue === undefined) {
            this.snackBar.errorSnackBar('Choose Utilization');
            return;
        }
        if (!this.addResourceForm.invalid) {
            this.submitInProcess = true;
            let payload = this.getCreateResourcePayload();
            console.log(payload);
            this.externalProjectsService.mapResource(payload).subscribe(
                (res: any) => {
                    this.submitInProcess = false;
                    if (res?.error === false) {
                        this.snackBar.successSnackBar(res?.message);
                        this.matDialogRef.close('success');
                        this.cancel();
                    }
                    if (res?.error === true) {
                        this.snackBar.errorSnackBar(res?.message);
                    }
                    if (res?.tokenExpire) {
                        this._authService.updateAndReload(window.location);
                    }
                },
                (err) => {
                    this.submitInProcess = false;
                }
            );
        }
    }

    findResourceId(email: string) {
        const value = this.emailList.filter((item: any) => {
            return item?.email === email;
        });
        return value[0]?.id;
    }

    getSelectedEmail(email: string) {
        this.getResourceCapacity(email);
    }

    getResourceCapacity(email: string) {
        const value = this.emailList.filter((item: any) => {
            return item?.email === email;
        });
        this.currentCapacity = value[0]?.capacity;
    }

    filterEmails(email: string) {
        let arr = this.emailList.filter(
            (item) =>
                item?.email.toLowerCase().indexOf(email.toLowerCase()) === 0
        );

        return arr.length ? arr : [{ email: '' }];
    }

    private loadData() {
        this.emailList = this.data?.developerEmails;
        this.mode = this.data?.mode;
        this.patchData = this.data?.editData;
        this.userID = this._authService.getUser()?.userId;
    }

    private getCreateResourcePayload() {
        this.resourceId = this.findResourceId(
            this.addResourceForm?.value?.email
        );
        let payload = {
            projectId: this.projectId,
            resourceId: this.resourceId,
            startDate: this.addResourceForm?.value?.startDate,
            endDate: this.addResourceForm?.value?.endDate,
            utilization: Number(this.utilizationValue),
            isDeleted: false,
            assignedBy: this.userID,
            role: this.addResourceForm?.value?.role,
        };
        if (this.mode === 'EDIT') {
            return {
                id: this.data?.editData?.projectResourceMapId,
                projectId: this.projectId,
                resourceId: this.resourceId,
                startDate: this.addResourceForm?.value?.startDate,
                endDate: this.addResourceForm?.value?.endDate,
                utilization: Number(this.utilizationValue),
                isDeleted: false,
                assignedBy: this.userID,
                role: this.addResourceForm?.value?.role,
            };
        }
        return payload;
    }

    private initializeFormGroup() {
        this.addResourceForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            role: ['', [Validators.required]],
            startDate: ['', [Validators.required]],
            endDate: ['', [Validators.required]],
        });
        this.patchValuesInEditMode();
        this.addEmailFilteringAndSubscription();
    }

    private patchValuesInEditMode() {
        if (this.mode === 'EDIT') {
            this.addResourceForm.patchValue({
                email: this.data?.editData?.email,
                role: this.data?.editData?.role,
                startDate: this.datePipe.transform(
                    this.data?.editData?.startDate,
                    "yyyy-MM-dd'T'HH:mm:ss.SSS'Z"
                ),
                endDate: this.datePipe.transform(
                    this.data?.editData?.endDate,
                    "yyyy-MM-dd'T'HH:mm:ss.SSS'Z"
                ),
            });
            this.getResourceCapacity(this.data?.editData?.email);
            this.utilizationValue = String(this.data?.editData?.utilization);
        }
    }

    private addEmailFilteringAndSubscription() {
        this.filteredEmails = this.addResourceForm
            .get('email')
            .valueChanges.pipe(
                startWith(null),
                map((email) =>
                    email ? this.filterEmails(email) : this.emailList.slice()
                )
            );
    }
}
