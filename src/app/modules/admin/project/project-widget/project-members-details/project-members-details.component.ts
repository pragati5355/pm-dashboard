import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-project-members-details',
    templateUrl: './project-members-details.component.html',
    styleUrls: ['./project-members-details.component.scss'],
})
export class ProjectMembersDetailsComponent implements OnInit {
    initialLoading: boolean = false;
    member: any = [];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<ProjectMembersDetailsComponent>
    ) {}

    ngOnInit(): void {
        this.member = this.data?.team?.history;
    }

    close() {
        this.matDialogRef.close('close');
    }
}
