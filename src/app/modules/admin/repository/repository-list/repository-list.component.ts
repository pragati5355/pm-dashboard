import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { RepositoryService } from '@modules/admin/repository/common/services/repository.service';

@Component({
    selector: 'app-repository-list',
    templateUrl: './repository-list.component.html',
    styleUrls: ['./repository-list.component.scss'],
})
export class RepositoryListComponent implements OnInit {
    initialLoading = false;
    totalRecord = 0;
    repositories: any = [];
    metricsProjectData: any;
    constructor(
        private router: Router,
        private _authService: AuthService,
        private RepositoryService: RepositoryService
    ) {}

    ngOnInit(): void {
        this.repositories = [
            {
                id: 5,
                createdAt: 1676291113505,
                lastModifiedAt: 1676291113505,
                isDeleted: false,
                name: 'test14-css-admin-react-js',
                uuid: '{aa55b440-ccb1-4fa6-90bb-6716bff73e77}',
                metricsProjectId: 169,
                projectKey: 'METRICS_TEST',
                createdBy: 12,
            },
            {
                id: 6,
                createdAt: 1676291113520,
                lastModifiedAt: 1676291113521,
                isDeleted: false,
                name: 'test15-css-admin-react-js',
                uuid: '{e1ae23dd-4882-4beb-82a5-ba3ae64a561f}',
                metricsProjectId: 169,
                projectKey: 'METRICS_TEST',
                createdBy: 12,
            },
        ];
        this.totalRecord = 2;
    }
    createRepository() {
        this.router.navigate(['/projects/repository/add-repository']);
    }
    private setJiraProject() {
        this.metricsProjectData = this._authService.getProjectDetails();
        this.getList(this.metricsProjectData.id);
    }
    getList(id: any) {
        this.initialLoading = true;
        const payload = {
            id: id,
        };
        this.RepositoryService.find(payload).subscribe((res: any) => {
            if (!res.error) {
                this.repositories = res.data.repositories;
                this.totalRecord = res.data.repoCount;
            }
            this.initialLoading = false;
            if (res.tokenExpire == true) {
                this._authService.updateAndReload(window.location);
            }
        });
    }
}
