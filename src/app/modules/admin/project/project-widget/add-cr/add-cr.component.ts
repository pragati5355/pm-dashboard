import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { SnackBar } from 'app/core/utils/snackBar';
import { AddCrResourceDialogComponent } from '../add-cr-resource-dialog/add-cr-resource-dialog.component';
import { AddCrService } from '../common/services/add-cr.service';

@Component({
    selector: 'app-add-cr',
    templateUrl: './add-cr.component.html',
    styleUrls: ['./add-cr.component.scss'],
})
export class AddCrComponent implements OnInit {
    addCrForm: FormGroup;
    isLoadingDevelopersEmail: boolean = false;
    developerEmailList: any[];
    projectDetails: any;
    projectId: any;
    isLoading: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private addCrService: AddCrService,
        private route: ActivatedRoute,
        private snackBar: SnackBar,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.initializeForm();
        this.setProjectIdSubscription();
        this.loadDevelopersEmail();
        this.loadProjectDetails();
    }

    openDialog(member: any, mode: string) {
        const emailList = this.filterOutAlreadyAssignedEmails();
        const dialogRef = this.dialog.open(AddCrResourceDialogComponent, {
            disableClose: true,
            width: '50%',
            panelClass: 'warn-dialog-content',
            autoFocus: false,
            data: {
                developerEmails: emailList,
                mode: mode,
                editData: member,
                allResources: this.developerEmailList,
                projectId: this.projectId,
            },
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result) {
                this.loadProjectDetails();
                this.loadDevelopersEmail();
            }
        });
    }

    private loadDevelopersEmail() {
        this.isLoadingDevelopersEmail = true;
        this.addCrService.findAllDeveloperEmails().subscribe(
            (res: any) => {
                this.isLoadingDevelopersEmail = false;
                if (res?.data) {
                    this.developerEmailList = res?.data;
                }
            },
            (err) => {
                this.isLoadingDevelopersEmail = false;
            }
        );
    }

    private loadProjectDetails() {
        this.isLoading = true;
        this.addCrService
            .getProjectDetailsById({ id: this.projectId })
            .subscribe(
                (res: any) => {
                    this.isLoading = false;
                    if (res?.error === false) {
                        this.projectDetails = res?.data;
                    } else {
                        this.snackBar.errorSnackBar(res?.message);
                    }
                    if (res?.tokenExpire) {
                        this.authService.updateAndReload(window.location);
                    }
                },
                (err) => {
                    this.isLoading = false;
                }
            );
    }

    private setProjectIdSubscription() {
        this.route.paramMap.subscribe((paramMap) => {
            const projectId = paramMap.get('id');
            if (projectId) {
                this.projectId = projectId;
            }
        });
    }

    private filterOutAlreadyAssignedEmails() {
        return this.developerEmailList.filter(
            (obj) =>
                !this.projectDetails?.teamModel?.some(
                    ({ email }) => obj.email === email
                )
        );
    }

    private initializeForm() {
        this.addCrForm = this.formBuilder.group({
            totalCrHours: ['', [Validators.required]],
            crLink: [''],
            newProjectEndDate: ['', [Validators.required]],
            teamMemberModel: [''],
        });
    }
}
