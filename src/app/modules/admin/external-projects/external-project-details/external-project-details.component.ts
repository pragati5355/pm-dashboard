import { I } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CreateProjecteService } from '@services/create-projecte.service';
import { ExternalProjectsApiService } from '../common/services/external-projects-api.service';
import { CreateExternalProjectComponent } from '../create-external-project/create-external-project.component';
import { ExternalProjectsAddResourceComponent } from '../external-projects-add-resource/external-projects-add-resource.component';

@Component({
    selector: 'app-external-project-details',
    templateUrl: './external-project-details.component.html',
    styleUrls: ['./external-project-details.component.scss'],
})
export class ExternalProjectDetailsComponent implements OnInit {
    developerEmailList: any[];
    isLoadingDevelopersEmail: boolean = false;
    projectId: any;
    projectDetails: any;
    isLoading = false;

    constructor(
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private projectService: CreateProjecteService,
        private externalProjectsService: ExternalProjectsApiService
    ) {}

    ngOnInit(): void {
        this.isLoading = true;
        this.setProjectIdSubscription();
        this.loadDeveloperEmails();
    }

    getProjectDetails() {
        this.projectService
            .getOneProjectDetails({
                id: this.projectId,
            })
            .subscribe((res: any) => {
                this.projectDetails = res?.data;
                this.isLoading = false;
            });
    }

    edit() {
        this.dialog
            .open(CreateExternalProjectComponent, {
                width: '60%',
                height: 'auto',
                data: {
                    projectModel: this.projectDetails?.project,
                    clientModels: this.projectDetails?.clientModels,
                },
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    window.location.reload();
                }
            });
    }

    openDialog() {
        const dialogRef = this.dialog.open(
            ExternalProjectsAddResourceComponent,
            {
                disableClose: true,
                width: '50%',
                panelClass: 'warn-dialog-content',
                autoFocus: false,
                data: {
                    developerEmails: this.developerEmailList,
                    projectId: this.projectId,
                },
            }
        );
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result == 'success') {
            }
        });
    }

    private setProjectIdSubscription() {
        this.route.paramMap.subscribe((paramMap) => {
            const projectId = paramMap.get('id');
            if (projectId) {
                this.projectId = projectId;
                this.getProjectDetails();
            }
        });
    }

    private loadDeveloperEmails() {
        this.isLoadingDevelopersEmail = true;
        this.externalProjectsService.findAllDeveloperEmails().subscribe(
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
}
