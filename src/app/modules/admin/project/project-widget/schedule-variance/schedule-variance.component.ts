import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { CreateProjecteService } from "@services/create-projecte.service";
import {ActivatedRoute, Router} from '@angular/router';
import {
    ApexAxisChartSeries,
    ApexChart,
    ApexDataLabels,
    ApexGrid,
    ApexStroke,
    ApexTitleSubtitle,
    ApexXAxis,
    ApexYAxis,
    ChartComponent,
} from "ng-apexcharts";
import ApexCharts from 'apexcharts';
import { ViewEncapsulation } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  grid: ApexGrid;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  yaxis: ApexYAxis
};
@Component({
    selector: 'app-schedule-variance',
    templateUrl: './schedule-variance.component.html',
    styleUrls: ['./schedule-variance.component.scss'],
    encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleVarianceComponent implements OnInit {
  @ViewChild("chart", { static: false }) chart: ChartComponent| any;
  public chartOptions:any  = {}; 
  
    isChartLoaded: boolean = true
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
    guidelineData: any =[]
    @Input() data: any ;
    dataId = 0
    ngOnInit() {
      this.chartComponentFn();

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
      getOriginalEstimate(changes:any, startTime: any, endTime: any, now: any, completeTime: any){
        this.isChartLoaded = true
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
        this.Chartdatavalue(filterdataset,startTime,endTime)
        if(completeTime !== undefined){
          this.getSprintEnd(changes,completeTime)  
        }else{
          this.getSprintEnd(changes,now)  
        }
        this.chartOptions.series=[{name: "Hours",data:this.newDataset},
        {
          name: "guildeline",
          type: "line",
          data: this.guidelineData
        }] 
      }

      getSprintEnd(change:any, endDate: any){
        this.newDataset.push({
          x:endDate,
          y:this.totalEstimates
        })
      }
    getBurnDownChartData(payload: any) {
      this.isChartLoaded = false
         this.ProjectService.burndownChart(payload).subscribe((res: any) => {
          this.burndownData = res.data;

          if(res.data.changes){
            this.getOriginalEstimate( this.burndownData.changes, this.burndownData.startTime, this.burndownData.endTime,this.burndownData.now,this.burndownData.completeTime)   
            const chart = new ApexCharts( document.querySelector("#chart"), this.chartOptions);
            chart.render();
          }
         
        })
      }
      public  Chartdatavalue(filterdataset: any, startTime: any, endTime: any){
        let total = 0
        let newfilterDataSet: any = []
        filterdataset.forEach((element:any) => {
          if(element.Date <=  startTime){
            total =element.Remaining
          }
          newfilterDataSet =[{x:startTime, y:total}]
          this.guidelineData=[{x:startTime, y:total}]
        });
        this.guidelineData.push({
          x:endTime, 
          y:0
        })
        filterdataset.forEach((element:any) => {
              if(element.Date > startTime){
                newfilterDataSet.push(
            {
              x: element.Date,
              y: element.Remaining
            }
          )
              }
        });
        this.newDataset = newfilterDataSet   
       
      }
     
      chartComponentFn(){
        this.chartOptions={
        grid : {
            row: {
                colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        }, 
          
          chart : {
            height: 350, type: "line", zoom: {
                enabled: false
            }
        },
          title : {
            text: "", align: "left"
        },
          stroke:{
            width: 1.5,
            curve: ["stepline","straight"]
        },
          dataLabels: {
            enabled: false
        },
          series : [{
            name: "jiraData",
            
            data: this.newDataset
          },{
            name: "guildeline",
            type: "line",
            data: this.guidelineData
          }
        ],
          xaxis :{
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
          },
          yaxis : {
            type: 'numeric', 
            tickAmount: 0, 
            
        }
         }
      }
}
