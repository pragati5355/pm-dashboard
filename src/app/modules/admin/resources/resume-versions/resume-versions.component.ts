import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { NameResumeVersionComponent } from '../name-resume-version/name-resume-version.component';

@Component({
    selector: 'app-resume-versions',
    templateUrl: './resume-versions.component.html',
    styleUrls: ['./resume-versions.component.scss'],
})
export class ResumeVersionsComponent implements OnInit {
    initialLoading: boolean = false;
    resumeVersions: any[] = [
        { name: 'version 1', time: '12/12/2023 12:31' },
        { name: 'version 1', time: '12/12/2023 12:31' },
    ];
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private matDialogRef: MatDialogRef<ResumeVersionsComponent>,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {}

    cancel() {
        this.matDialogRef.close();
    }

    upload() {
        this.matDialogRef.close();

        const dialogRef = this.dialog.open(NameResumeVersionComponent, {
            disableClose: true,
            width: '40%',
            panelClass: 'warn-dialog-content',
            autoFocus: false,
            data: {
                mode: 'UPLOAD',
                fileName: 'new resume',
                data: {},
            },
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result == 'success') {
            }
        });
    }
}
