import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { chartConfig } from 'app/core/config/chart.config';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, ApexDataLabels, ApexNonAxisChartSeries, ApexStroke, ApexLegend, ApexFill, ApexTooltip, ApexPlotOptions, ApexResponsive, ApexYAxis, ApexGrid, ApexStates, ApexTheme, ApexAnnotations } from "ng-apexcharts";
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjecteService } from '@services/create-projecte.service';
import { SprintFeedbackFormComponent } from '../../sprint-feedback-form/sprint-feedback-form.component';
import { round } from 'lodash';
@Component({
  selector: 'app-customer-happiness-score',
  templateUrl: './customer-happiness-score.component.html'
})
export class CustomerHappinessScoreComponent implements OnInit {
    @Input() fill: ApexFill;
    @Input() chart: ApexChart | any;
    @Input() xaxis: ApexXAxis | any;
    @Input() labels: string[] | any;
    @Input() title: ApexTitleSubtitle | any;
    @Input() responsive: ApexResponsive[] | any;
    @Input() plotOptions: ApexPlotOptions | any;
    @Input() series: ApexAxisChartSeries | ApexNonAxisChartSeries;
    @Input() yaxis: ApexYAxis | ApexYAxis[] | any;
    @Input() annotations: ApexAnnotations | any;
    @Input() colors: string[] | any;
    @Input() dataLabels: ApexResponsive[] | any;
    @Input() stroke: ApexStroke | any;
    @Input() legend: ApexLegend | any;
    @Input() tooltip: ApexTooltip | any;
    @Input() grid: ApexGrid | any;
    @Input() states: ApexStates | any;
    @Input() subtitle: ApexTitleSubtitle | any;
    @Input() theme: ApexTheme | any;
    sprintId: any
    projectId =0
    isShow = false
    initialLoading =true
    score: any= "Nil"
    updatedAt!: Date;
    constructor(private _authService: AuthService, private _route: ActivatedRoute, private dialog: MatDialog,private ProjectService: CreateProjecteService,) {
        this.fill = chartConfig.SCORE_CHART[0].fill;
        this.chart = chartConfig.SCORE_CHART[0].chart;
        this.series = chartConfig.SCORE_CHART[0].series;
        this.labels = chartConfig.SCORE_CHART[0].labels;
        this.colors = chartConfig.SCORE_CHART[0].colors;
        this.stroke = chartConfig.SCORE_CHART[0].stroke;
        this.plotOptions = chartConfig.SCORE_CHART[0].plotOptions;
    }

    ngOnInit() {
      let projectData= this._authService.getProjectDetails()
      this.projectId = projectData.id
      this._route.queryParams.subscribe((sprintId: any) => {
        if (sprintId['id'] && sprintId['name']) {
            this.sprintId = parseInt(sprintId['id'])
            let payload={
              projectId : this.projectId,
              sprintId:this.sprintId
            }
            this.getHappinessScoreBySprint(payload)
        }else{
          let payload={
            projectId : this.projectId,
          }
          this.getHappinessScoreByProject(payload)
        }
        });
        
      
    }
    feedbackForm(){
      const dialogRef = this.dialog.open(SprintFeedbackFormComponent, {
        disableClose: true,
        width: "880px",
        panelClass:"warn-dialog-content",
        autoFocus: false,
        data: {
          id:this.sprintId,
          // sprintName: this.sprint_name
        }
      });
    }
    getHappinessScoreBySprint(paylaod: any){
      this.initialLoading = true;
      this.ProjectService.getHappinessScoreBySprint(paylaod).subscribe((res: any) => {
        if(res.data.happinessScore > 0){
          this.labels = [round(res.data.happinessScore)+"/"+res.data.outOf]
          this.series = [res.data.happinessScore*100/res.data.outOf]
          this.score = round(res.data.happinessScore)
          this.updatedAt = res.data.lastModifiedAt
          this.isShow = true;
        this.initialLoading = false;
        }else{
          this.labels = ["NA"]
          this.series = [0]
          this.initialLoading = false;
        }
      }, error => {
        this.initialLoading = false;
      })
    }
    getHappinessScoreByProject(paylaod: any){
      this.initialLoading = true;
      this.ProjectService.getHappinessScoreByProject(paylaod).subscribe((res: any) => {
        if(res.data.happinessScore > 0){
          this.labels = [round(res.data.happinessScore)+"/"+res.data.outOf]
          this.series = [res.data.happinessScore*100/res.data.outOf]
          this.score = round(res.data.happinessScore)
          this.updatedAt = res.data.lastModifiedAt
        this.initialLoading = false;
        }else{
          this.labels = ["NA"]
          this.series = [0]
          this.initialLoading = false;
        }
        
      }, error => {
        this.initialLoading = false;
      })
    }
}
