import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrDetailsComponent } from '../cr-details/cr-details.component';

@Component({
    selector: 'app-cr-lists',
    templateUrl: './cr-lists.component.html',
    styleUrls: ['./cr-lists.component.scss'],
})
export class CrListsComponent implements OnInit {
    initialLoading: boolean = false;

    @Input()
    crList : any =[];

    requiredSprintSkeletonData = {
        rowsToDisplay: 10,
        displayProfilePicture: false,
    };

    constructor(
        private dialog: MatDialog,
    ) {}

    ngOnInit(): void {}

    crDetails(resList : any){
        const dialogRef = this.dialog.open(CrDetailsComponent, {
            disableClose: true,
            width: '60%',
            panelClass: 'warn-dialog-content',
            autoFocus: false,
            data: {
                reslist : resList
            },
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result) {
            }
        });

    }
}
