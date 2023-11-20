import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewOneToOneFormComponent } from '../view-one-to-one-form/view-one-to-one-form.component';

@Component({
    selector: 'app-one-to-one-forms',
    templateUrl: './one-to-one-forms.component.html',
    styleUrls: ['./one-to-one-forms.component.scss'],
})
export class OneToOneFormsComponent implements OnInit {
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
    initialLoading: boolean = false;
    resourceId: number | null = 5;
    requiredSkeletonData = {
        rowsToDisplay: 10,
        displayProfilePicture: false,
    };
    constructor(
        private router: Router,
        private dialog: MatDialog,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.addRouteSubscription();
    }

    goBack() {
        this.router.navigate([`/resources/view/${this.resourceId}`]);
    }
    viewForm() {
        const dialogRef = this.dialog.open(ViewOneToOneFormComponent, {
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

    private addRouteSubscription() {
        this.route.paramMap.subscribe((paramMap) => {
            const resourceId = paramMap.get('id');
            if (resourceId) {
                this.resourceId = Number(resourceId);
            }
        });
    }
}
