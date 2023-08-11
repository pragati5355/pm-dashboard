import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkLogsService } from '@modules/public/services/work-logs.service';
import { SnackBar } from 'app/core/utils/snackBar';

@Component({
    selector: 'app-add-edit-work-log',
    templateUrl: './add-edit-work-log.component.html',
    styleUrls: ['./add-edit-work-log.component.scss'],
})
export class AddEditWorkLogComponent implements OnInit {
    @ViewChild('editor') editor: any;
    workLogForm: FormGroup;
    submitInProgress: boolean = false;
    onLeave: boolean = false;
    showError: boolean = false;
    description: string = '';
    responseSubmitted: boolean = false;
    closingCounter: number;
    initialLoading: boolean = false;
    pathToken: string;
    resourceData: any;
    quillValue: any;
    totalHours: number = 0;
    currentTaskIndex: null | number = null;
    modules = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
        ],
    };
    tasks: any[] = [];
    currentDescriptionValue: any;
    editMode: boolean = false;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<AddEditWorkLogComponent>,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private workLogsService: WorkLogsService,
        private snackBar: SnackBar,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.initializeForm();
    }
    close() {
        this.matDialogRef.close();
    }

    submit() {
        if (
            this.tasks?.length === 0 &&
            !this.onLeave &&
            this.data?.mode === 'ADD'
        ) {
            this.snackBar.errorSnackBar('Please add task');
            return;
        } else {
            this.handleSubmitResponse();
        }
    }

    checkBox(value: boolean) {
        this.onLeave = value;
        if (value) {
            this.workLogForm?.get('totalHours')?.disable();
            this.workLogForm?.get('totalHours')?.setValue('');
            this.editor.quillEditor.deleteText(0, 20000);
            this.description = '';
            this.tasks = [];
            this.showError = false;
        } else {
            this.workLogForm?.get('totalHours')?.enable();
        }
    }

    getDescription($event: any) {
        if ($event?.html !== null) {
            this.description = $event?.html;
            this.currentDescriptionValue = $event?.text;
            this.showError = false;
        } else {
            this.description = '';
            this.showError = true;
        }
    }

    removeTask(index: number) {
        this.tasks?.splice(index, 1);
        this.calculateTotalHours();
    }

    editTask(task: any, i: any) {
        this.currentTaskIndex = i;
        this.quillValue = task?.comment;
        this.workLogForm?.get('totalHours')?.setValue(task?.timeSpent);
        this.calculateTotalHours();
        this.editMode = true;
    }

    calculateTotalHours() {
        this.totalHours = this.tasks?.reduce(
            (sum, item) => sum + item?.timeSpent,
            0
        );
    }

    addTask() {
        if (!this.currentDescriptionValue) {
            this.snackBar.errorSnackBar('Add description');
            return;
        }
        if (!this.workLogForm?.get('totalHours')?.value) {
            this.snackBar.errorSnackBar('Add Hours');
            return;
        }
        const task = {
            description: this.currentDescriptionValue,
            timeSpent: this.workLogForm?.get('totalHours')?.value,
            comment: this.description,
        };

        if (this.currentTaskIndex !== null) {
            this.tasks?.splice(this.currentTaskIndex, 1, task);
        } else {
            this.tasks?.push(task);
        }
        this.currentDescriptionValue = '';
        this.workLogForm?.get('totalHours')?.setValue('');
        this.workLogForm?.get('totalHours')?.setErrors(null);
        this.quillValue = '';
        this.showError = false;
        this.calculateTotalHours();
        this.currentTaskIndex = null;
        this.editMode = false;
    }

    private handleSubmitResponse() {
        this.submitInProgress = true;
        const payload = this.getSaveWorkLogsPayload();
        this.workLogsService.saveAndGetWorkLogsData(payload)?.subscribe(
            (res: any) => {
                this.submitInProgress = false;
                if (!res?.error && res?.message === 'Success') {
                    this.responseSubmitted = true;
                } else {
                    this.snackBar.errorSnackBar('Something went wrong');
                }
            },
            (err) => {
                this.submitInProgress = false;
                this.snackBar.errorSnackBar('Something went wrong');
            }
        );
    }

    private getSaveWorkLogsPayload() {
        const tasks = this.tasks?.map(({ description, ...item }) => item);
        return {
            token: this.pathToken,
            verifies: false,
            externalWorklog: {
                resourceId: this.resourceData?.resourceId,
                projectId: this.resourceData?.projectId,
                workLogDate: this.resourceData?.workLogDate,
                worklogPerTask: tasks,
            },
            onLeave: this.onLeave,
        };
    }

    private initializeForm() {
        this.workLogForm = this.formBuilder.group({
            totalHours: [''],
        });
    }
}
