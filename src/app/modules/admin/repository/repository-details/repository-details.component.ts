import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConstants } from '../../../../core/constacts/constacts';
export interface DialogData {
    resend: any;
}

@Component({
    selector: 'app-repository-details',
    templateUrl: './repository-details.component.html',
})
export class RepositoryDetailsComponent implements OnInit {
    repoData: any;
    repoHref: any;
    constructor(
        public matDialogRef: MatDialogRef<RepositoryDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit(): void {
        this.initializeDetails();
    }

    close() {
        this.matDialogRef.close();
    }

    private initializeDetails() {
        this.repoData = this.data;
        this.repoHref = AppConstants['bitbucketSource'] + this.data.name;
    }
}
