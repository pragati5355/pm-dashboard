import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBar } from 'app/core/utils/snackBar';
import { AddFormComponent } from '../add-form/add-form.component';
import { MenteeService } from '../common/services/mentee.service';
import { ViewFormComponent } from '../view-form/view-form.component';

@Component({
    selector: 'app-mentee-form-list',
    templateUrl: './mentee-form-list.component.html',
    styleUrls: ['./mentee-form-list.component.scss'],
})
export class MenteeFormListComponent implements OnInit {
    menteeFormList: any[] = [
        // {
        //     id: 85352,
        //     resourceId: 1,
        //     mentorId: 2,
        //     formUrl:
        //         'https://metrics-sproutops-bucket.s3.ap-south-1.amazonaws.com/resource-one-to-one-forms/NOVEMBER_1_1700564697469',
        //     formName: '1:1 November',
        //     filledDate: '2023-11-21T11:04:57.687+00:00',
        // },
    ];
    initialLoading: boolean = false;
    resourceId: number | null = null;
    requiredSkeletonData = {
        rowsToDisplay: 10,
        displayProfilePicture: false,
    };
    constructor(
        private router: Router,
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private menteeService: MenteeService,
        private snackBar: SnackBar
    ) {}

    ngOnInit(): void {
        this.addRouteSubscription();
    }

    goBack() {
        this.router.navigate([`/mentee`]);
    }

    addForm() {
        this.router.navigate([`/mentee/form-list/add-from/${this.resourceId}`]);
    }

    viewForm(url: string) {
        const dialogRef = this.dialog.open(ViewFormComponent, {
            disableClose: true,
            width: '70%',
            height: '95%',
            panelClass: 'warn-dialog-content',
            autoFocus: false,
            data: {
                link: url,
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
                this.loadFormList(this.resourceId);
            }
        });
    }
    private loadFormList(id: number) {
        this.initialLoading = true;
        this.menteeService.getMenteeFormList(id).subscribe(
            (res: any) => {
                this.initialLoading = false;
                if (res?.data) {
                    this.menteeFormList = res?.data;
                }
            },
            (err) => {
                this.initialLoading = false;
                this.snackBar.errorSnackBar('Something went wrong');
            }
        );
    }
}
