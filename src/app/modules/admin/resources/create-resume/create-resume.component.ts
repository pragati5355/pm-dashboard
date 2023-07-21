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
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';

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
        private matDialogRef: MatDialogRef<CreateResumeComponent>
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
        console.log(this.resumeForm?.value);
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.allProjects.filter(
            (fruit) => fruit.toLowerCase().indexOf(filterValue) === 0
        );
    }
}
