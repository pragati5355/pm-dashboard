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
    sumActualCost : number;
    addActualCost: any[] = [];
    actualCost: number;
    sumIdealCost: number;
    addIdealCost: any[] = [];
    idealCost: number;
    sumdifference:number;
    adddifference: any[] = [];
    difference: number;
    sumActualWorkHrs:number;
    addActualWorkHrs: any[] = [];
    actualWorkHrs: number;
    sumIdealWorkHrs:number;
    addIdealWorkHrs: any[] = [];
    idealWorkHrs: number;
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

    private filterTotalOfAllColumns() {
        /* Total Ideal Work Hrs */
        this.statList.forEach((data) => {
            this.idealWorkHrs = data?.totalIdealWorklogHrs;
            this.addIdealWorkHrs.push(this.idealWorkHrs);
        });
        let resultIdealWorkHrs = 0;
        this.addIdealWorkHrs.forEach((number) => {
            resultIdealWorkHrs += number;
        });
        this.sumIdealWorkHrs = resultIdealWorkHrs;

        /* Total Actual Work Hrs */
        this.statList.forEach((data) => {
            this.actualWorkHrs = data?.totalActualWorklogHrs;
            this.addActualWorkHrs.push(this.actualWorkHrs);
        });
        let resultActualWorkHrs = 0;
        this.addActualWorkHrs.forEach((number) => {
            resultActualWorkHrs += number;
        });
        this.sumActualWorkHrs = resultActualWorkHrs;

        /* Total Ideal Cost */
        this.statList.forEach((data) => {
            this.idealCost = data?.idealHourlyRate;
            this.addIdealCost.push(this.idealCost);
        });
        let resultIdealCost = 0;
        this.addIdealCost.forEach((number) => {
            resultIdealCost += number;
        });
        this.sumIdealCost = resultIdealCost;

        /* Total Actual Cost */
        this.statList.forEach((data) => {
            this.actualCost = data?.actualHourlyRate;
            this.addActualCost.push(this.actualCost);
        });
        let result = 0;
        this.addActualCost.forEach((number) => {
            result += number;
        });
        this.sumActualCost = result;

        /* Total Difference */
        this.statList.forEach((data) => {
            this.difference = data?.diff;
            this.adddifference.push(this.difference);
        });
        let resultdiff = 0;
        this.adddifference.forEach((number) => {
            resultdiff += number;
        });
        this.sumdifference = resultdiff;
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
                    this.filterTotalOfAllColumns();
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
