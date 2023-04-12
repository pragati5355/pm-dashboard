import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StaticData } from '../../../../../core/constacts/static';
import { CreateProjecteService } from '@services/create-projecte.service';
import { Input } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';
@Component({
    selector: 'app-sprints-list',
    templateUrl: './sprints-list.component.html',
    styleUrls: ['./sprints-list.component.scss'],
})
export class SprintsListComponent implements OnInit {
    count = 1;
    initialLoading: boolean = false;
    totalRecored = 0;
    totalPerPageData = StaticData.PER_PAGE_DATA;
    sprintList: any = [];
    requiredSprintSkeletonData = {
        rowsToDisplay: 10,
        displayProfilePicture: false,
    };

    constructor(
        private _authService: AuthService,
        private ProjectService: CreateProjecteService,
        private router: Router
    ) {}
    @Input() dataId: any;
    ngOnInit(): void {
        this.initialLoading = true;
        let payload = {
            id: this.dataId,
        };
        this.getSprintList(payload);
    }

    getSprintList(paylaod: any) {
        this.initialLoading = true;
        this.ProjectService.getSprintList(paylaod).subscribe(
            (res: any) => {
                if (res.data) {
                    this.sprintList = res.data;
                    this.totalRecored = this.sprintList.length
                        ? this.sprintList.length
                        : 0;
                    this.initialLoading = false;
                } else {
                    this.totalRecored = 0;
                    this.initialLoading = false;
                }
                if (res.tokenExpire == true) {
                    this._authService.updateAndReload(window.location);
                }
            },
            (error) => {
                this.initialLoading = false;
            }
        );
    }
    goToSprint(id: number, name: any) {
        this.router.navigate([
            `/projects/${this.dataId}/sprint-details/${id}/${name}`,
        ]);
    }
}
