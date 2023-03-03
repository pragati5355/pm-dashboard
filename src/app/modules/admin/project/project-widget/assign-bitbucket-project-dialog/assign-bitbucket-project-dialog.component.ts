import { Component, Inject, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BitbucketProjectModel } from '@modules/admin/repository/common/models/bitbucket-project.model';
import { BitbucketProjectService } from '@modules/admin/repository/common/services/bitbucket-project.service';
import { SnackBar } from 'app/core/utils/snackBar';
import { map, Observable, startWith } from 'rxjs';

function autocompleteObjectValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (typeof control.value === 'string') {
            return { invalidAutocompleteObject: { value: control.value } };
        }
        return null;
    };
}

@Component({
    selector: 'app-assign-bitbucket-project-dialog',
    templateUrl: './assign-bitbucket-project-dialog.component.html',
    styleUrls: ['./assign-bitbucket-project-dialog.component.scss'],
})
export class AssignBitbucketProjectDialogComponent implements OnInit {
    projectType: 'new' | 'existing' = 'existing';
    allBitbucketProjects: BitbucketProjectModel[] =
        this.data?.allBitbucketProjects;
    filteredBitbucketProjectOptions: Observable<BitbucketProjectModel[]> | any;
    projectNameFormControl: FormControl;
    mProjectId = this.data?.projectId;
    mProjectName = this.data?.projectName;
    isAssigningProject = false;

    constructor(
        public dialogRef: MatDialogRef<AssignBitbucketProjectDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private bitbucketProjectService: BitbucketProjectService,
        private snackBarService: SnackBar,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.initializeDefaultControl();
    }

    projectTypeChanged() {
        if (this.projectType === 'new') {
            this.initializeControlForNewProject();
        } else {
            this.initializeDefaultControl();
        }
    }

    displayProjectNameFn(bitbucketProject: any) {
        if (typeof bitbucketProject == 'object') {
            return bitbucketProject ? bitbucketProject.name : undefined;
        }
    }

    save() {
        this.isAssigningProject = true;
        const payload = this.getAssignPayload();
        this.bitbucketProjectService.assign(payload).subscribe((res) => {
            this.isAssigningProject = false;
            this.snackBarService.successSnackBar(res?.message);
            if (!res?.error) {
                this.dialogRef.close(res);
            }
        });
    }

    private getAssignPayload() {
        const payload = {
            id: this.mProjectId,
            name: null,
            uuid: null,
            key: null,
        };
        this.extractDataFromFormValue(payload);
        return payload;
    }

    private extractDataFromFormValue(payload: {
        id: any;
        name: any;
        uuid: any;
        key: any;
    }) {
        if (typeof this.projectNameFormControl?.value === 'string') {
            payload.name = this.projectNameFormControl?.value;
            payload.key = this.projectNameFormControl?.value
                .split(' ')
                .join('_')
                .toUpperCase();
        } else {
            payload.name = this.projectNameFormControl?.value?.name;
            payload.uuid = this.projectNameFormControl?.value?.uuid;
            payload.key = this.projectNameFormControl?.value?.key;
        }
    }

    private initializeDefaultControl() {
        this.projectNameFormControl = new FormControl('', {
            validators: [autocompleteObjectValidator(), Validators.required],
        });
        this.addFilterOnProjects();
    }

    private initializeControlForNewProject() {
        this.projectNameFormControl = new FormControl(this.mProjectName, {
            validators: [Validators.required],
        });
    }

    private filterProjectByName(projectName: string): BitbucketProjectModel[] {
        return this.allBitbucketProjects.filter((option) =>
            option.name.toLowerCase().includes(projectName)
        );
    }

    private addFilterOnProjects() {
        this.filteredBitbucketProjectOptions =
            this.projectNameFormControl.valueChanges.pipe(
                map((value) =>
                    typeof value === 'string'
                        ? value.trim().toLowerCase()
                        : value.name.toLowerCase()
                ),
                map((projectName) =>
                    projectName
                        ? this.filterProjectByName(projectName)
                        : this.allBitbucketProjects.slice()
                )
            );
    }
}
