import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WorkLogService } from '@modules/admin/project/project-widget/common/services/work-log.service';
import { AuthService } from '@services/auth/auth.service';
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
    currentDate: any = new Date();
    minDate: any = '2023-07-07';
    workLogEditValidation: boolean = false;
    disablePreviousWorklog: boolean = false;
    minDateWorklog: any;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<AddEditWorkLogComponent>,
        private formBuilder: FormBuilder,
        private snackBar: SnackBar,
        private workLogService: WorkLogService,
        private datePipe: DatePipe,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.initializeForm();
        this.patchValueInEditMode();
        this.dateValidation();
    }

    close() {
        this.matDialogRef.close();
    }

    submit() {
        if (this.data?.mode === 'ADD' && this.onLeave === false) {
            this.addTask();
        }
        if (
            this.tasks?.length === 0 &&
            this.onLeave === false &&
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
            this.workLogForm?.get('totalHours')?.setValue('0');
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
            (sum, item) => sum + Number(item?.worklogPerTask?.timeSpent),
            0
        );
    }

    addTask() {
        if (!this.description  && !this.currentDescriptionValue && this.onLeave) {
            this.snackBar.errorSnackBar('Please add description');
            return;
        }
        if (!this.workLogForm?.get('totalHours')?.value && this.onLeave) {
            this.snackBar.errorSnackBar('Please add Hours');
            return;
        }
        if (this.workLogForm?.invalid && !this.onLeave) {
            this.snackBar.errorSnackBar('Please enter valid hours');
            return;
        }
        const workLogDate = new Date(
            this.workLogForm?.get('workLogDate')?.value
        );
        workLogDate.setHours(5);
        workLogDate.setMinutes(30);
        const task = {
            resourceId: this.data?.loggedInUser?.resourceId,
            projectId: this.data?.projectId,
            workLogDate: workLogDate,
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

    private dateValidation() {
        if (new Date().getDate() > 5) {
            this.minDateWorklog = new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                1
            );
        } else {
            var date = new Date();
            var month = date.getMonth() > 0 ? date.getMonth() - 1 : 11;
            this.minDateWorklog = new Date(date.getFullYear(), month, 1);
        }
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
            this.description = this.data?.data?.comment;
            this.workLogForm
                ?.get('totalHours')
                ?.setValue(this.data?.data?.timeSpent);
            this.workLogForm
                ?.get('workLogDate')
                ?.setValue(
                    this.datePipe.transform(
                        this.data?.data?.workLogDate,
                        "yyyy-MM-dd'T'HH:mm:ss.SSS'Z"
                    )
                );
            this.workLogForm?.get('workLogDate')?.disable();
            this.currentDate = this.data?.data?.workLogDate;
            if (this.data?.tabIndex !== new Date().getMonth()) {
                if (
                    new Date().getDate() > 5 ||
                    this.data?.tabIndex < new Date().getMonth() - 1
                ) {
                    this.workLogForm?.get('totalHours')?.disable();
                    this.disablePreviousWorklog = true;
                } else {
                    this.disablePreviousWorklog = false;
                }
            } else {
                this.disablePreviousWorklog = false;
            }
        }
        if (this.data?.data?.onLeave) {
            this.workLogForm?.get('totalHours')?.disable();
            this.workLogForm?.get('totalHours')?.setValue('');
            this.description = '';
            this.tasks = [];
            this.showError = false;
            this.onLeave = this.data?.data?.onLeave;
        }
    }

    private handleSubmitResponse() {
        const payload = this.getSaveWorkLogsPayload();
        if (this.data?.mode === 'EDIT') {
            if (this.onLeave && !this.description && !this.currentDescriptionValue) {
                this.snackBar.errorSnackBar('Please add description');
                return;
            }
            if (!this.workLogForm?.get('totalHours')?.value && this.onLeave) {
                this.snackBar.errorSnackBar('Please add Hours');
                return;
            }
        }
        if (this.workLogForm?.invalid && !this.onLeave) {
            this.snackBar.errorSnackBar('Please enter valid hours');
            return;
        }
        this.submitInProgress = true;
        this.workLogService.saveWorkLogs(payload)?.subscribe(
            (res: any) => {
                this.submitInProgress = false;
                if (!res?.error) {
                    this.snackBar.successSnackBar(res?.message);
                    this.matDialogRef.close(true);
                } else {
                    this.snackBar.errorSnackBar(res?.message);
                }
                if (res?.tokenExpire) {
                    this.authService.updateAndReload(window.location);
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
        const workLogDate = new Date(
            this.workLogForm?.get('workLogDate')?.value
        );
        workLogDate.setHours(5);
        workLogDate.setMinutes(30);

        if (this.data?.mode === 'EDIT') {
            return {
                externalWorklog: [
                    {
                        id: this.data?.data?.id,
                        resourceId: this.data?.loggedInUser?.resourceId,
                        projectId: this.data?.projectId,
                        workLogDate: workLogDate,
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
                        resourceId: this.data?.loggedInUser?.resourceId,
                        projectId: this.data?.projectId,
                        workLogDate: workLogDate,
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
            totalHours: [
                '',
                [
                    Validators.max(24),
                    Validators.required,
                    Validators.pattern(/^\d+(\.\d+)?$/),
                ],
            ],
            workLogDate: [new Date()],
        });
    }
}
