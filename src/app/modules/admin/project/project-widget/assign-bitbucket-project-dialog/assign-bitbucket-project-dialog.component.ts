import { Component, Inject, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BitbucketProjectModel } from '@modules/admin/repository/common/models/bitbucket-project.model';
import { BitbucketProjectService } from '@modules/admin/repository/common/services/bitbucket-project.service';
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
    allBitbucketProjects = [];
    filteredBitbucketProjectOptions: Observable<BitbucketProjectModel[]> | any;
    projectNameFormControl: FormControl;
    mProjectId = this.data?.projectId;
    mProjectName = this.data?.projectName;

    constructor(
        public dialogRef: MatDialogRef<AssignBitbucketProjectDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private bitbucketProjectService: BitbucketProjectService
    ) {}

    ngOnInit(): void {
        this.initializeDefaultControl();
        this.getBitbucketProjectList();
    }

    projectTypeChanged() {
        if (this.projectType === 'new') {
            this.initializeControlForNewProject();
        } else {
            this.initializeDefaultControl();
        }
    }

    getBitbucketProjectList() {
        this.bitbucketProjectService.findAll().subscribe((response) => {
            this.allBitbucketProjects = response;
        });
    }

    displayProjectNameFn(bitbucketProject: any) {
        if (typeof bitbucketProject == 'object') {
            return bitbucketProject ? bitbucketProject.projectName : undefined;
        }
    }

    save() {
        console.log(this.mProjectId, this.projectNameFormControl?.value);
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
        return this.allBitbucketProjects.filter(
            (option) =>
                option.projectName
                    .toLowerCase()
                    .indexOf(projectName.toLowerCase()) === 0
        );
    }

    private addFilterOnProjects() {
        this.filteredBitbucketProjectOptions =
            this.projectNameFormControl.valueChanges.pipe(
                startWith(''),
                map((value) =>
                    typeof value === 'string' ? value : value.projectName
                ),
                map((projectName) =>
                    projectName
                        ? this.filterProjectByName(projectName)
                        : this.allBitbucketProjects.slice()
                )
            );
    }
}
