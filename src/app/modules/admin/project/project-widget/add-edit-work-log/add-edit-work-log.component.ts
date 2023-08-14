import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBar } from 'app/core/utils/snackBar';
import { WorkLogService } from '../common/services/work-log.service';

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
    currentDate: any = new Date();
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<AddEditWorkLogComponent>,
        private formBuilder: FormBuilder,
        private snackBar: SnackBar,
        private workLogService: WorkLogService
    ) {}

    ngOnInit(): void {
        this.initializeForm();
        this.patchValueInEditMode();
        console.log(this.data?.data?.onLeave);
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
        this.quillValue = task?.worklogPerTask?.comment;
        this.workLogForm
            ?.get('totalHours')
            ?.setValue(task?.worklogPerTask?.timeSpent);
        this.calculateTotalHours();
        this.editMode = true;
    }

    calculateTotalHours() {
        this.totalHours = this.tasks?.reduce(
            (sum, item) => sum + item?.worklogPerTask?.timeSpent,
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
            resourceId: this.data?.userState?.userId,
            projectId: this.data?.projectId,
            workLogDate: this.currentDate,
            worklogPerTask: {
                timeSpent: this.workLogForm?.get('totalHours')?.value,
                comment: this.description,
            },
            description: this.currentDescriptionValue,
        };

        this.scrollToBottom();

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

    private scrollToBottom() {
        const element = document.getElementById('focusBtn');
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest',
        });
    }

    private patchValueInEditMode() {
        if (this.data?.mode === 'EDIT') {
            this.quillValue = this.data?.data?.comment;
            this.workLogForm
                ?.get('totalHours')
                ?.setValue(this.data?.data?.timeSpent);
            this.currentDate = this.data?.data?.createdAt;
        }
        if (this.data?.data?.onLeave) {
            this.workLogForm?.get('totalHours')?.disable();
            this.workLogForm?.get('totalHours')?.setValue('');
            // this.editor.quillEditor.deleteText(0, 20000);
            this.description = '';
            this.tasks = [];
            this.showError = false;
            this.onLeave = this.data?.data?.onLeave;
        }
    }

    private handleSubmitResponse() {
        this.submitInProgress = true;
        const payload = this.getSaveWorkLogsPayload();
        this.workLogService.saveWorkLogs(payload)?.subscribe(
            (res: any) => {
                this.submitInProgress = false;
                if (!res?.error) {
                    this.snackBar.successSnackBar(res?.message);
                    this.matDialogRef.close(true);
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
        if (this.data?.mode === 'EDIT') {
            return {
                externalWorklog: [
                    {
                        id: this.data?.data?.id,
                        resourceId: this.data?.userState?.userId,
                        projectId: this.data?.projectId,
                        workLogDate: this.currentDate,
                        worklogPerTask: {
                            timeSpent:
                                this.workLogForm?.get('totalHours')?.value,
                            comment: this.description,
                        },
                        onLeave: this.onLeave,
                    },
                ],
            };
        }
        if (this.onLeave && this.data?.mode === 'ADD') {
            return {
                externalWorklog: [
                    {
                        resourceId: this.data?.userState?.userId,
                        projectId: this.data?.projectId,
                        workLogDate: this.currentDate,
                        worklogPerTask: {
                            timeSpent: 0,
                            comment: '',
                        },
                        onLeave: this.onLeave,
                    },
                ],
            };
        }
        return {
            externalWorklog: tasks,
        };
    }

    private initializeForm() {
        this.workLogForm = this.formBuilder.group({
            totalHours: [''],
            workLogDate: [''],
        });
    }
}
