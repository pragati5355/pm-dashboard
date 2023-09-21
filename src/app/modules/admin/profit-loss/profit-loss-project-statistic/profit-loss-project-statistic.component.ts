import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfitLossService } from '../common/services/profit-loss.service';
import { AuthService } from '@services/auth/auth.service';

@Component({
    selector: 'app-profit-loss-project-statistic',
    templateUrl: './profit-loss-project-statistic.component.html',
    styleUrls: ['./profit-loss-project-statistic.component.scss'],
})
export class ProfitLossProjectStatisticComponent implements OnInit {
    routeSubscribe: any;
    projectId = 0;
    requiredSkeletonData = {
        rowsToDisplay: 10,
        displayProfilePicture: true,
    };
    statList: any = [];
    resourceList: any[] = [
        {
            resourceName: 'Dhruv Kumar',
            actualHours: 90,
            idealHours: 60,
        },
        {
            resourceName: 'Anjali Gupta',
            actualHours: 70,
            idealHours: 55,
        },
        {
            resourceName: 'Jaya Bhat',
            actualHours: 100,
            idealHours: 94,
        },
        {
            resourceName: 'Nila Patil',
            actualHours: 80,
            idealHours: 80,
        },
    ];

    initialLoading: boolean = false;
    constructor(
        private router: Router,
        private _route: ActivatedRoute,
        private pNLProjectServie: ProfitLossService,
        private _authService: AuthService
    ) {}

    ngOnInit(): void {
        this.routeSubscribeId();
        this.loadStatList();
    }

    goBack() {
        this.router.navigate([`/profit-loss`]);
    }

    private routeSubscribeId() {
        this.routeSubscribe = this._route.params.subscribe((id) => {
            if (id['id']) {
                this.projectId = id['id'];
                console.log('this.projectId : ', this.projectId);
            }
        });
    }

    private loadStatList() {
        this.initialLoading = true;
        this.pNLProjectServie.getPNLStatList(335).subscribe(
            (res: any) => {
                this.initialLoading = false;
                if (res?.statusCode === 200) {
                    this.statList = res?.data;
                    console.log('this.statList : ', this.statList);
                } else if (res?.data == null) {
                    this.statList = [];
                }
                if (res?.tokenExpire) {
                    this._authService.updateAndReload(window.location);
                }
            },
            (err) => {
                this.initialLoading = false;
            }
        );
    }
}
