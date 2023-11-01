import {
    Component,
    ElementRef,
    Inject,
    OnInit,
    ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ROLE_LIST, UTILIZATION_VALUES } from 'app/core/constacts/constacts';
import { map, Observable, startWith } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBar } from 'app/core/utils/snackBar';
import { AuthService } from '@services/auth/auth.service';
import { DatePipe } from '@angular/common';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { UPDATED_UTILIZATION_VALUES } from '@modules/admin/external-projects/common/constants';

@Component({
    selector: 'app-add-cr-resource-dialog',
    templateUrl: './add-cr-resource-dialog.component.html',
    styleUrls: ['./add-cr-resource-dialog.component.scss'],
})
export class AddCrResourceDialogComponent implements OnInit {
    @ViewChild('technologyInput')
    technologyInput!: ElementRef;

    addResourceForm: FormGroup;
    submitInProcess = false;
    filteredEmails: Observable<any[]>;
    emailList: any[] = [];
    utilizationValue: string;
    utilizationValues: number[] = UTILIZATION_VALUES;
    newUtilizationValues: any[] = UPDATED_UTILIZATION_VALUES;
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
    selectable = true;
    removable = true;
    addOnBlur = false;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    technologys: any = [];
    filteredTechnologies: Observable<any[]> | undefined;
    alltechnologys: any[] = [];
    currentResourceTechnologyList: any[] = [];
    isEmailSelected: boolean = false;
    showNoOfHoursField: boolean = false;

    constructor(
        private matDialogRef: MatDialogRef<AddCrResourceDialogComponent>,
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private snackBar: SnackBar,
        private authService: AuthService,
        private datePipe: DatePipe
    ) {}

    ngOnInit(): void {
        this.loadData();
        this.initializeFormGroup();
    }

    cancel() {
        this.technologys = [];
        this.alltechnologys = [];
        this.technologyInput.nativeElement.value = '';
        this.addResourceForm.get('technology')?.setValue('');
        this.addResourceForm?.reset();
        this.matDialogRef.close();
    }

    submitResourceData() {
        if (this.addResourceForm?.value?.utilization === null) {
            this.snackBar.errorSnackBar('Choose Utilization');
            return;
        }

        if (
            this.technologys?.length < 1 &&
            this.addResourceForm?.value?.role != 'PM'
        ) {
            this.snackBar.errorSnackBar('Add Technologys');
            return;
        }

        if (!this.addResourceForm.invalid) {
            let resourceData = this.getCreateResourcePayload();
            this.matDialogRef.close({
                data: resourceData,
                editResource: this.mode === 'EDIT' ? true : false,
            });
        }
    }

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;
        // Add our technology

        if (input) {
            input.value = '';
        }
        this.addResourceForm.get('technology')?.setValue('');
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.technologys.push(event?.option?.value);
        this.technologyInput.nativeElement.value = '';
        this.addResourceForm.get('technology')?.setValue('');
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
        this.addResourceForm.get('utilization').setValue(null);
        this.isEmailSelected = true;
        this.alltechnologys = [];
        this.technologys = [];
        this.addResourceForm.get('technology')?.setValue('');
        this.getResourceCapacity(email);
        this.getCurrentResourceTechnology(email);
        this.utilizationValue = '';
        this.getAlreadyAssignedProjectsData(email);
    }
    clearSelectedEmail() {
        this.alltechnologys = [];
        this.technologys = [];
        this.technologyInput.nativeElement.value = '';
        this.addResourceForm.get('technology')?.setValue('');
        this.isEmailSelected = false;
        this.addResourceForm.get('utilization').setValue(null);
        this.addResourceForm.get('email').setValue('');
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
        const value = this.data?.allResources?.filter((item: any) => {
            return item?.email === email;
        });
        this.alltechnologys = value[0]?.technologies;
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
        this.userID = this.authService.getUser()?.userId;
    }

    private checkEditMode() {
        if (this.mode === 'EDIT') {
            this.disableEmailField = true;
            if (this.data?.editData?.status === 'ACTIVE') {
                this.currentCapacity =
                    this.getCurrentResourceCapacity(
                        this.data?.editData?.email
                    ) + this.data?.editData?.utilization;
            } else {
                this.addResourceForm?.patchValue({
                    utilization:
                        this.getCurrentResourceCapacity(
                            this.data?.editData?.email
                        ) <= 0
                            ? this.data?.editData?.utilization
                            : this.getCurrentResourceCapacity(
                                  this.data?.editData?.email
                              ),
                });

                this.currentCapacity = this.getCurrentResourceCapacity(
                    this.data?.editData?.email
                );
            }
        }
    }

    private loadCheckBoxData() {
        this.isResourceOnBench = this.data?.editData?.bench || false;
        this.isShadowResource = this.data?.editData?.shadow || false;
        this.markResourceAsBench = this.data?.editData?.bench || false;
        this.markResourceAsShadow = this.data?.editData?.shadow || false;
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
            email: this.addResourceForm.get('email')?.value,
            projectId: this.projectId,
            resourceId: this.resourceId,
            startDate: this.addResourceForm?.value?.startDate,
            endDate: this.addResourceForm?.value?.endDate,
            utilization: this.addResourceForm?.value?.utilization,
            deleted: false,
            assignedBy: this.userID,
            role: this.addResourceForm?.value?.role,
            projectType: 'EXTERNAL',
            bench: this.isResourceOnBench,
            shadow: this.isShadowResource,
            technologies: this.technologys,
            extendedHours: this.addResourceForm?.value?.noOfHours,
        };
        if (this.mode === 'EDIT') {
            return {
                id: this.data?.editData?.id,
                email: this.addResourceForm.get('email')?.value,
                projectId: this.projectId,
                resourceId: this.data?.editData?.resourceId,
                startDate: this.addResourceForm?.value?.startDate,
                endDate: this.addResourceForm?.value?.endDate,
                utilization: this.addResourceForm?.value?.utilization,
                deleted: false,
                assignedBy: this.userID,
                role: this.addResourceForm?.value?.role,
                bench: this.isResourceOnBench,
                shadow: this.isShadowResource,
                technologies: this.technologys,
                extendedHours: this.addResourceForm?.value?.noOfHours,
            };
        }
        return payload;
    }

    private initializeFormGroup() {
        this.addResourceForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            role: ['', [Validators.required]],
            startDate: [new Date(), [Validators.required]],
            endDate: ['', [Validators.required]],
            utilization: [null, [Validators.required]],
            technology: [''],
            noOfHours: [''],
        });

        this.dynamicFieldValidationForHours();

        this.filteredTechnologies = this.addResourceForm
            .get('technology')
            ?.valueChanges.pipe(
                startWith(''),
                map((technology: any | null) =>
                    technology ? this._filter(technology) : this._filterslice()
                )
            );

        this.patchValuesInEditMode();
        this.checkEditMode();
        this.addEmailFilteringAndSubscription();
        if (this.mode === 'EDIT') {
            this.addResourceForm.controls['email'].disable();
        }
    }

    _filter(value: any) {
        return this.alltechnologys.filter(
            (obj) => !this.technologys?.some(({ id }) => obj.id === id)
        );
    }
    _filterslice() {
        return this.alltechnologys.filter(
            (obj) => !this.technologys?.some(({ id }) => obj.id === id)
        );
    }

    remove(technology: any, selectIndex: any): void {
        this.technologys.splice(selectIndex, 1);
        this.addResourceForm.get('technology')?.setValue('');
    }

    private dynamicFieldValidationForHours() {
        this.addResourceForm
            .get('endDate')
            .valueChanges.subscribe((res: any) => {
                if (
                    res === '' ||
                    res !==
                        this.datePipe.transform(
                            this.data?.editData?.endDate,
                            "yyyy-MM-dd'T'HH:mm:ss.SSS'Z"
                        ) ||
                    this.data?.editData?.extendedHours
                ) {
                    this.showNoOfHoursField = true;
                    this.addResourceForm
                        .get('noOfHours')
                        .setValidators(Validators.required);
                    this.addResourceForm
                        .get('noOfHours')
                        .updateValueAndValidity();
                }
            });
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
                noOfHours: this.data?.editData?.extendedHours,
            });
            this.technologys = this.data?.editData?.technologies;
            this.getCurrentResourceTechnology(this.data?.editData?.email);
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
