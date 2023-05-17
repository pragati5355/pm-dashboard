import { ENTER, COMMA, I, DELETE } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '@services/auth/auth.service';
import { SnackBar } from 'app/core/utils/snackBar';
import { result } from 'lodash';
import { ExternalProjectService } from '../common/services/external-project.service';

@Component({
    selector: 'app-create-external-project',
    templateUrl: './create-external-project.component.html',
    styleUrls: ['./create-external-project.component.scss'],
})
export class CreateExternalProjectComponent implements OnInit {
    technologies: string[] = this.data?.projectModel?.technology || [];

    isLoading = false;
    mode: 'create' | 'update' = 'create';
    loggedInUser: any;
    projectModel = this.data?.projectModel;
    clientModels = this.data?.clientModels;
    projectForm: FormGroup;
    separatorKeysCodes: number[] = [ENTER, COMMA];

    get clients() {
        return this.projectForm?.get('clients') as FormArray;
    }

    constructor(
        public dialogRef: MatDialogRef<CreateExternalProjectComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private snackBarService: SnackBar,
        private authService: AuthService,
        private externalProjectService: ExternalProjectService
    ) {}

    ngOnInit(): void {
        this.loggedInUser = this.authService.getUser();
        this.setMode();
        this.initializeForm();
    }

    setMode() {
        this.mode = this.projectModel?.id ? 'update' : 'create';
    }

    initializeForm() {
        this.projectForm = this.fb.group({
            id: this.fb.control(this.projectModel?.id || null),
            name: this.fb.control(this.projectModel?.name || null, [
                Validators.required,
            ]),
            description: this.fb.control(
                this.projectModel?.description || null
            ),
            technology: this.fb.control(null),
            clients: this.getClientsControl(),
            addedBy: this.loggedInUser?.userId,
        });
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
                Validators.required,
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
        console.log(clientControl?.value);

        if (clientControl?.value?.id) {
            clientControl?.get('deleted').setValue(true);
        } else {
            this.clients.removeAt(index);
        }
    }

    add() {
        const formValue = this.projectForm?.value;
        formValue.technology = this.technologies;
        if (this.projectForm?.valid) {
            if (this.mode === 'create') {
                delete formValue.id;
            }
            this.callCreateUpdateApi(formValue);
        } else {
            this.projectForm.markAllAsTouched();
        }
    }

    private callCreateUpdateApi(requestBody: any) {
        this.isLoading = true;
        this.externalProjectService.create(requestBody).subscribe((result) => {
            this.isLoading = false;
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
