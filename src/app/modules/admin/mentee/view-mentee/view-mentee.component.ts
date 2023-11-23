import { Component, OnInit } from '@angular/core';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { MenteeService } from '../common/services/mentee.service';
import { MenteeListComponent } from '../mentee-list/mentee-list.component';

@Component({
    selector: 'app-view-mentee',
    templateUrl: './view-mentee.component.html',
    styleUrls: ['./view-mentee.component.scss'],
})
export class ViewMenteeComponent implements OnInit {
    initialLoading: boolean = false;
    mbProjects: any[] = [];
    resourceDetails: any;
    constructor(
        private menteeListComponent: MenteeListComponent,
        private activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private menteeService: MenteeService
    ) {}

    ngOnInit(): void {
        this.menteeListComponent.matDrawer.open();
        this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
            const resourceId = paramMap.get('id');
            if (resourceId) {
                this.loadMenteeData(resourceId);
            }
        });
    }

    loadMenteeData(id: string) {
        const payload = { id };
        this.initialLoading = true;
        this.menteeService.getMenteeDetailsById(payload).subscribe(
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

    closeDrawer(): Promise<MatDrawerToggleResult> {
        return this.menteeListComponent.matDrawer.close();
    }
}
