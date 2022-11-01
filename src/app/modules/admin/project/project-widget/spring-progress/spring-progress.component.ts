import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexYAxis,
  ApexTooltip,
  ApexFill,
  ApexLegend
} from "ng-apexcharts";
import ApexCharts from 'apexcharts';
import { StaticData } from "../../../../../core/constacts/static";
import { CreateProjecteService } from "@services/create-projecte.service";
import { AuthService } from '@services/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: ApexLegend;
};
@Component({
  selector: 'app-spring-progress',
  templateUrl: './spring-progress.component.html',
  styleUrls: ['./spring-progress.component.scss']
})
export class SpringProgressComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent | any;
  public chartOptions: Partial<ChartOptions> | any;
  count = 1;
  initialLoading: boolean = false;
  totalRecored = 0;
  totalPerPageData = StaticData.PER_PAGE_DATA;
  sprintId: any
  sprintProgressList: any = []
  resultProgress: any[]=[];

  constructor(private _authService: AuthService, private _route: ActivatedRoute,private ProjectService: CreateProjecteService, private router: Router,)  {
    this.chartOptions = {
      series: [],
      chart: {
      type: 'bar',
      height: 150,
      width: 900,
      stacked: true,
      // stackType: '100%',
      color: '#fff',
      toolbar: {
        show: true,
        tools: {
          download: false
        }
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    title: {
      text: ''
    },
    xaxis: {
      show: false,
      categories: [""],
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: false,
      showAlways: false,
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      },
      labels: {
        show: false,        }
      },
    tooltip: {
      y: {
        // formatter: function (val) {
        //   return val + "K"
        // }
      }
    },
    fill: {
      opacity: 1
    
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      offsetX: 40
    }
    };
  }

  ngOnInit(): void {
    this._route.queryParams.subscribe((sprintId: any) => {
      if (sprintId['id']) {
          this.sprintId = parseInt(sprintId['id'])
      }
      });
    let payload = {
      sprintId:this.sprintId,
    }
    this.getSprintProgress(payload);
  }
   
  getSprintProgress(paylaod: any) {
    this.initialLoading = true;
    this.ProjectService.getSprintProgress(paylaod).subscribe((res: any) => {
      if(res.data){
      this.sprintProgressList = res.data
      this.totalRecored = this.sprintProgressList.length 
      console.log(this.sprintProgressList)
        if(this.sprintProgressList.todo > 0){
        this.resultProgress = [
          ...this.resultProgress,
          {
            name: "Todo",
            data: this.sprintProgressList.todo,
          }
        ];
      }
      if(this.sprintProgressList.inProgress > 0){
        this.resultProgress = [
          ...this.resultProgress,
          {
            name: "In Progress",
            data: this.sprintProgressList.inProgress,
          }
        ];
      }
      if(this.sprintProgressList.done > 0){
        this.resultProgress = [
          ...this.resultProgress,
          {
            name: "Done",
            data: this.sprintProgressList.done,
          }
        ];
      }
      if(this.sprintProgressList.readyForQA > 0){
        this.resultProgress = [
          ...this.resultProgress,
          {
            name: "Ready For QA",
            data: this.sprintProgressList.readyForQA,
          }
        ];
      }
      console.log(this.resultProgress)
      this.chartOptions.series = 
      [{
        name: 'Todo',
        data: [this.sprintProgressList.todo ]
      }, {
        name: 'In Progress',
        data: [this.sprintProgressList.inProgress]
      }, {
        name: 'Done',
        data: [this.sprintProgressList.done]
      },  {
        name: 'Ready For QA',
        data: [this.sprintProgressList.readyForQA]
      }],
      this.initialLoading = false;
      }else{
        this.totalRecored =  0;
        this.initialLoading = false;
      }
    }, error => {
      this.initialLoading = false;
    })
  }
}
