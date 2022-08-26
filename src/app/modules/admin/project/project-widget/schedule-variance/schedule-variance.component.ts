import {Component, Input, OnInit} from '@angular/core';
import { CreateProjecteService } from "@services/create-projecte.service";
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
    ApexYAxis
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
    @Input() grid: ApexGrid;
    @Input() fill: ApexFill | any;
    @Input() chart: ApexChart | any;
    @Input() xaxis: ApexXAxis | any;
    @Input() theme: ApexTheme | any;
    @Input() colors: string[] | any;
    @Input() labels: string[] | any;
    @Input() stroke: ApexStroke | any;
    @Input() states: ApexStates | any;
    @Input() legend: ApexLegend | any;
    @Input() dataLabels: ApexDataLabels;
    @Input() tooltip: ApexTooltip | any;
    @Input() title: ApexTitleSubtitle | any;
    @Input() subtitle: ApexTitleSubtitle | any;
    @Input() responsive: ApexResponsive[] | any;
    @Input() plotOptions: ApexPlotOptions | any;
    @Input() annotations: ApexAnnotations | any;
    @Input() yaxis: ApexYAxis | ApexYAxis[] | any;
    @Input() series: ApexAxisChartSeries | ApexNonAxisChartSeries;
    @Input() markers : ApexMarkers | any;
    chartData = [
        {name: 'Original Time Estimate'},
        {name: 'Story Points'}
    ]
    chartChange ="Original Time Estimate";
    isLoading = false
    constructor(private ProjectService: CreateProjecteService,) {
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
        this.series = [ ]
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
          // labels: {
          //     hideOverlappingLabels: true, datetimeFormatter: {
          //         hour: 'HH:mm'
          //     }
          // }
      }
    }
    totalEstimates =0
    storyList:any =[]
    dataset: any = []
    newDataset: any = []
    notDoneDataset: any = []
    burndownData: any={}
    ngOnInit() {
    //  const burndownchart= chartConfig.burndownchar.filter
    let payload = {
      "sprintId": 140
    }
    this.getBurnDownChartData(payload)
    // this.getDatasetForChart(chartConfig.burndownchar.changes, chartConfig.burndownchar.startTime)
    // this.getTotalSprintHours(chartConfig.burndownchar.changes, chartConfig.burndownchar.startTime)
    // this.getOriginalEstimate( chartConfig.burndownchar.changes, chartConfig.burndownchar.startTime)
    // if(!this.isLoading){

      this.Chartdatavalue()
    // }
    // console.log(chartConfig.burndownchar.changes)

}
    selectvalue(value:string){
     this.chartChange = value
    }
    getDatasetForChart(changes: any, startTime: any) {
        this.newDataset= [{ x: startTime, y: this.totalEstimates / 3600 }];
        // console.log(this.totalEstimates)
       
        return;
      }
    
      getTotalSprintHours(changes: any, startTime: any) {
        let keys: any = [];
        let totalEstimate = 0;
        // console.log(changes)
        Object.keys(changes).forEach((element) => {
          if (Number.parseInt(element) <= Number.parseInt(startTime)) {
            keys.push(element);
            // console.log();
            if (parseInt(changes[element][0]?.statC?.newValue)) {
              totalEstimate =
                totalEstimate +
                parseInt(changes[element][0]?.statC?.newValue);
    
              this.storyList.push({
                key: changes[element][0]?.key,
                time: changes[element][0]?.statC?.newValue,
              })
            }
          }
          // console.log("storylist",this.storyList)
        });
        return totalEstimate;
      }
      getOriginalEstimate(changes:any, startTime: any){
        console.log("Hello")
        for (let key in changes) {
            changes[key].forEach((element: any) => {
              if(element.added){
                this.totalEstimates =this.totalEstimates + 0
                this.dataset = [
                    ...this.dataset,
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
          const found = this.dataset.some((el: any) => el.key === changes[key][0].key);
          if(found){
            if(changes[key][0]?.column?.notDone == false ){
              let newdac = 0
              this.dataset.forEach((element:any) => {
                if(element.key === changes[key][0].key){
                  newdac =newdac+ element.Inc - element.Dec
                }
              });
              this.totalEstimates = this.totalEstimates + 0-newdac
              this.dataset = [
                ...this.dataset,
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
              this.dataset = [
                ...this.dataset,
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
              const found2 = this.dataset.some((el: any) => el.key === changes[key][0].key && el.notDone === false);
              if(!found2){
                let newInc = 0
                this.dataset.forEach((element:any) => {
                  if(element.key === changes[key][0].key){
                    newInc = element.Dec
                  }
                });
                this.totalEstimates = this.totalEstimates +newInc
              this.dataset = [
                ...this.dataset,
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
            //  console.log(changes[key][0].key)
            //  this.notDoneDataset.push(changes[key][0].key)
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
          // console.log(this.dataset)
          // console.log(this.notDoneDataset)
          }
        // }
      }

      getSprintEnd(change:any, endDate: any){
        // this.newDataset= [{ x: endDate, y: 0 }];
        this.newDataset.push({
          x:endDate,
          y:0
        })
      }
       async getBurnDownChartData(payload: any) {
        this.isLoading = true
          await this.ProjectService.burndownChart(payload).subscribe((res: any) => {
          this.burndownData = chartConfig.burndownchar;
          this.isLoading = false;
          // this.getOriginalEstimate( this.burndownData.changes, this.burndownData.startTime)
          //  this.getOriginalEstimate( chartConfig.burndownchar.changes, chartConfig.burndownchar.startTime)
          // this.Chartdatavalue()
          console.log(this.burndownData)
        }, error => {
          this.isLoading = false;
        })
      }
      async Chartdatavalue(){
        // console.log(this.newDataset)
        let payload = {
          "sprintId": 40
        }
        this.getBurnDownChartData(payload)
        this.getOriginalEstimate( chartConfig.burndownchar.changes, chartConfig.burndownchar.startTime)
          //  this.getOriginalEstimate( this.burndownData.changes, this.burndownData.startTime)
        let total = 0
        this.dataset.forEach((element:any) => {
          if(element.Date <=  chartConfig.burndownchar.startTime){
            console.log(element.key)
            total =element.Remaining
            console.log(total)
          }
          // else{
            this.newDataset =[{x:chartConfig.burndownchar.startTime, y:total}]
          //     this.newDataset.push(
          //   {
          //     x: element.Date,
          //     y: element.Remaining
          //   }
          // )
          // }
        });
            this.dataset.forEach((element:any) => {
              if(element.Date > chartConfig.burndownchar.startTime){
          this.newDataset.push(
            {
              x: element.Date,
              y: element.Remaining
            }
          )
              }
        });
        // let EndDate = chartConfig.burndownchar.completeTime?chartConfig.burndownchar.completeTime:chartConfig.burndownchar.now
        // for (let key in chartConfig.burndownchar) {
        //   console.log("key",key)
        // if( key == 'completeTime'){
          this.getSprintEnd( chartConfig?.burndownchar?.changes, chartConfig?.burndownchar?.completeTime)
        //  }
        // }
        console.log(this.newDataset)
        this.series =[{name: "Hours",data: this.newDataset}]
      }
}
