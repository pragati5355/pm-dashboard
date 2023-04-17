import { Component, OnInit } from '@angular/core';
import { StaticData } from '../../../../../core/constacts/static';
import { CreateProjecteService } from '@services/create-projecte.service';
import { AuthService } from '@services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
    selector: 'app-sprint-issues',
    templateUrl: './sprint-issues.component.html',
    styleUrls: ['./sprint-issues.component.scss'],
})
export class SprintIssuesComponent implements OnInit {
    count = 1;
    initialLoading: boolean = false;
    totalRecored = 0;
    totalPerPageData = StaticData.PER_PAGE_DATA;
    sprintId: any;
    issuesList: any[] = [];
    requiredSkeletonData = {
        rowsToDisplay: 3,
        displayProfilePicture: false,
    };

    constructor(
        private _authService: AuthService,
        private _route: ActivatedRoute,
        private ProjectService: CreateProjecteService,
        private router: Router
    ) {}
    ngOnInit(): void {
        this._route.params.subscribe((sprintId: any) => {
            if (sprintId['sprintId']) {
                this.sprintId = parseInt(sprintId['sprintId']);
            }
        });
        let payload = {
            sprintId: this.sprintId,
            issueType: 'Bug',
        };
        this.getIssuesList(payload);
    }

    getIssuesList(paylaod: any) {
        this.initialLoading = true;
        this.ProjectService.getSprintIssueList(paylaod).subscribe(
            (res: any) => {
                if (res.data) {
                    this.issuesList = res.data;
                    this.totalRecored = this.issuesList.length;
                    this.initialLoading = false;
                } else {
                    this.totalRecored = 0;
                    this.initialLoading = false;
                }
            },
            (error) => {
                this.initialLoading = false;
            }
        );
    }
}
