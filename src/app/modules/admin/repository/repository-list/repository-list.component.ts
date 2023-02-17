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
    repoData: any = [];
    metricsProjectData: any;
    constructor(
        private router: Router,
        private _authService: AuthService,
        private RepositoryService: RepositoryService
    ) {}

    ngOnInit(): void {
        this.setJiraProject();
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
                this.repoData = res.data;
                this.totalRecord = res.data.repoCount;
            }
            this.initialLoading = false;
            if (res.tokenExpire == true) {
                this._authService.updateAndReload(window.location);
            }
        });
    }
}
