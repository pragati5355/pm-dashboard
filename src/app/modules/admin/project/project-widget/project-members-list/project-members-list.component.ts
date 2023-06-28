import { Component, OnInit } from '@angular/core';
import { StaticData } from '../../../../../core/constacts/static';
import { CreateProjecteService } from '@services/create-projecte.service';
import { Router } from '@angular/router';
import { Input } from '@angular/core';
import { DatePipe } from '@angular/common';
@Component({
    selector: 'app-project-members-list',
    templateUrl: './project-members-list.component.html',
    styleUrls: ['./project-members-list.component.scss'],
})
export class ProjectMembersListComponent implements OnInit {
    @Input()
    teamMembers = [];

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
        private datePipe : DatePipe
    ) {}

    ngOnInit(): void {}
}
