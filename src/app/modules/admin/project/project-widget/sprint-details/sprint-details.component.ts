import {
    Component,
    ElementRef,
    Input,
    QueryList,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateProjecteService } from '@services/create-projecte.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@services/auth/auth.service';
import { SendFeedbackFormComponent } from '../../send-feedback-form/send-feedback-form.component';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
    selector: 'app-sprint-details',
    templateUrl: './sprint-details.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class SprintDetailsComponent implements OnInit {
    sprint_name = 'This is a Sprint name';
    project_status = 'On Track';
    project_progres = 45;
    @Input() dataType: any;
    qulitychare = ['defectLeakage', 'qualityPercentage'];
    routeSubscribe: any;
    sprintId = 0;
    projectId = 0;
    configForm!: FormGroup;
    initialLoading = false;
    @Input() dataId: any;
    @Input() data: any = {};
    isLoading = false;
    projectData: any = null;
    formData: any = null;
    constructor(
        private router: Router,
        private dialog: MatDialog,
        private _route: ActivatedRoute,
        private _formBuilder: FormBuilder,
        private _authService: AuthService,
        private _fuseConfirmationService: FuseConfirmationService,
        private ProjectService: CreateProjecteService
    ) {}

    ngOnInit(): void {
        this.initializeConfigForm();
        this.routeSubscribe = this._route.params.subscribe((sprintId) => {
            if (sprintId['sprintId']) {
                this.sprintId = sprintId['sprintId'];
                this.sprint_name = sprintId['name'];
            }
            this.projectId = sprintId['id'];
        });
        this.projectData = this._authService.getProjectDetails();
        this.formData = this.projectData.form;
    }
    goBack() {
        window.history.back();
    }

    feedbackForm() {
        const dialogRef = this.dialog.open(SendFeedbackFormComponent, {
            disableClose: true,
            panelClass: 'warn-dialog-content',
            autoFocus: false,
            data: {
                id: this.sprintId,
                sprintName: this.sprint_name,
            },
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result?.result == 'success') {
            }
        });
    }

    attachForm() {
        this.router.navigate([`/forms`]);
    }

    markAsComplete(){
        const dialogRef = this._fuseConfirmationService.open(
            this.configForm.value
        );

        dialogRef.afterClosed().subscribe((result) => {
            if (result == 'confirmed') {
               
            }
        });
    }

    private initializeConfigForm() {
        this.configForm = this._formBuilder.group({
            title: 'Mark as Complete',
            message:
                'Are you sure you want to mark this sprint as completed ? <br/> <span class="font-medium">This action will trigger the mail to the admin.</span>',
            icon: this._formBuilder.group({
                show: true,
                name: 'heroicons_outline:exclamation',
                color: 'primary',
            }),
            actions: this._formBuilder.group({
                confirm: this._formBuilder.group({
                    show: true,
                    label: 'Yes',
                    color: 'primary',
                }),
                cancel: this._formBuilder.group({
                    show: true,
                    label: 'No',
                }),
            }),
            dismissible: false,
        });
    }
}
