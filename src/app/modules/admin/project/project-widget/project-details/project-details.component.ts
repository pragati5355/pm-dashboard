import {
    Component,
    ElementRef,
    Input,
    OnInit,
    QueryList,
    ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBar } from '../../../../../core/utils/snackBar';
import { CreateProjecteService } from '@services/create-projecte.service';
import { AuthService } from '@services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AssignBitbucketProjectDialogComponent } from '../assign-bitbucket-project-dialog/assign-bitbucket-project-dialog.component';

@Component({
    selector: 'app-project-details',
    templateUrl: './project-details.component.html',
    styleUrls: ['./project-details.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ProjectDetailsComponent implements OnInit {
    members = true;
    sprints = true;
    routeSubscribe: any;
    projectId: string;
    initialLoading = false;
    project: any;
    repoCount = 0;
    @Input() dataId: any;
    checked: false;
    private _fuseCards!: QueryList<ElementRef>;

    constructor(
        private router: Router,
        private _route: ActivatedRoute,
        private projectService: CreateProjecteService,
        private matDialog: MatDialog,
        private _authService: AuthService
    ) {}

    ngOnInit(): void {
        this.routeSubscribe = this._route.queryParams.subscribe((projectId) => {
            if (projectId['id']) {
                this.projectId = projectId['id'];
                this.getProjectDetails();
            }
        });
    }
    getProjectDetails() {
        this.initialLoading = true;
        this.projectService
            .getOneProjectDetails({
                id: this.projectId,
            })
            .subscribe((res: any) => {
                this.project = res?.data?.project;
                this.repoCount = res?.data?.repoCount;
                this._authService.setProjectDetails(this.project);
                this.initialLoading = false;
            });
    }

    editProject() {
        this.router.navigate([`/projects/edit-project`], {
            queryParams: { id: this.projectId },
        });
    }
    gotoProject() {
        this.router.navigate([`/projects/project-list`]);
    }
    createRepository() {
        this.router.navigate([`/projects/repository/add-repository`]);
    }
    viewRepository() {
        this.router.navigate([`/projects/repository/repository-list`]);
    }
    projectProcess() {
        this.router.navigate([`/projects/project-process/list`]);
    }
    assignBitbucketProject() {
        this.matDialog
            .open(AssignBitbucketProjectDialogComponent, {
                width: '50%',
                data: {
                    projectId: this.projectId,
                    projectName: this.project.name,
                },
                disableClose: true,
            })
            .afterClosed()
            .subscribe((result) => {
                console.log('Dialog response ', result);
                window.location.reload();
            });
    }
}
