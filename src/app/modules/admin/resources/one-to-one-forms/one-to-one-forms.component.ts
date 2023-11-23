import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBar } from 'app/core/utils/snackBar';
import { ResourcesService } from '../common/services/resources.service';
import { ViewOneToOneFormComponent } from '../view-one-to-one-form/view-one-to-one-form.component';

@Component({
    selector: 'app-one-to-one-forms',
    templateUrl: './one-to-one-forms.component.html',
    styleUrls: ['./one-to-one-forms.component.scss'],
})
export class OneToOneFormsComponent implements OnInit {
    menteeFormList: any[] = [];
    initialLoading: boolean = false;
    resourceId: number | null = 5;
    requiredSkeletonData = {
        rowsToDisplay: 10,
        displayProfilePicture: false,
    };
    constructor(
        private router: Router,
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private snackBar: SnackBar,
        private resourceService: ResourcesService
    ) {}

    ngOnInit(): void {
        this.addRouteSubscription();
    }

    goBack() {
        this.router.navigate([`/resources/view/${this.resourceId}`]);
    }
    viewForm(url: string) {
        const dialogRef = this.dialog.open(ViewOneToOneFormComponent, {
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
        this.resourceService.getMenteeFormList(id).subscribe(
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
