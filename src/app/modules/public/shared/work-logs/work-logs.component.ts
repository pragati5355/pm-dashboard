import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-work-logs',
    templateUrl: './work-logs.component.html',
    styleUrls: ['./work-logs.component.scss'],
})
export class WorkLogsComponent implements OnInit {
    @ViewChild('editor') editor: any;
    workLogForm: FormGroup;
    submitInProgress: boolean = false;
    onLeave: boolean = false;
    showError: boolean = false;
    description: string = '';
    responseSubmitted: boolean = false;
    closingCounter: number;
    initialLoading: boolean = false;
    modules = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
        ],
    };
    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.initializeForm();
    }

    submit() {
        if (
            this.workLogForm?.valid &&
            this.description !== '' &&
            !this.onLeave
        ) {
            this.submitInProgress = true;
            console.log(this.getPayload());
        } else if (
            !this.workLogForm?.valid &&
            this.description === '' &&
            this.onLeave
        ) {
            this.submitInProgress = true;
            console.log(this.getPayload());
        } else {
            this.showError = true;
        }

        setTimeout(() => {
            this.submitInProgress = false;
        }, 3000);
    }

    checkBox(value: boolean) {
        this.onLeave = value;
        if (value) {
            this.workLogForm?.get('totalHours')?.disable();
            this.workLogForm?.get('totalHours')?.setValue('');
            this.editor.quillEditor.deleteText(0, 20000);
            this.description = '';
            this.showError = false;
        } else {
            this.workLogForm?.get('totalHours')?.enable();
        }
    }

    getDescription($event: any) {
        if ($event?.html !== null) {
            this.description = $event?.html;
            this.showError = false;
        } else {
            this.description = '';
            this.showError = true;
        }
    }

    private getPayload() {
        return {
            totalHours: this.workLogForm?.get('totalHours')?.value,
            description: this.description,
            onLeave: this.onLeave,
        };
    }

    private initializeForm() {
        this.workLogForm = this.formBuilder.group({
            totalHours: ['', [Validators.required]],
        });
    }
}
