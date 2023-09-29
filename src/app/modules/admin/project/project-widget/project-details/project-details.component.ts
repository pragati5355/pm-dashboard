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
import { BitbucketProjectService } from '@modules/admin/repository/common/services/bitbucket-project.service';
import { BitbucketProjectModel } from '@modules/admin/repository/common/models/bitbucket-project.model';
import { DatePipe } from '@angular/common';
import { ProjectMembersDetailsComponent } from '../project-members-details/project-members-details.component';
import { LoggedInUserService } from '@modules/admin/common/services/logged-in-user.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { ProjectSettingsComponent } from '../project-settings/project-settings.component';

@Component({
    selector: 'app-project-details',
    templateUrl: './project-details.component.html',
    styleUrls: ['./project-details.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ProjectDetailsComponent implements OnInit {
    members = true;
    sprints = true;
    crLists = true;
    routeSubscribe: any;
    projectId: string;
    initialLoading = false;
    project: any;
    repoCount = 0;
    isBitbucketProjectListLoading = false;
    allBitbucketProjects: BitbucketProjectModel[] = [];
    teamMembers = [];
    crList = [];
    userRole: string = '';
    projectSettings: any;

    @Input() dataId: any;
    checked: false;
    private _fuseCards!: QueryList<ElementRef>;

    constructor(
        private router: Router,
        private _route: ActivatedRoute,
        private projectService: CreateProjecteService,
        private bitbucketProjectService: BitbucketProjectService,
        private matDialog: MatDialog,
        private _authService: AuthService,
        private datePipe: DatePipe,
        private loggedInUserService: LoggedInUserService,
        private clipboard: Clipboard,
        private snackBar: SnackBar
    ) {}

    ngOnInit(): void {
        this.routeSubscribe = this._route.params.subscribe((projectId) => {
            if (projectId['id']) {
                this.projectId = projectId['id'];
                this.getProjectDetails();
            }
        });
        this.getUserRole();
    }
    getProjectDetails() {
        this.initialLoading = true;
        this.projectService
            .getProjectById(Number(this.projectId))
            .subscribe((res: any) => {
                this.project = res?.data?.project;
                this.teamMembers = res?.data?.teamModel;
                this.crList = res?.data?.changeRequestProject;
                this.projectSettings = res?.data?.projectSettings;
                this.repoCount = res?.data?.repoCount;
                this._authService.setProjectDetails(this.project);
                this.initialLoading = false;
            });
    }

    projectSettingsDialog() {
        this.matDialog
            .open(ProjectSettingsComponent, {
                disableClose: true,
                width: '50%',
                height: 'auto',
                maxHeight: '90vh',
                data: {
                    projectModel: this.project,
                    projectSettings: this.projectSettings,
                    teamModel: this.teamMembers,
                },
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.getProjectDetails();
                }
            });
    }

    editProject() {
        this.router.navigate([`/projects/edit/${this.projectId}`]);
    }
    gotoProject() {
        this.router.navigate([`/projects/`]);
    }
    createRepository() {
        this.router.navigate([`/projects/repository/add`]);
    }
    viewRepository() {
        this.router.navigate([`/projects/repository/list`]);
    }
    projectProcess() {
        this.router.navigate([`/projects/project-process/list`]);
    }
    weeklyFeedBackList() {
        this.router.navigate([`/projects/${this.projectId}/feedback/list`]);
    }
    addCR() {
        this.router.navigate([`/projects/${this.projectId}/add-cr`]);
    }
    assignBitbucketProject() {
        if (this.allBitbucketProjects?.length > 0) {
            this.openAssignDialog(this.allBitbucketProjects);
        } else {
            this.isBitbucketProjectListLoading = true;
            this.bitbucketProjectService.findAll().subscribe((response) => {
                this.allBitbucketProjects = response;
                this.isBitbucketProjectListLoading = false;
                this.openAssignDialog(response);
            });
        }
    }

    showWorkLogs() {
        this.router.navigate([`/projects/${this.projectId}/worklogs`]);
    }

    historyDetails() {
        const dialogRef = this.matDialog.open(ProjectMembersDetailsComponent, {
            disableClose: true,
            width: '60%',
            panelClass: 'warn-dialog-content',
            autoFocus: false,
            data: {
                team: this.project,
            },
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result) {
            }
        });
    }

    private openAssignDialog(response: BitbucketProjectModel[]) {
        this.matDialog
            .open(AssignBitbucketProjectDialogComponent, {
                width: '50%',
                data: {
                    projectId: this.projectId,
                    projectName: this.project.name,
                    allBitbucketProjects: response,
                },
                disableClose: true,
            })
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    window.location.reload();
                }
            });
    }

    private getUserRole() {
        this.loggedInUserService.getLoggedInUser().subscribe((res: any) => {
            if (res?.role) {
                this.userRole = res?.role;
            }
        });
    }
}
