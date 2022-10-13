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
import { NONE_TYPE } from '@angular/compiler';
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

  constructor() {
    this.chartOptions = {
      series: [{
      name: 'Marine Sprite',
      data: [44]
    }, {
      name: 'Striking Calf',
      data: [53]
    }, {
      name: 'Tank Picture',
      data: [12]
    },  {
      name: 'Reborn Kid',
      data: [34]
    }],
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
  }

}
