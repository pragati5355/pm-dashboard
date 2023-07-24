import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
    Component,
    ElementRef,
    Inject,
    OnInit,
    ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
    MatAutocomplete,
    MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { SnackBar } from 'app/core/utils/snackBar';
import { map, Observable, startWith } from 'rxjs';
import { NameResumeVersionComponent } from '../name-resume-version/name-resume-version.component';

@Component({
    selector: 'app-create-resume',
    templateUrl: './create-resume.component.html',
    styleUrls: ['./create-resume.component.scss'],
})
export class CreateResumeComponent implements OnInit {
    @ViewChild('projectInput', { static: false })
    projectInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

    resumeForm: FormGroup;
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    projectCtrl = new FormControl();
    filteredProjects: Observable<string[]>;
    projects: string[] = [];
    allProjects: string[] = [
        'Metrics',
        'FoxnFork',
        '3prong',
        'Turtle health',
        'Crew',
    ];
    projectsOnProfile: string[] = [
        'Metrics',
        'Foxnfork',
        'Crew',
        'Test project asdadasdadaddasdasdsadadas',
        'Metrics',
        'Foxnfork',
        'Crew',
        'Test project asdadasdadaddasdasdsadadas',
        'Metrics',
        'Foxnfork',
        'Crew',
        'Test project asdadasdadaddasdasdsadadas',
        'Metrics',
        'Foxnfork',
        'Crew',
        'Test project asdadasdadaddasdasdsadadas',
        'Metrics',
        'Foxnfork',
        'Crew',
        'Test project asdadasdadaddasdasdsadadas',
    ];
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private matDialogRef: MatDialogRef<CreateResumeComponent>,
        private dialog: MatDialog,
        private snackBar: SnackBar
    ) {}

    ngOnInit(): void {
        this.resumeForm = this.formBuilder.group({
            designation: [true],
            technology: [true],
            skillIntegrations: [true],
            projects: [true],
            education: [true],
            experience: [true],
        });
        this.filteredProjects = this.projectCtrl.valueChanges.pipe(
            startWith(null),
            map((fruit: string | null) =>
                fruit ? this._filter(fruit) : this.allProjects.slice()
            )
        );
    }
    cancel() {
        this.matDialogRef.close();
    }

    add(event: MatChipInputEvent): void {
        if (!this.matAutocomplete.isOpen) {
            const input = event.input;
            const value = event.value;

            if ((value || '').trim()) {
                this.projects.push(value.trim());
            }

            if (input) {
                input.value = '';
            }

            this.projectCtrl.setValue(null);
        }
    }

    remove(fruit: string): void {
        const index = this.projects.indexOf(fruit);

        if (index >= 0) {
            this.projects.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        const alreadyExists = this.projects?.filter(
            (item) => item === event.option.viewValue
        );
        if (alreadyExists?.length === 0) {
            this.projects.push(event.option.viewValue);
        }
        this.projectInput.nativeElement.value = '';
        this.projectCtrl.setValue(null);
    }

    submit() {
        if (
            this.resumeForm?.get('projects')?.value &&
            this.projects?.length === 0
        ) {
            this.snackBar.errorSnackBar('Please select projects');
        } else {
            this.matDialogRef.close();
            this.nameResumeVersionDialog();
        }
    }

    nameResumeVersionDialog() {
        const resumeVersionDialogRef = this.dialog.open(
            NameResumeVersionComponent,
            {
                disableClose: true,
                width: '40%',
                panelClass: 'warn-dialog-content',
                autoFocus: false,
                data: {
                    formValues: this.resumeForm?.value,
                    projects: this.projects,
                },
            }
        );
        resumeVersionDialogRef.afterClosed().subscribe((result: any) => {
            if (result == 'success') {
            }
        });
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.allProjects.filter(
            (fruit) => fruit.toLowerCase().indexOf(filterValue) === 0
        );
    }
}
