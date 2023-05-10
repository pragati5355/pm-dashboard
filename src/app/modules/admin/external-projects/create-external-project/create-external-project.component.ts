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
    technologies: string[] = [];

    isLoading = false;
    mode: 'create' | 'update' = 'create';
    loggedInUser: any;
    projectModel = this.data?.projectModel;
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
            technologies: this.fb.control(null),
            clients: this.getClientsControl(),
            addedBy: this.loggedInUser?.userId,
        });
    }
    getClientsControl(): FormArray {
        if (this.mode === 'create') {
            return this.fb.array([this.getEmptyClientControl()]);
        } else {
            return this.fb.array([]);
        }
    }
    getEmptyClientControl(): FormGroup {
        return this.fb.group({
            firstName: this.fb.control(null, [Validators.required]),
            lastName: this.fb.control(null, [Validators.required]),
            emailId: this.fb.control(null, [
                Validators.required,
                Validators.email,
            ]),
            deleted: this.fb.control(false),
        });
    }
    addTechnology($event: MatChipInputEvent) {
        this.technologies.push($event?.value?.trim());
        $event.chipInput!.clear();
        this.projectForm?.get('technologies')?.reset();
    }

    removeTechnology(index: number) {
        this.technologies.splice(index, 1);
    }

    addNewClient() {
        this.clients.push(this.getEmptyClientControl());
    }

    removeClient(index: number) {
        const clientControl = this.clients.at(index)?.get('deleted');
        if (clientControl?.value?.id) {
            clientControl?.setValue(true);
        } else {
            this.clients.removeAt(index);
        }
    }

    add() {
        const formValue = this.projectForm?.value;
        formValue.technologies = this.technologies;
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
        this.externalProjectService.create(requestBody).subscribe((result) => {
            console.log(result);
        });
    }

    cancel() {
        this.dialogRef.close();
    }
}
