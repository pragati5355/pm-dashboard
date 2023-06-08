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
import { SprintService } from '../../common/services/sprint.service';
import { SnackBar } from 'app/core/utils/snackBar';
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
    disableButton : boolean = false;
    projectData: any = null;
    formData: any = null;
    sprint: any;
    constructor(
        private router: Router,
        private dialog: MatDialog,
        private _route: ActivatedRoute,
        private snackBar: SnackBar,
        private _formBuilder: FormBuilder,
        private _authService: AuthService,
        private _fuseConfirmationService: FuseConfirmationService,
        private ProjectService: CreateProjecteService,
        private sprintService : SprintService
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

    getSprintDetails() {
        this.initialLoading = true;
        this.sprintService
            .getSprintById({
                id: this.sprintId,
            })
            .subscribe((res: any) => {
                this.sprint = res?.data;
                console.log(this.sprint);
                this.sprintStatus(this.sprint.status);
                this.initialLoading = false;
        });
    }

    sprintStatus(status:any){
        if(status == 'COMPLETE'){
            this.disableButton = true;
        }else if(status == 'null'){
            this.disableButton = true;
        }

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
        const payload = {
            id: this.sprintId,
            status : 'COMPLETE'
        }
        const dialogRef = this._fuseConfirmationService.open(
            this.configForm.value
        );

        dialogRef.afterClosed().subscribe((result) => {
            if (result == 'confirmed') {
                this.disableButton = true;
               console.log("Sprint ID =  " + this.sprintId);
               this.updateStatusApi(payload);
            }
        });
    }

    updateStatusApi(payload:any){
        this.initialLoading = true;
        console.log(payload);
        this.sprintService.postSprintStatus(payload).subscribe(
            (res:any)=> {
                console.log(res?.data);
                if (!res?.error) {
                    this.initialLoading = false;
                    this.snackBar.successSnackBar(res?.message);
                } else {
                    this.initialLoading = false;
                    this.snackBar.errorSnackBar(res?.message);
                }
                if (res?.tokenExpire == true) {
                    this._authService.updateAndReload(window.location);
                }
            },
            (err: any) => {
                this.initialLoading = false;
                this.snackBar.errorSnackBar('Something Went Wrong');
            }
                
        );
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
