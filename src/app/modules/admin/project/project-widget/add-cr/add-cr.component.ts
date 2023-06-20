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
    teamMembers: any[] = [
        {
            id: 6,
            isBench: false,
            isShadow: false,
            isDeleted: false,
            firstName: 'Prafull',
            lastName: 'patil',
            email: 'prafull.patil@mindbowser.com',
            projectId: 335,
            jiraUserName: null,
            startDate: 1686216642951,
            endDate: 1686594600000,
            utilization: 0.25,
            projectType: 'EXTERNAL',
            status: 'ACTIVE',
            assignedBy: 12,
            role: 'PM',
            resourceId: 2,
            resourceTechnologyId: [4],
            technologies: [
                {
                    id: 4,
                    createdAt: null,
                    lastModifiedAt: null,
                    isDeleted: false,
                    technologyId: 46,
                    name: 'python',
                    experienceYear: 2,
                    experienceMonth: 4,
                    resourceId: 2,
                    deleted: false,
                },
            ],
            deleted: false,
            bench: false,
            shadow: false,
        },
        {
            id: 10,
            isBench: false,
            isShadow: false,
            isDeleted: false,
            firstName: 'Sample',
            lastName: 'User',
            email: 'sample.user@mindbowser.com',
            projectId: 335,
            jiraUserName: null,
            startDate: 1686822136225,
            endDate: 1687458600000,
            utilization: 1,
            projectType: 'EXTERNAL',
            status: 'ACTIVE',
            assignedBy: 38,
            role: 'PM',
            resourceId: 7,
            resourceTechnologyId: [],
            technologies: [],
            deleted: false,
            bench: false,
            shadow: false,
        },
    ];

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
            },
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result) {
                this.loadProjectDetails();
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
