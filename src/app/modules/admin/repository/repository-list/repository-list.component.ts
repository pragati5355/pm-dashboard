import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@services/auth/auth.service';
import { RepositoryService } from '@modules/admin/repository/common/services/repository.service';
import { RepositoryDetailsComponent } from '../repository-details/repository-details.component';

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
        private RepositoryService: RepositoryService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.setJiraProject();
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
            this.tokenExpireFun(res);
        });
    }

    createRepository() {
        this.router.navigate(['/projects/repository/add-repository']);
    }

    goBack() {
        window.history.back();
    }

    private setJiraProject() {
        this.metricsProjectData = this._authService.getProjectDetails();
        this.getList(this.metricsProjectData.id);
    }

    private tokenExpireFun(res: any) {
        if (res.tokenExpire == true) {
            this._authService.updateAndReload(window.location);
        }
    }
    repoDetails(data: any) {
        const dialogRef = this.dialog.open(RepositoryDetailsComponent, {
            disableClose: true,
            panelClass: 'warn-dialog-content',
            autoFocus: false,
            data: data,
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result.result == 'success') {
            }
        });
    }
}
