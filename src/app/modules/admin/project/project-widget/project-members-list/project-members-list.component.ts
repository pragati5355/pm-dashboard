import { Component, OnInit } from '@angular/core';
import { StaticData } from '../../../../../core/constacts/static';
import { CreateProjecteService } from '@services/create-projecte.service';
import { Router } from '@angular/router';
import { Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ProjectMembersDetailsComponent } from '../project-members-details/project-members-details.component';
import {MatTableModule} from '@angular/material/table';

export interface PeriodicElement {
    modifiedBy: string;
    endDate: number;
    currentEndDate: number;
    reason: string;
}
  
const ELEMENT_DATA: PeriodicElement[] = [
    {modifiedBy: 'Pragati Gawade', endDate: 272023, currentEndDate: 23233, reason : "Hello"},
    {modifiedBy: 'Amaresh Joshi', endDate: 232023, currentEndDate: 233, reason : "Hi"},
    {modifiedBy: 'Roshan Kadam', endDate: 20232, currentEndDate: 234e42, reason : "ashyed nhdfbhbc znbshhadnmZBshad "},
];


@Component({
    selector: 'app-project-members-list',
    templateUrl: './project-members-list.component.html',
    styleUrls: ['./project-members-list.component.scss'],
})
export class ProjectMembersListComponent implements OnInit {
    displayedColumns: string[] = ['modifiedBy', 'endDate', 'currentEndDate', 'reason'];
    dataSource = ELEMENT_DATA;

    @Input()
    teamMembers = [];
    opentable : boolean = false;
    count = 1;
    pagination = false;
    initialLoading: boolean = false;
    totalPerPageData = StaticData.PER_PAGE_DATA;
    totalRecored = 0;
    requiredMembersSkeletonData = {
       rowsToDisplay: 5,
        displayProfilePicture: true,
    };

    constructor(
        private datePipe : DatePipe,
        private dialog: MatDialog,
    ) {}

    ngOnInit(): void {}

    membersDetailsDialog(membersDetails:any){
        const dialogRef = this.dialog.open(ProjectMembersDetailsComponent, {
            disableClose: true,
            width: '60%',
            panelClass: 'warn-dialog-content',
            autoFocus: false,
            data: {
                team : membersDetails
            },
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result) {
            }
        });
    }

    openTable(){
        this.opentable = true;
    }
}
