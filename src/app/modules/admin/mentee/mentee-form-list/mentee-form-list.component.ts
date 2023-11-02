import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ViewFormComponent } from '../view-form/view-form.component';

@Component({
    selector: 'app-mentee-form-list',
    templateUrl: './mentee-form-list.component.html',
    styleUrls: ['./mentee-form-list.component.scss'],
})
export class MenteeFormListComponent implements OnInit {
    menteeFormList: any[] = [
        {
            formName: '1 to 1 form',
            date: 'Jun 02 2023',
        },
        {
            formName: '1 to 1 form',
            date: 'Aug 03 2023',
        },
        {
            formName: '1 to 1 form',
            date: 'Sept 04 2023',
        },
        {
            formName: '1 to 1 form',
            date: 'Oct 02 2023',
        },
        {
            formName: '1 to 1 form',
            date: 'Nov 02 2023',
        },
        {
            formName: '1 to 1 form',
            date: 'Dec 02 2023',
        },
    ];
    constructor(private router: Router, private dialog: MatDialog) {}

    ngOnInit(): void {}

    goBack() {
        this.router.navigate([`/mentee`]);
    }

    viewForm() {
        const dialogRef = this.dialog.open(ViewFormComponent, {
            disableClose: true,
            width: '70%',
            height: '95%',
            panelClass: 'warn-dialog-content',
            autoFocus: false,
            data: {
                link: 'https://metrics-sproutops-bucket.s3.ap-south-1.amazonaws.com/weekly-feedback-reports/Metrics PM dashboard /metrics pm dashboard-internal-report-30-06-2023.pdf',
            },
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result == 'success') {
                window.location.reload();
            }
        });
    }
}
