import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-resume-versions',
    templateUrl: './resume-versions.component.html',
    styleUrls: ['./resume-versions.component.scss'],
})
export class ResumeVersionsComponent implements OnInit {
    initialLoading: boolean = false;
    resumeVersions: any[] = [
        {
            time: '12/02/2023',
        },
        {
            time: '13/04/2023',
        },
        {
            time: '12/04/2023',
        },
        {
            time: '16/07/2023',
        },
        {
            time: '12/02/2023',
        },
        {
            time: '12/02/2023',
        },
        {
            time: '12/02/2023',
        },
        {
            time: '12/02/2023',
        },
        {
            time: '12/02/2023',
        },
        {
            time: '12/02/2023',
        },
        {
            time: '12/02/2023',
        },
        {
            time: '12/02/2023',
        },
        {
            time: '12/02/2023',
        },
        {
            time: '12/02/2023',
        },
        {
            time: '12/02/2023',
        },
        {
            time: '12/02/2023',
        },
        {
            time: '12/02/2023',
        },
        {
            time: '12/02/2023',
        },
        {
            time: '12/02/2023',
        },
        {
            time: '12/02/2023',
        },
        {
            time: '12/02/2023',
        },
        {
            time: '12/02/2023',
        },
    ];
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private matDialogRef: MatDialogRef<ResumeVersionsComponent>
    ) {}

    ngOnInit(): void {}

    cancel() {
        this.matDialogRef.close();
    }
}
