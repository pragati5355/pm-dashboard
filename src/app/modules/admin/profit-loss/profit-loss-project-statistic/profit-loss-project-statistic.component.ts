import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfitLossService } from '../common/services/profit-loss.service';
import { AuthService } from '@services/auth/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MAT_SELECT_YEARS, MAT_TAB_MONTHS } from '@modules/admin/project/project-widget/common/constants';
import { StatList } from '../common/constant';

@Component({
    selector: 'app-profit-loss-project-statistic',
    templateUrl: './profit-loss-project-statistic.component.html',
    styleUrls: ['./profit-loss-project-statistic.component.scss'],
})
export class ProfitLossProjectStatisticComponent implements OnInit {

    @ViewChild(MatSort) sort: MatSort;

    dataSource: MatTableDataSource<any>;
    displayedColumns: string[] = [
        'email', 'idealworkhrs', 'actualworkhrs', 'hourlycost', 
        'resourcecost', 'projectcost', 'idealcost', 'actualcost', 'difference'
    ];

    list: StatList[] = [
        {email: 'Hydrogen', idealworkhrs: 1.0079, actualworkhrs : 1.1, hourlycost: 1.0079, resourcecost : 1.1, projectcost: 1.0079, idealcost : 1.1, actualcost: 1.0079, difference : 1.1},
        {email: 'Helium', idealworkhrs: 4.0026, actualworkhrs: 1.2, hourlycost: 1.0079, resourcecost : 1.1, projectcost: 1.0079, idealcost : 1.1, actualcost: 1.0079, difference : 1.1},
        {email: 'Lithium', idealworkhrs: 6.941, actualworkhrs: 1.3, hourlycost: 1.0079, resourcecost : 1.1, projectcost: 1.0079, idealcost : 1.1, actualcost: 1.0079, difference : 1.1},
        {email: 'Beryllium', idealworkhrs: 9.0122, actualworkhrs: 1.4, hourlycost: 1.0079, resourcecost : 1.1, projectcost: 1.0079, idealcost : 1.1, actualcost: 1.0079, difference : 1.1},
        {email: 'Boron', idealworkhrs: 10.811, actualworkhrs: 1.5, hourlycost: 1.0079, resourcecost : 1.1, projectcost: 1.0079, idealcost : 1.1, actualcost: 1.0079, difference : 1.1},
        {email: 'Carbon', idealworkhrs: 12.0107, actualworkhrs: 1.6, hourlycost: 1.0079, resourcecost : 1.1, projectcost: 1.0079, idealcost : 1.1, actualcost: 1.0079, difference : 1.1},
        {email: 'Nitrogen', idealworkhrs: 14.0067, actualworkhrs: 1.7, hourlycost: 1.0079, resourcecost : 1.1, projectcost: 1.0079, idealcost : 1.1, actualcost: 1.0079, difference : 1.1},
        {email: 'Oxygen', idealworkhrs: 15.9994, actualworkhrs: 1.8, hourlycost: 1.0079, resourcecost : 1.1, projectcost: 1.0079, idealcost : 1.1, actualcost: 1.0079, difference : 1.1},
        {email: 'Fluorine', idealworkhrs: 18.9984, actualworkhrs: 1.9, hourlycost: 1.0079, resourcecost : 1.1, projectcost: 1.0079, idealcost : 1.1, actualcost: 1.0079, difference : 1.1},
        {email: 'Neon', idealworkhrs: 20.1797, actualworkhrs: 1.10, hourlycost: 1.0079, resourcecost : 1.1, projectcost: 1.0079, idealcost : 1.1, actualcost: 1.0079, difference : 1.1},
    ];

    routeSubscribe: any;
    projectId = 0;
    requiredSkeletonData = {
        rowsToDisplay: 10,
        displayProfilePicture: true,
    };

    selectedYear: string = '2020';
    selectedMonth: number = 0;
    previousMonth : number = 0;
    fromMonth : number = 0;
    matMonthList: any[] = MAT_TAB_MONTHS;
    matSelectYears: string[] = MAT_SELECT_YEARS;
    currentMonth: number;
    currentYear: string = '';
   
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

    projectCost : number;
    addProjectCost : any[] = [];
    sumProjectCost: number;

    resourceCost : number;
    addResourceCost : any[] = [];
    sumResourceCost : number;

    initialLoading: boolean = false;
    constructor(
        private router: Router,
        private _route: ActivatedRoute,
        private pNLProjectServie: ProfitLossService,
        private _authService: AuthService   
    ) {
        this.dataSource = new MatTableDataSource(this.list);
    }

    ngOnInit(): void {
        this.getCurrentMonthAndYear();
        this.routeSubscribeId();
        this.loadStatList();
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
    }

    goBack() {
        this.router.navigate([`/profit-loss`]);
    }

    onYearChange(event: any) {
        this.selectedYear = event?.value;
        console.log("this.selectedYear : ", this.selectedYear);
    }

    onFromMonthChange(event:any){
        this.fromMonth = event?.value;
        console.log("this.fromMonth : " , this.fromMonth);
        this.previousMonth = event?.value;
        console.log("this.previousMonth  : ", this.previousMonth );
    }

    onToMonthChange(event:any){
        this.currentMonth = event?.value;
        console.log("this.currentMonth : ", this.currentMonth);
    }

    getTotalCost(){
        return this.list.map(t => t.idealworkhrs).reduce((acc, value) => acc + value, 0);
    }

    private getCurrentMonthAndYear() {
        this.selectedYear = String(new Date().getFullYear());
        this.currentYear = String(new Date().getFullYear());
        this.selectedMonth = new Date().getMonth();
        this.currentMonth = new Date().getMonth();
        this.previousMonth = new Date().getMonth() - 1;
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

         /* Total Resource Cost */
        this.statList.forEach((data) => {
            this.resourceCost = data?.idealResourceCost;
            this.addResourceCost.push(this.resourceCost);
        });
        let resultResourceCost = 0;
        this.addResourceCost.forEach((number) => {
            resultResourceCost += number;
        });
        this.sumResourceCost = resultResourceCost;

        /* Total Project Cost */
        this.statList.forEach((data) => {
            this.projectCost = data?.idealProjectCost;
            this.addProjectCost.push(this.projectCost);
        });
        let resultProjectCost = 0;
        this.addProjectCost.forEach((number) => {
            resultProjectCost += number;
        });
        this.sumProjectCost = resultProjectCost;
        

        /* Total Cost on Project */
        this.statList.forEach((data) => {
            this.idealCost = data?.costOnProject;
            this.addIdealCost.push(this.idealCost);
        });
        let resultIdealCost = 0;
        this.addIdealCost.forEach((number) => {
            resultIdealCost += number;
        });
        this.sumIdealCost = resultIdealCost;

        /* Total Actual Cost */
        this.statList.forEach((data) => {
            this.actualCost = data?.actualCost;
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
        this.pNLProjectServie.getPNLStatList(this.projectId).subscribe(
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
