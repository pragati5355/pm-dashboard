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
        this.series = [

            // {
            //    name: "JiraData",
            //    data: [
            //        {
            //            x:1653455340000,
            //            y:0
            //        },
            //        {
            //            x:1658978880000,
            //            y:0
            //        },
            //        {
            //            x:1658979060000,
            //            y:0
            //        },
            //        {
            //            x:1659052800000,
            //            y:0
            //        },
            //        {
            //            x:1659053460000,
            //            y:2.0
            //        },
            //        {
            //            x:1659067620000,
            //            y:2.5
            //        },
            //        {
            //           x:1659067860000,
            //           y:3
            //        },
            //        {
            //            x:1659076560000,
            //            y:1
            //        },
            //        {
            //            x:1659077460000,
            //            y:4
            //        },
            //        {
            //            x:1659077700000,
            //            y:0.5
            //        },
            //        {
            //            x:1659078180000,
            //            y:0
            //        },
            //        {
            //            x:1659572460000,
            //            y:2
            //        },
            //        {
            //            x:1659655440000,
            //            y:0
            //        },
            //        {
            //            x:1660009440000,
            //            y:0
            //        }
            //    ]
            // }
        ]
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
          type: 'number', tickAmount: 10, 
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
    this.getDatasetForChart(chartConfig.burndownchar.changes, chartConfig.burndownchar.startTime)
    this.getTotalSprintHours(chartConfig.burndownchar.changes, chartConfig.burndownchar.startTime)
    this.getOriginalEstimate( chartConfig.burndownchar.changes, chartConfig.burndownchar.startTime)
  
    // console.log(chartConfig.burndownchar.changes)

    this.dataset.forEach((element:any) => {
      this.newDataset.push(
        {
          x: element.Date,
          y: element.Remaining
        }
      )
    });
    this.getSprintEnd( chartConfig.burndownchar.changes, chartConfig.burndownchar.completeTime)
    console.log(this.newDataset)
    this.series =[{data: this.newDataset}]
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
        console.log(changes)
        Object.keys(changes).forEach((element) => {
          if (Number.parseInt(element) <= Number.parseInt(startTime)) {
            keys.push(element);
            console.log();
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
          console.log("storylist",this.storyList)
        });
        return totalEstimate;
      }
      getOriginalEstimate(changes:any, startTime: any){
        // for (let key in changes) {
        //   changes[key].forEach((element: any) => {
        //   if (Number.parseInt(key) <= Number.parseInt(startTime)) {
        //     console.log("element",new Date(Number.parseInt(key)))
        //   }
        // })
        // }
        for (let key in changes) {
          // if(parseInt(changes[key][0]?.statC?.newValue) || parseInt(changes[key][0]?.statC?.oldValue) || changes[key][0]?.added){
            changes[key].forEach((element: any) => {
              if(element.added){
                // console.log(changes[key][0]?.added, key)
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
            console.log(found)
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
              console.log(found2)
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
                // notDone: element?.column?.notDone?element?.column?.notDone:true
              }
            ];
          }
          console.log(this.dataset)
          console.log(this.notDoneDataset)
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
      getBurnDownChartData(payload: any) {
        this.ProjectService.burndownChart(payload).subscribe((res: any) => {
          this.burndownData = res.data;
          // this.isLoading = false;
        }, error => {
          // this.isLoading = false;
        })
      }
}
