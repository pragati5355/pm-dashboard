import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData {
    resend: any;
}

@Component({
    selector: 'app-repository-details',
    templateUrl: './repository-details.component.html',
})
export class RepositoryDetailsComponent implements OnInit {
    repoData: any;
    constructor(
        public matDialogRef: MatDialogRef<RepositoryDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit(): void {
        this.repoData = this.data;
    }

    close() {
        this.matDialogRef.close();
    }
}
