import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfitLossService } from '../common/services/profit-loss.service';
import { AuthService } from '@services/auth/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MAT_SELECT_YEARS, MAT_TAB_MONTHS } from '@modules/admin/project/project-widget/common/constants';
import { ProjectStatModel, StatModel } from '../common/constant';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { debounce } from 'lodash';
import { debounceTime } from 'rxjs';

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
    currentMonthFirstDate: any = '';
    currentMonthCurrentDate : any = '';
    currentYear: string = '';
    projectStatDetails: ProjectStatModel;
    months : any [] = [];
    range!:FormGroup ;
    showFooter : boolean = false;
    initialLoading: boolean = false;

    constructor(
        private router: Router,
        private _route: ActivatedRoute,
        private pNLProjectServie: ProfitLossService,
        private _authService: AuthService,
        private datePipe : DatePipe   
    ) {}

    ngOnInit(): void {
        this.getCurrentMonthAndYear();
        this.initializeForm();
        this.routeSubscribeId();
        this.loadProjectDetails();
        this.loadStatList();


    }

    goBack() {
        this.router.navigate([`/profit-loss`]);
    }

    getTotalCost(){
        return this.projectStatDetails?.stats?.map(t => t?.totalIdealWorklogHrs).reduce((acc, value) => acc + value, 0);
    }

    getTotalActualWorkHrs(){
        return this.projectStatDetails?.stats?.map(t => t?.totalActualWorklogHrs).reduce((acc, value) => acc + value, 0);
    }

    getTotalResourceCost(){
        return this.projectStatDetails?.stats?.map(t => t?.idealResourceCost).reduce((acc, value) => acc + value, 0);
    }

    getTotalProjectCost(){
        return this.projectStatDetails?.stats?.map(t => t?.idealProjectCost).reduce((acc, value) => acc + value, 0);
    }

    getTotalIdealCost(){
        return this.projectStatDetails?.stats?.map(t => t?.costOnProject).reduce((acc, value) => acc + value, 0);
    }

    getTotalActualCost(){
        return this.projectStatDetails?.stats?.map(t => t?.actualCost).reduce((acc, value) => acc + value, 0);
    }

    getTotalDifference(){
        return this.projectStatDetails?.stats?.map(t => t?.diff).reduce((acc, value) => acc + value, 0);
    }

    loadStatList() {
        this.initialLoading = true;
        const payload = {
            projectId : this.projectId,
            startDate : this.datePipe.transform(this.range?.value?.startDate,'yyyy-MM-dd'),
            endDate : this.datePipe.transform(this.range?.value?.endDate,'yyyy-MM-dd')
        }
        
        if(this.datePipe.transform(this.range?.value?.endDate,'yyyy-MM-dd') != null){
            this.pNLProjectServie.getPNLStatList(payload).subscribe(
                (res: any) => {
                    this.initialLoading = false;
                    if (res?.statusCode === 200) {
                        this.projectStatDetails = res?.data;
                        this.dataSource = new MatTableDataSource(this.projectStatDetails?.stats);
                        if(this.projectStatDetails?.stats?.length != 0){
                            this.showFooter = true;
                        }
                    } else if (res?.data?.stats == null) {
                        this.projectStatDetails.stats = [];
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

    private getCurrentMonthAndYear() {
        var date = new Date();
        this.selectedYear = String(new Date().getFullYear());
        this.currentYear = String(new Date().getFullYear());
        this.selectedMonth = new Date().getMonth();
        this.currentMonth = new Date().getMonth();
        this.currentMonthFirstDate = new Date(date.getFullYear(), date.getMonth(), 1);
        this.currentMonthCurrentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        this.previousMonth = new Date().getMonth() - 1;
    }

    private routeSubscribeId() {
        this.routeSubscribe = this._route.params.subscribe((id) => {
            if (id['id']) {
                this.projectId = id['id'];
                console.log('this.projectId : ', this.projectId);
            }
        });
    }

    private loadProjectDetails(){
        this.initialLoading = true;
        const payload = {
            projectId : this.projectId,
            startDate : this.datePipe.transform(this.currentMonthFirstDate,'yyyy-MM-dd'),
            endDate : this.datePipe.transform(this.currentMonthCurrentDate,'yyyy-MM-dd')
        }
        
        this.pNLProjectServie.getPNLStatList(payload).subscribe(
            (res: any) => {
                this.initialLoading = false;
                console.log("payload : ", payload);
                if (res?.statusCode === 200) {
                    this.projectStatDetails = res?.data;
                    this.range.controls['startDate'].patchValue((res?.data?.projectDetails?.startDate));
                    this.range.controls['endDate'].patchValue((res?.data?.projectDetails?.endDate));
                    if(this.projectStatDetails?.stats?.length != 0){
                        this.showFooter = true;
                    }
                    this.dataSource = new MatTableDataSource(this.projectStatDetails?.stats);
                } else if (res?.data?.stats == null) {
                    this.projectStatDetails.stats = [];
                }
                if (res?.tokenExpire) {
                    this._authService.updateAndReload(window.location);
                }
            },
            (err) => {
                this.initialLoading = false;
                this.projectStatDetails = null;
            }
        );
    }
    
    private initializeForm(){
        this.range = new FormGroup({
            startDate: new FormControl(),
            endDate: new FormControl()
        });

        this.range.valueChanges.pipe(debounceTime(500)).subscribe(() => {
            this.loadStatList();
        })
    }
}
 