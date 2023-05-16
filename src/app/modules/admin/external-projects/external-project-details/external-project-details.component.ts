import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
    projectDetails = {
        projectName: 'Metrics',
        technologys: ['Java', 'Angular', 'Microservices', 'Node Js'],
        teamMembers: [
            'Amaresh',
            'Rohit',
            'Rohan kadam',
            'Amaresh',
            'Rohit',
            'Rohan kadam',
        ],
        clientDetails: [
            { name: 'Rohan Kadam', email: 'rohan.kadam@mindbowser.com' },
            {
                name: 'Amaresh Joshi',
                email: 'amaresh.joshiasdasdasd@mindbowser.com',
            },
            {
                name: 'Amaresh Joshi',
                email: 'amaresh.joshi@mindbowser.com',
            },
        ],
        resourceDetails: [
            {
                name: 'Rohan kadam',
                Utilization: 0.5,
                startDate: 1682812800000,
                endDate: 1682812800000,
            },
            {
                name: 'Rohan kadam',
                Utilization: 0.5,
                startDate: 1682812800000,
                endDate: 1682812800000,
            },
            {
                name: 'Rohan kadam',
                Utilization: 0.5,
                startDate: 1682812800000,
                endDate: 1682812800000,
            },
            {
                name: 'Rohan kadam',
                Utilization: 0.5,
                startDate: 1682812800000,
                endDate: 1682812800000,
            },
        ],
    };

    constructor(
        private dialog: MatDialog,
        private externalProjectsService: ExternalProjectsApiService
    ) {}

    ngOnInit(): void {
        this.loadDeveloperEmails();
    }

    edit() {
        this.dialog
            .open(CreateExternalProjectComponent, {
                width: '60%',
                height: 'auto',
            })
            .afterClosed()
            .subscribe((result) => {});
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
                },
            }
        );
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result == 'success') {
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
