import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkLogsService } from '@modules/public/services/work-logs.service';
import { SnackBar } from 'app/core/utils/snackBar';

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
    onHoliday : boolean = false;
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
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private workLogsService: WorkLogsService,
        private snackBar: SnackBar,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.setTokenSubscription();
        this.loadData();
        this.initializeForm();
    }

    submit(){
        if(this.onLeave === false && this.onHoliday === false){
            this.addTask();
        }
    
        if (this.tasks?.length === 0 && !this.onLeave && !this.onHoliday) {
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
            this.onHoliday = false;
            this.tasks = [];
            this.showError = false;
        } else {
            this.workLogForm?.get('totalHours')?.enable();
        }
    }

    checkBoxHoliday(value: boolean) {
        this.onHoliday = value;
        if (value) {
            this.workLogForm?.get('totalHours')?.disable();
            this.workLogForm?.get('totalHours')?.setValue('');
            this.editor.quillEditor.deleteText(0, 20000);
            this.description = '';
            this.onLeave = false;
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
            (sum, item) => (sum = sum + Number(item?.timeSpent)),
            0
        );
    }

    addTask() {
        if (!this.description  && !this.currentDescriptionValue && this.onLeave && this.onHoliday) {
            this.snackBar.errorSnackBar('Please add description');
            return;
        }
        if (!this.workLogForm?.get('totalHours')?.value && this.onLeave && this.onHoliday) {
            this.snackBar.errorSnackBar('Please add Hours');
            return;
        }

        const task = {
            description: this.currentDescriptionValue,
            timeSpent: this.workLogForm?.get('totalHours')?.value,
            comment: this.description,
        };

        if (this.currentTaskIndex !== null) {
            this.tasks?.splice(this.currentTaskIndex, 1, task);
        } else if(task?.timeSpent !== '' && task?.comment !== '') {
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

        if (this.onLeave) {
            payload.externalWorklog.worklogPerTasks = [
                {
                    onLeave: true,
                    timeSpent: '0',
                    comment: null,
                },
            ];
        }

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

    private setTokenSubscription() {
        this.route.paramMap.subscribe((paramMap) => {
            const token = paramMap.get('id');
            if (token) {
                this.pathToken = token;
            }
        });
    }

    private loadData() {
        this.initialLoading = true;
        const payload = {
            token: this.pathToken,
            verifies: true,
        };
        this.workLogsService?.saveAndGetWorkLogsData(payload)?.subscribe(
            (res: any) => {
                this.initialLoading = false;
                if (!res?.data?.expired) {
                    this.resourceData = res?.data;
                } 
                else {
                    this.router.navigate(['/wrong-url']);
                }
            },
            (err) => {
                this.initialLoading = false;
                this.snackBar?.errorSnackBar('Something went wrong');
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
                worklogPerTasks: tasks,
                onLeave: this.onLeave,
                onHoliday : this.onHoliday,
            },
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
        });
    }
}
