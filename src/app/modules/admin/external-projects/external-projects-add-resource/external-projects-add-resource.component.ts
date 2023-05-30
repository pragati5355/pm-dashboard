import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
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
    utilizationValues: number[] = UTILIZATION_VALUES;
    ROLE_LIST: string[] = ROLE_LIST;
    resourceId: Number;
    userID: Number;
    projectId: any = this.data?.projectId;
    currentCapacity: number;
    mode: string;
    patchData: [] | null;
    disableEmailField: boolean = false;
    alreadyAssignedProjects: any[];
    isResourceOnBench: boolean = false;
    isShadowResource: boolean = false;
    markResourceAsBench: boolean = false;
    markResourceAsShadow: boolean = false;
    constructor(
        private matDialogRef: MatDialogRef<ExternalProjectsAddResourceComponent>,
        private _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private snackBar: SnackBar,
        private _authService: AuthService,
        private externalProjectsService: ExternalProjectsApiService,
        private datePipe: DatePipe,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.loadData();
        this.initializeFormGroup();
    }

    cancel() {
        this.matDialogRef.close();
    }

    submitResourceData() {
        if (this.addResourceForm?.value?.utilization === null) {
            this.snackBar.errorSnackBar('Choose Utilization');
            return;
        }

        if (!this.addResourceForm.invalid) {
            this.submitInProcess = true;
            let payload = this.getCreateResourcePayload();
            this.externalProjectsService.mapResource(payload).subscribe(
                (res: any) => {
                    this.submitInProcess = false;
                    if (res?.error === false) {
                        this.snackBar.successSnackBar(res?.message);
                        this.matDialogRef.close(true);
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

    resourceOnBench(value: boolean) {
        this.isResourceOnBench = value ? true : false;
    }

    shadowResource(value: boolean) {
        this.isShadowResource = value ? true : false;
    }

    getSelectedEmail(email: string) {
        this.getResourceCapacity(email);
        this.getCurrentResourceTechnology(email);
        this.utilizationValue = '';
        this.getAlreadyAssignedProjectsData(email);
    }

    getResourceCapacity(email: string) {
        const value = this.emailList.filter((item: any) => {
            return item?.email === email;
        });
        this.currentCapacity = value[0]?.capacity;
    }

    getCurrentResourceCapacity(email: string): number {
        const value = this.data?.allResources?.filter((item: any) => {
            return item?.email === email;
        });
        return value[0]?.capacity;
    }

    getCurrentResourceTechnology(email: string) {
        const value = this.data?.allResources?.filters((item: any) => {
            return item?.email === email;
        });
        return value[0]?.technology;
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
        this.loadCheckBoxData();
        this.mode = this.data?.mode;
        this.patchData = this.data?.editData;
        this.userID = this._authService.getUser()?.userId;
        this.checkEditMode();
    }

    private checkEditMode() {
        if (this.mode === 'EDIT') {
            this.disableEmailField = true;
            this.currentCapacity =
                this.getCurrentResourceCapacity(this.data?.editData?.email) +
                this.data?.editData?.utilization;
            this.cd.detectChanges();
        }
    }

    private loadCheckBoxData() {
        this.isResourceOnBench = this.data?.isBench || false;
        this.isShadowResource = this.data?.isShadow || false;
        this.markResourceAsBench = this.data?.isBench || false;
        this.markResourceAsShadow = this.data?.isShadow || false;
    }

    private getAlreadyAssignedProjectsData(email: string) {
        const obj = this.data?.allResources?.filter((item: any) => {
            return item?.email === email;
        });
        this.alreadyAssignedProjects = obj[0]?.projectUtilizationDetails;
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
            utilization: this.addResourceForm?.value?.utilization,
            deleted: false,
            assignedBy: this.userID,
            role: this.addResourceForm?.value?.role,
            projectType: 'EXTERNAL',
            isBench: this.isResourceOnBench,
            isShadow: this.isShadowResource,
        };
        if (this.mode === 'EDIT') {
            return {
                id: this.data?.editData?.id,
                projectId: this.projectId,
                resourceId: this.data?.editData?.resourceId,
                startDate: this.addResourceForm?.value?.startDate,
                endDate: this.addResourceForm?.value?.endDate,
                utilization: this.addResourceForm?.value?.utilization,
                deleted: false,
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
            utilization: [null, [Validators.required]],
        });
        this.patchValuesInEditMode();
        this.addEmailFilteringAndSubscription();
        if (this.mode === 'EDIT') {
            this.addResourceForm.controls['email'].disable();
        }
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
                utilization: this.data?.editData?.utilization,
            });
            this.getAlreadyAssignedProjectsData(this.data?.editData?.email);
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
