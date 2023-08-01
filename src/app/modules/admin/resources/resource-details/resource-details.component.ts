import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CreateProjecteService } from '@services/create-projecte.service';
import { AuthService } from '@services/auth/auth.service';
import { SnackBar } from '../../../../core/utils/snackBar';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { MatDrawerToggleResult } from '@angular/material/sidenav';

import { ResourcesListComponent } from '../resources-list/resources-list.component';
import { round } from 'lodash';
import { CreateResumeComponent } from '../create-resume/create-resume.component';
import { MatDialog } from '@angular/material/dialog';
import { ResumeVersionsComponent } from '../resume-versions/resume-versions.component';
@Component({
    selector: 'app-resource-details',
    templateUrl: './resource-details.component.html',
})
export class ResourceDetailsComponent implements OnInit {
    initialLoading = false;
    resourceDetails: any = {};
    score: any = 0;
    outOfScore: any = 10;
    mbProjects: string[] = [];
    certificates: any[] = [
        'Full stack we development',
        'AWS s3 full course',
        'Data science master',
    ];
    skillAndIntegrations: any[] = [
        {
            name: 'Firebase',
        },
        {
            name: 'AWS S3',
        },
        {
            name: 'Stripe',
        },
        {
            name: 'FCM',
        },
        {
            name: 'Paypal',
        },
    ];
    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private ProjectService: CreateProjecteService,
        private _authService: AuthService,
        private _route: ActivatedRoute,
        private snackBar: SnackBar,
        private activatedRoute: ActivatedRoute,
        private dialog: MatDialog,
        private _resourcesListComponent: ResourcesListComponent
    ) {}

    ngOnInit(): void {
        this._resourcesListComponent.matDrawer.open();
        this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
            const resourceId = paramMap.get('id');
            if (resourceId) {
                this.loadData(resourceId);
                this.getResourceHappinessScore(resourceId);
            }
        });
    }

    loadData(id: any) {
        const payload = { id };
        this.initialLoading = true;
        this.ProjectService.getresource(payload).subscribe(
            (res: any) => {
                this.initialLoading = false;
                if (res.data) {
                    this.resourceDetails = res?.data;
                    this.mbProjects =
                        this.resourceDetails?.mbProjects?.split(',');
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
    edit(id: number) {
        this.router.navigate([`/resources/edit/${id}`]);
    }
    getResourceHappinessScore(id: any) {
        const payload = { resourceId: id };
        this.ProjectService.getResourceHappinessScore(payload).subscribe(
            (res: any) => {
                if (res.data !== null) {
                    this.score = round(res?.data?.happinessScore);
                    this.outOfScore = res?.data?.outOf;
                }
                if (res.tokenExpire == true) {
                    this._authService.updateAndReload(window.location);
                }
            },
            (error) => {}
        );
    }

    createResumeDialog() {
        const dialogRef = this.dialog.open(CreateResumeComponent, {
            disableClose: true,
            width: '40%',
            panelClass: 'warn-dialog-content',
            autoFocus: false,
            data: {},
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result == 'success') {
            }
        });
    }

    viewResumeVersions() {
        const viewResumeVersionDialogRef = this.dialog.open(
            ResumeVersionsComponent,
            {
                disableClose: true,
                width: '40%',
                panelClass: 'warn-dialog-content',
                autoFocus: false,
                data: {},
            }
        );
        viewResumeVersionDialogRef.afterClosed().subscribe((result: any) => {
            if (result == 'success') {
            }
        });
    }

    viewResume(url: string) {
        window.open(url, '_blank');
    }

    closeDrawer(): Promise<MatDrawerToggleResult> {
        return this._resourcesListComponent.matDrawer.close();
    }
}
