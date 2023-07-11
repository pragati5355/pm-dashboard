import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { WorkLogsService } from '@modules/public/services/work-logs.service';

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
    pathToken: string;
    resourceData: any;
    modules = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
        ],
    };
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private workLogsService: WorkLogsService
    ) {}

    ngOnInit(): void {
        this.setTokenSubscription();
        this.loadData();
        this.initializeForm();
    }

    submit() {
        if (
            this.workLogForm?.valid &&
            this.description !== '' &&
            !this.onLeave
        ) {
            this.submitInProgress = true;
            console.log(this.getSaveWorkLogsPayload());
        } else if (
            !this.workLogForm?.valid &&
            this.description === '' &&
            this.onLeave
        ) {
            this.submitInProgress = true;
            console.log(this.getSaveWorkLogsPayload());
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

    private setTokenSubscription() {
        this.route.paramMap.subscribe((paramMap) => {
            const token = paramMap.get('id');
            if (token) {
                this.pathToken = token;
            }
        });
    }

    private loadData() {
        const payload = {
            token: this.pathToken,
            verifies: true,
        };
        this.workLogsService
            ?.saveAndGetWorkLogsData(payload)
            ?.subscribe((res: any) => {
                if (res) {
                    this.resourceData = res?.data;
                }
            });
    }

    private getSaveWorkLogsPayload() {
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
