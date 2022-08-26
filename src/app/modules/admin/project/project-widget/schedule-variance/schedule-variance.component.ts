import {Component, Input, OnInit, SimpleChange} from '@angular/core';
import { CreateProjecteService } from "@services/create-projecte.service";
import {ActivatedRoute, Router} from '@angular/router';
import {chartConfig} from 'app/core/config/chart.config';
import {
    ApexAnnotations,
    ApexAxisChartSeries,
    ApexChart,
    ApexDataLabels,
    ApexFill,
    ApexGrid,
    ApexLegend,
    ApexMarkers,
    ApexNonAxisChartSeries,
    ApexPlotOptions,
    ApexResponsive,
    ApexStates,
    ApexStroke,
    ApexTheme,
    ApexTitleSubtitle,
    ApexTooltip,
    ApexXAxis,
    ApexYAxis,
    ApexOptions
} from "ng-apexcharts";
import {FormControl} from "@angular/forms";
import { E } from '@angular/cdk/keycodes';
import { keys } from 'lodash';

@Component({
    selector: 'app-schedule-variance',
    templateUrl: './schedule-variance.component.html',
    styleUrls: ['./schedule-variance.component.scss']
})
export class ScheduleVarianceComponent implements OnInit {
    @Input() grid: ApexGrid|any;
    @Input() fill: ApexFill | any;
    @Input() chart: ApexChart | any;
    @Input() xaxis: ApexXAxis | any;
    @Input() theme: ApexTheme | any;
    @Input() colors: string[] | any;
    @Input() labels: string[] | any;
    @Input() stroke: ApexStroke | any;
    @Input() states: ApexStates | any;
    @Input() legend: ApexLegend | any;
    @Input() dataLabels: ApexDataLabels|any;
    @Input() tooltip: ApexTooltip | any;
    @Input() title: ApexTitleSubtitle | any;
    @Input() subtitle: ApexTitleSubtitle | any;
    @Input() responsive: ApexResponsive[] | any;
    @Input() plotOptions: ApexPlotOptions | any;
    @Input() annotations: ApexAnnotations | any;
    @Input() yaxis: ApexYAxis | ApexYAxis[] | any;
    @Input() series: ApexAxisChartSeries | any;
    @Input() markers : ApexMarkers | any;
    @Input() options: ApexOptions| any
    isChartLoaded = false
    chartData = [
        {name: 'Original Time Estimate'},
        {name: 'Story Points'}
    ]
    chartChange ="Original Time Estimate";
    isLoading = false
    constructor(private router: Router, private _route: ActivatedRoute,private ProjectService: CreateProjecteService,) {
     
    }
    totalEstimates =0
    storyList:any =[]
    dataset: any = []
    newDataset: any = []
    notDoneDataset: any = []
    burndownData: any={}
    @Input() data: any ;
    dataId = 0
    ngOnInit() {
     this._route.queryParams.subscribe((sprintId: any) => {
        if (sprintId['id']) {
            this.dataId = parseInt(sprintId['id'])
        }
    });
    let payload = {
      sprintId: this.dataId
    }
    this.getBurnDownChartData(payload)

}
    selectvalue(value:string){
     this.chartChange = value
    }
      getOriginalEstimate(changes:any, startTime: any){
        let filterdataset: any = []
        for (let key in changes) {
            changes[key].forEach((element: any) => {
              if(element.added){
                this.totalEstimates =this.totalEstimates + 0
                filterdataset = [
                    ...filterdataset,
                    {
                      Date:  Number.parseInt(key),
                      key: element.key,
                      // Detail:  "Scope change",
                      Inc: 0,
                      Dec: null,
                      Remaining: this.totalEstimates,
                      notDone: element?.column?.notDone?element?.column?.notDone:true
                    }
                  ];
            }
            });
          const found = filterdataset.some((el: any) => el.key === changes[key][0].key);
          if(found){
            if(changes[key][0]?.column?.notDone == false ){
              let newdac = 0
              filterdataset.forEach((element:any) => {
                if(element.key === changes[key][0].key){
                  newdac =newdac+ element.Inc - element.Dec
                }
              });
              this.totalEstimates = this.totalEstimates + 0-newdac
              filterdataset = [
                ...filterdataset,
                {
                  Date:  Number.parseInt(key),
                  key: changes[key][0].key,
                  // Detail:  "Issue completed",
                  Inc: 0,
                  Dec: newdac,
                  Remaining:  this.totalEstimates,
                  notDone: changes[key][0]?.column?.notDone?changes[key][0]?.column?.notDone:true
                }
              ];
            }
            if(changes[key][0]?.statC?.newValue){
              let newInc =0
              if(changes[key][0]?.statC?.oldValue){
                newInc =changes[key][0]?.statC?.newValue/ 3600 -changes[key][0]?.statC?.oldValue/ 3600
              }else{
                newInc =changes[key][0]?.statC?.newValue/ 3600
              }
              this.totalEstimates = this.totalEstimates + newInc
              filterdataset = [
                ...filterdataset,
                { 
                  Date:  Number.parseInt(key),
                  key: changes[key][0].key,
                  // Detail:  "Issue completed",
                  Inc: newInc,
                  Dec: null,
                  Remaining: this.totalEstimates,
                  notDone: changes[key][0]?.column?.notDone?changes[key][0]?.column?.notDone:true
                }
              ];
            }
            if(changes[key][0]?.column?.notDone == true && !changes[key][0].added){
              const found2 = filterdataset.some((el: any) => el.key === changes[key][0].key && el.notDone === false);
              if(!found2){
                let newInc = 0
                filterdataset.forEach((element:any) => {
                  if(element.key === changes[key][0].key){
                    newInc = element.Dec
                  }
                });
                this.totalEstimates = this.totalEstimates +newInc
                filterdataset = [
                ...filterdataset,
                { 
                  Date:  Number.parseInt(key),
                  key: changes[key][0].key,
                  // Detail:  "Issue completed",
                  Inc: newInc,
                  Dec: null,
                  Remaining: this.totalEstimates,
                  notDone: changes[key][0]?.column?.notDone?changes[key][0]?.column?.notDone:true
                }
              ];}
              }
             
          }
          if(changes[key][0]?.column?.notDone == true && changes[key][0]?.statC){
             this.notDoneDataset = [
              ...this.notDoneDataset,
              {
                Date:  Number.parseInt(key),
                key: changes[key][0].key,
                // Detail:  "Scope change",
                Inc:null,
                Dec: null,
                Remaining: 0,
                notDone: changes[key][0]?.column?.notDone?changes[key][0]?.column?.notDone:true
              }
            ];
          }
          }
        this.Chartdatavalue(filterdataset)
      }

      getSprintEnd(change:any, endDate: any){
        this.newDataset.push({
          x:endDate,
          y:this.totalEstimates
        })
      }
       getBurnDownChartData(payload: any) {
         this.ProjectService.burndownChart(payload).subscribe((res: any) => {
          this.burndownData = res.data;
          this.getOriginalEstimate( this.burndownData.changes, this.burndownData.startTime)          
        })
      }
       Chartdatavalue(filterdataset: any){
        let total = 0
        let newfilterDataSet: any = []
        filterdataset.forEach((element:any) => {
          if(element.Date <=  chartConfig.burndownchar.startTime){
            total =element.Remaining
          }
          newfilterDataSet =[{x:chartConfig.burndownchar.startTime, y:total}]
        });
        filterdataset.forEach((element:any) => {
              if(element.Date > chartConfig.burndownchar.startTime){
                newfilterDataSet.push(
            {
              x: element.Date,
              y: element.Remaining
            }
          )
              }
        });

      // this.getSprintEnd( chartConfig?.burndownchar?.changes, chartConfig?.burndownchar?.now)
        this.series =[{name: "Hours",data:newfilterDataSet}]
        console.log(this.series);
        this.isChartLoaded = true
        this.chartComponent();
      }
     
      chartComponent(){
        this.markers = {
          size: 0,
          colors: undefined,
          strokeColors: '#fff',
          strokeWidth: 2,
          strokeOpacity: 0.9,
          strokeDashArray: 0,
          fillOpacity: 1,
          discrete: [],
          shape: "circle",
          radius: 2,
          offsetX: 0,
          offsetY: 0,
          onClick: undefined,
          onDblClick: undefined,
          showNullDataPoints: true,
          hover: {
            size: undefined,
            sizeOffset: 3
          }
        }
          this.grid = chartConfig.Schedule_Variance_chart[0].grid;
          // this.xaxis = chartConfig.Schedule_Variance_chart[0].xaxis;
          this.yaxis = chartConfig.Schedule_Variance_chart[0].yaxis;
          this.chart = chartConfig.Schedule_Variance_chart[0].chart;
          this.title = chartConfig.Schedule_Variance_chart[0].title;
          // this.series = chartConfig.Schedule_Variance_chart[0].series;
          this.stroke = chartConfig.Schedule_Variance_chart[0].stroke;
          this.dataLabels = chartConfig.Schedule_Variance_chart[0].dataLabels;
          this.series = [{
            name: "jiraData",
            data:[]
          }]
          this.xaxis = {
              axisBorder: {
                  show: true
              },
              labels    : {
                  format: 'MMM dd,'
              },
              // tickAmount: 3,
              tickPlacement: 'between',
              tooltip   : {
                  enabled: false
              },
              type      : 'datetime'
          }
          this.yaxis = {
            type: 'numeric', tickAmount: 0, 
            y: 0
            // labels: {
            //     hideOverlappingLabels: true, datetimeFormatter: {
            //         hour: 'HH:mm'
            //     }
            // }
        }
      }
}
