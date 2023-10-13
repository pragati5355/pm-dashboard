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
import { CreateProjecteService } from '@services/create-projecte.service';

@Component({
    selector: 'app-profit-loss-project-statistic',
    templateUrl: './profit-loss-project-statistic.component.html',
    styleUrls: ['./profit-loss-project-statistic.component.scss'],
})
export class ProfitLossProjectStatisticComponent implements OnInit {

    @ViewChild(MatSort) sort: MatSort;
    dataSourceProject: MatTableDataSource<any>;
    displayedProjectCostColumns: string[] = [
        'resourcename', 'roleonproject','utilizationonproject', 'hoursasperprojectplan',
        'actualworkloghrs', 'hourlycostonproject', 'costasperprojectplan','actualcostonproject', 'costdifference'
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
    projectHistory: any;
    payload:any;

    constructor(
        private router: Router,
        private _route: ActivatedRoute,
        private pNLProjectServie: ProfitLossService,
        private _authService: AuthService,
        private datePipe : DatePipe,
        private projectService: CreateProjecteService,   
    ){}

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

    getProjectDetails() {
        this.initialLoading = true;
        this.projectService
            .getProjectById(this.projectId)
            .subscribe((res: any) => {
                this.projectHistory = res?.data?.project;
                if(res?.data?.project?.startDate == null && res?.data?.project?.endDate == null){
                    this.range.controls['startDate'].patchValue(this.currentMonthFirstDate);
                    this.range.controls['endDate'].patchValue(this.currentMonthCurrentDate);
                }
                else{
                    this.range.controls['startDate'].patchValue(res?.data?.project?.startDate);
                    this.range.controls['endDate'].patchValue(res?.data?.project?.endDate);
                }
                this.initialLoading = false;
            },
            (err) => {
                this.initialLoading = false;
                this.projectStatDetails = null;
            });
    }

    // getIdealWorkHrsTotal(){
    //     return this.projectStatDetails?.stats?.map(t => t?.totalIdealWorklogHrs).reduce((acc, value) => acc + value, 0);
    // }

    getActualWorkHrsTotal(){
        return this.projectStatDetails?.stats?.map(t => t?.totalActualWorklogHrs).reduce((acc, value) => acc + value, 0);
    }

    getWorklogHrsAsPerProjectPlan(){
        return this.projectStatDetails?.stats?.map(t => t?.worklogHrsAsPerProjectPlan).reduce((acc, value) => acc + value, 0);
    }

    getHourlyCostTotal(){
        return this.projectStatDetails?.stats?.map(t => t?.hourlyCost).reduce((acc, value) => acc + value, 0);
    }

    getCostAsPerProjectPlanTotal(){
        return this.projectStatDetails?.stats?.map(t => t?.costAsPerProjectPlan).reduce((acc, value) => acc + value, 0);
    }

    getTotalActualCost(){
        return this.projectStatDetails?.stats?.map(t => t?.actualCostOnProject).reduce((acc, value) => acc + value, 0);
    }

    getTotalDifference(){
        return this.projectStatDetails?.stats?.map(t => t?.costDiff).reduce((acc, value) => acc + value, 0);
    }

    loadStatList() {
        this.initialLoading = true;
        this.payload = {
            projectId : this.projectId,
            startDate : this.datePipe.transform(this.range?.value?.startDate ,'yyyy-MM-dd'),
            endDate : this.datePipe.transform(this.range?.value?.endDate,'yyyy-MM-dd')
        }
        
        if(this.datePipe.transform(this.range?.value?.endDate,'yyyy-MM-dd') != null){
            this.pNLProjectServie.getPNLStatList(this.payload).subscribe(
                (res: any) => {
                    this.initialLoading = false;
                    if (res?.statusCode === 200) {
                        this.projectStatDetails = res?.data;
                        this.dataSourceProject = new MatTableDataSource(this.projectStatDetails?.stats);
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
                this.getProjectDetails();
            }
        });
    }

    private loadProjectDetails(){
        this.initialLoading = true;
        if(this.projectHistory?.startDate == null && this.projectHistory?.endDate == null){
            this.payload = {
                projectId : this.projectId,
                startDate : this.datePipe.transform(this.currentMonthFirstDate,'yyyy-MM-dd'),
                endDate : this.datePipe.transform(this.currentMonthCurrentDate,'yyyy-MM-dd')
            }
        }
        else {
            this.payload = {
                projectId : this.projectId,
                startDate : this.datePipe.transform(this.projectHistory?.startDate,'yyyy-MM-dd'),
                endDate : this.datePipe.transform(this.projectHistory?.endDate,'yyyy-MM-dd')
            }
        }
        
        this.pNLProjectServie.getPNLStatList(this.payload).subscribe(
            (res: any) => {
                this.initialLoading = false;
                if (res?.statusCode === 200) {
                    this.projectStatDetails = res?.data;
                    console.log("this.projectStatDetails : ", this.projectStatDetails);
                    if(res?.data?.projectDetails == null){
                        this.range.controls['startDate'].patchValue(this.currentMonthFirstDate);
                        this.range.controls['endDate'].patchValue(this.currentMonthCurrentDate);
                    }
                    else{
                        this.range.controls['startDate'].patchValue(res?.data?.projectDetails?.startDate);
                        this.range.controls['endDate'].patchValue(res?.data?.projectDetails?.endDate);
                    }
                    if(this.projectStatDetails?.stats?.length != 0){
                        this.showFooter = true;
                    }
                    this.dataSourceProject = new MatTableDataSource(this.projectStatDetails?.stats);
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
 