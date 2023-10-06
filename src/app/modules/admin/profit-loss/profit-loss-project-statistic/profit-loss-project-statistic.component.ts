import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfitLossService } from '../common/services/profit-loss.service';
import { AuthService } from '@services/auth/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MAT_SELECT_YEARS, MAT_TAB_MONTHS } from '@modules/admin/project/project-widget/common/constants';
import { StatList } from '../common/constant';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-profit-loss-project-statistic',
    templateUrl: './profit-loss-project-statistic.component.html',
    styleUrls: ['./profit-loss-project-statistic.component.scss'],
})
export class ProfitLossProjectStatisticComponent implements OnInit {

    @ViewChild(MatSort) sort: MatSort;

    dataSource: MatTableDataSource<any>;
    displayedColumns: string[] = [
        'email', 'totalIdealWorklogHrs', 'totalActualWorklogHrs', 'hourlyCost', 
        'idealResourceCost', 'idealProjectCost', 'costOnProject', 'actualCost', 'diff'
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
   
    statList: StatList[] = [];
    months : any [] = [];
    picker:any ;
    initialLoading: boolean = false;
    constructor(
        private router: Router,
        private _route: ActivatedRoute,
        private pNLProjectServie: ProfitLossService,
        private _authService: AuthService   
    ) {}

    ngOnInit(): void {
        this.getCurrentMonthAndYear();
        this.routeSubscribeId();
        this.loadStatList(this.projectId, this.selectedYear , this.previousMonth, this.currentMonth);
        this.months = [];
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
    }

    goBack() {
        this.router.navigate([`/profit-loss`]);
    }

    onYearChange(event: any) {
        this.selectedYear = event?.value;
        this.loadStatList(this.projectId, this.selectedYear , this.previousMonth, this.currentMonth);
        this.months = [];
    }

    onFromMonthChange(event:any){
        this.previousMonth = event?.value;
        this.loadStatList(this.projectId, this.selectedYear , this.previousMonth, this.currentMonth);
        this.months = [];
    }

    onToMonthChange(event:any){
        this.currentMonth = event?.value;
        this.loadStatList(this.projectId, this.selectedYear , this.previousMonth, this.currentMonth);
        this.months = [];
    }

    getTotalCost(){
        return this.statList.map(t => t.totalIdealWorklogHrs).reduce((acc, value) => acc + value, 0);
    }

    getTotalActualWorkHrs(){
        return this.statList.map(t => t.totalActualWorklogHrs).reduce((acc, value) => acc + value, 0);
    }

    getTotalResourceCost(){
        return this.statList.map(t => t.idealResourceCost).reduce((acc, value) => acc + value, 0);
    }

    getTotalProjectCost(){
        return this.statList.map(t => t.idealProjectCost).reduce((acc, value) => acc + value, 0);
    }

    getTotalIdealCost(){
        return this.statList.map(t => t.costOnProject).reduce((acc, value) => acc + value, 0);
    }

    getTotalActualCost(){
        return this.statList.map(t => t.actualCost).reduce((acc, value) => acc + value, 0);
    }

    getTotalDifference(){
        return this.statList.map(t => t.diff).reduce((acc, value) => acc + value, 0);
    }


    private getCurrentMonthAndYear() {
        this.selectedYear = String(new Date().getFullYear());
        this.currentYear = String(new Date().getFullYear());
        this.selectedMonth = new Date().getMonth();
        this.currentMonth = new Date().getMonth();
        this.previousMonth = new Date().getMonth() - 1;
        this.loadStatList(this.projectId, this.selectedYear , this.previousMonth, this.currentMonth);
        this.months = [];
    }

    private routeSubscribeId() {
        this.routeSubscribe = this._route.params.subscribe((id) => {
            if (id['id']) {
                this.projectId = id['id'];
                console.log('this.projectId : ', this.projectId);
            }
        });
    }

    private loadStatList(projectId:any ,year:any , fromMonth:any , toMonth:any) {
        this.initialLoading = true;
        this.months.push(++fromMonth, ++toMonth);
        const payload = {
            projectId : projectId,
            year : this.selectedYear,
            months : this.months
        }
        this.pNLProjectServie.getPNLStatList(payload).subscribe(
            (res: any) => {
                this.initialLoading = false;
                if (res?.statusCode === 200) {
                    this.statList = res?.data;
                    this.dataSource = new MatTableDataSource(this.statList);
                    console.log("this.statList : " , this.statList);
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

    range = new FormGroup({
        startDate: new FormControl(),
        endDate: new FormControl(),
    });
}
 