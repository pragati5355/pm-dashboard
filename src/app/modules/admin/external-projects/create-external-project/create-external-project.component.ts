import { ENTER, COMMA } from '@angular/cdk/keycodes';
import {
    Component,
    ElementRef,
    Inject,
    OnInit,
    ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AuthService } from '@services/auth/auth.service';
import { SnackBar } from 'app/core/utils/snackBar';
import { map, Observable, startWith } from 'rxjs';
import { ExternalProjectService } from '../common/services/external-project.service';
import { AddFormService } from '@services/add-form.service';
import { DatePipe } from '@angular/common';
import { ExtendEndDateReasonDialogComponent } from '../extend-end-date-reason-dialog/extend-end-date-reason-dialog.component';

@Component({
    selector: 'app-create-external-project',
    templateUrl: './create-external-project.component.html',
    styleUrls: ['./create-external-project.component.scss'],
})
export class CreateExternalProjectComponent implements OnInit {
    @ViewChild('technologyInput')
    technologyInput!: ElementRef;

    technologies: string[] = this.data?.projectModel?.technology || [];
    isLoading = false;
    submitInProcess : boolean = false;
    mode: 'create' | 'update' = 'create';
    loggedInUser: any;
    projectModel = this.data?.projectModel;
    clientModels = this.data?.clientModels;
    projectForm: FormGroup;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    addOnBlur = false;
    selectable = true;
    removable = true;
    editProjectEndDateReason: string = '';
    prevDate: any;
    newDate: any;
    technologys: any = this.data?.projectModel?.technology || [];
    filteredTechnologies: Observable<any[]> | undefined;
    alltechnologys: any[] = this.data?.technologies;
    selectFomList: any = [];

    get clients() {
        return this.projectForm?.get('clients') as FormArray;
    }

    constructor(
        public dialogRef: MatDialogRef<CreateExternalProjectComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private snackBarService: SnackBar,
        private authService: AuthService,
        private externalProjectService: ExternalProjectService,
        private formService: AddFormService,
        private datePipe: DatePipe,
        private dialog: MatDialog,
    ) {}

    ngOnInit(): void {
        this.loggedInUser = this.authService.getUser();
        this.setMode();
        this.initializeForm();
        this.getFormList();
    }

    setMode() {
        this.mode = this.projectModel?.id ? 'update' : 'create';
    }

    addTech(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;
        // Add our technology

        if (input) {
            input.value = '';
        }
        this.projectForm.get('technology')?.setValue('');
    }

    remove(technology: any, selectIndex: any): void {
        this.technologys.splice(selectIndex, 1);
        this.projectForm.get('technology')?.setValue('');
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        const isAlreadyExist =
            this.technologys?.filter(
                (item) =>
                    item?.toLowerCase() ===
                    event?.option?.value?.name.toLowerCase()
            )?.length > 0;
        if (isAlreadyExist) {
            return;
        }

        this.technologys.push(event?.option?.value?.name);
        this.technologyInput.nativeElement.value = '';
        this.projectForm.get('technology')?.setValue('');
    }


    getFormList() {
        this.isLoading = true;
        this.formService
            .getFormListWithoutPagination()
            .subscribe((res: any) => {
                this.selectFomList = res?.data;
                this.isLoading = false;
            });
    }


    getTodayDate(): string {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        return dd + '-' + mm + '-' + yyyy;
    }

    addReasonForProjectEndDate(event :any){
        this.newDate = this.datePipe.transform(
            event?.target?.value,
            'dd-MM-yyyy'
        );
        if (this.prevDate === this.newDate) {
            this.editProjectEndDateReason = '';
        }
        else if(this.newDate !== this.prevDate){
            const dialogRef = this.dialog.open(
                ExtendEndDateReasonDialogComponent,
                {
                    disableClose: true,
                    width: '40%',
                    panelClass: 'warn-dialog-content',
                    autoFocus: false,
                    data: {
                        prevEndDate: this.prevDate,
                        newEndDate: this.newDate,
                        prefiledReason: this.editProjectEndDateReason,
                    },
                }
            );
            dialogRef.afterClosed().subscribe((result: any) => {
                if (result) {
                    this.editProjectEndDateReason = result?.reason;
                }
            });
        }
    }

    updateReasonForProjectEndDate(){
        if (this.prevDate === this.newDate) {
            this.editProjectEndDateReason = '';
        }else if(this.newDate !== this.prevDate){
            const dialogRef = this.dialog.open(
                ExtendEndDateReasonDialogComponent,
                {
                    disableClose: true,
                    width: '40%',
                    panelClass: 'warn-dialog-content',
                    autoFocus: false,
                    data: {
                        prevEndDate: this.prevDate,
                        newEndDate: this.newDate,
                        prefiledReason: this.editProjectEndDateReason,
                    },
                }
            );
            dialogRef.afterClosed().subscribe((result: any) => {
                if (result) {
                    this.editProjectEndDateReason = result?.reason;
                }
            });
        }
    }

    initializeForm() {
        this.projectForm = this.fb.group({
            id: this.fb.control(this.projectModel?.id || null),
            name: this.fb.control(this.projectModel?.name || null, [
                Validators.required,
            ]),
            startDate : this.fb.control(this.projectModel?.startDate || null, [Validators.required]),
            endDate : this.fb.control(this.projectModel?.endDate || null,[Validators.required]),
            description: this.fb.control(
                this.projectModel?.description || null
            ),
            technology: [''],
            formId: this.fb.control(
                this.projectModel?.formId ? this.projectModel?.formId : ''
            ),
            clients: this.getClientsControl(),
            addedBy: this.loggedInUser?.userId,
        });

        this.prevDate =this.datePipe.transform(
            this.projectModel?.endDate,
            'dd-MM-yyyy'
        );

        this.filteredTechnologies = this.projectForm
            .get('technology')
            ?.valueChanges.pipe(
                startWith(''),
                map((technology: any | null) =>
                    technology ? this._filter(technology) : this._filterslice()
                )
            );
    }

    _filter(value: any) {
        return this.alltechnologys.filter(
            (alltechnologys: any) =>
                alltechnologys.name.toLowerCase().indexOf(value) === 0
        );
    }
    _filterslice() {
        return this.alltechnologys.filter(
            (alltechnologys) => !this.technologys.includes(alltechnologys.name)
        );
    }

    getClientsControl(): FormArray {
        if (this.mode === 'create') {
            return this.fb.array([this.getClientSingleControl(null)]);
        } else {
            return this.fb.array(
                this.clientModels?.map((client) =>
                    this.getClientSingleControl(client)
                )
            );
        }
    }
    getClientSingleControl(client): FormGroup {
        const control = this.fb.group({
            firstName: this.fb.control(client?.firstName || null, [
                Validators.required,
            ]),
            lastName: this.fb.control(client?.lastName || null, [
                Validators.required,
            ]),
            emailId: this.fb.control(client?.emailId || null, [
                Validators.email,
            ]),
            deleted: this.fb.control(false),
        });

        if (client?.id) {
            control.addControl('id', this.fb.control(client?.id));
        }

        return control;
    }
    addTechnology($event: MatChipInputEvent) {
        this.technologies.push($event?.value?.trim());
        $event.chipInput!.clear();
        this.projectForm?.get('technology')?.reset();
    }

    removeTechnology(index: number) {
        this.technologies.splice(index, 1);
    }

    addNewClient() {
        this.clients.push(this.getClientSingleControl(null));
    }

    removeClient(index: number) {
        const clientControl = this.clients.at(index);

        if (clientControl?.value?.id) {
            clientControl?.get('deleted').setValue(true);
        } else {
            this.clients.removeAt(index);
        }
    }

    add() {
        const formValue = this.projectForm?.value;
        formValue.technology = this.technologys;
        formValue.extendedReason = this.editProjectEndDateReason;
        if (this.projectForm?.valid) {
            if (this.mode === 'create') {
                delete formValue.id;
            }
            console.log("formValue : ", formValue);
            this.callCreateUpdateApi(formValue);
        } else {
            this.projectForm.markAllAsTouched();
        }
    }

    private callCreateUpdateApi(requestBody: any) {
        this.submitInProcess = true;
        this.externalProjectService.create(requestBody).subscribe((result) => {
            this.submitInProcess = false;
            this.snackBarService.successSnackBar(result?.message);
            if (!result?.error) {
                this.dialogRef.close(result);
            }
        });
    }

    cancel() {
        this.dialogRef.close();
    }
}
