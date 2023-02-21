import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProcessFormComponent } from '../process-form/process-form.component';
@Component({
    selector: 'app-project-process-list',
    templateUrl: './project-process-list.component.html',
    styleUrls: ['./project-process-list.component.scss'],
})
export class ProjectProcessListComponent implements OnInit {
    initialLoading = false;
    totalRecored = 1;
    repository: any = [];
    constructor(private dialog: MatDialog) {}

    ngOnInit(): void {
        this.repository = [
            {
                bitbucketProjectName: 'demo',
                projectName: 'indbowser',
                key: 'GINGER14',
                bitbucketUrl: 'GINGER14',
                createdAt: '2021-11-18',
                createdBy: 'sanskriti',
                jenkinsUrl: 'kj',
                status: 'success',
                console: 'console',
            },
            {
                bitbucketProjectName: 'demo',
                projectName: 'indbowser',
                key: 'GINGER14',
                bitbucketUrl: 'GINGER14',
                createdAt: '2021-11-18',
                createdBy: 'sanskriti',
                jenkinsUrl: 'kj',
                status: 'success',
                console: 'console',
            },
        ];
    }
    processForm() {
        const dialogRef = this.dialog.open(ProcessFormComponent, {
            disableClose: true,
            panelClass: 'warn-dialog-content',
            autoFocus: false,
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result.result == 'success') {
            }
        });
    }
    processFormSubmitted() {
        const dialogRef = this.dialog.open(ProcessFormComponent, {
            disableClose: true,
            panelClass: 'warn-dialog-content',
            autoFocus: false,
            data: 'submitted',
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result.result == 'success') {
            }
        });
    }
}
