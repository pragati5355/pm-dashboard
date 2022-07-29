import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { chartConfig } from 'app/core/config/chart.config';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, ApexDataLabels, ApexNonAxisChartSeries, ApexStroke, ApexLegend, ApexFill, ApexTooltip, ApexPlotOptions, ApexResponsive, ApexYAxis, ApexGrid, ApexStates, ApexTheme, ApexAnnotations } from "ng-apexcharts";

@Component({
  selector: 'app-schedule-variance',
  templateUrl: './schedule-variance.component.html',
  styleUrls: ['./schedule-variance.component.scss']
})
export class ScheduleVarianceComponent implements OnInit {
  @Input() grid: ApexGrid;
  @Input() chart: ApexChart | any;
  @Input() xaxis: ApexXAxis | any;
  @Input() stroke: ApexStroke | any;
  @Input() dataLabels: ApexDataLabels;
  @Input() title: ApexTitleSubtitle | any;
  @Input() series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  // @Input() fill: ApexFill;
  // @Input() legend: ApexLegend | any;
  // @Input() plotOptions: ApexPlotOptions;
  // @Input() labels: string[];
  // @Input() responsive: ApexResponsive[];
  @Input() yaxis: ApexYAxis | ApexYAxis[] | any;
  // @Input() annotations: ApexAnnotations;
  // @Input() colors: string[];
  // @Input() tooltip: ApexTooltip;
  // @Input() states: ApexStates;
  // @Input() subtitle: ApexTitleSubtitle;
  // @Input() theme: ApexTheme;

  constructor() {
    this.grid = chartConfig.Schedule_Variance_chart[0].grid;
    this.xaxis = chartConfig.Schedule_Variance_chart[0].xaxis;
    this.yaxis = chartConfig.Schedule_Variance_chart[0].yaxis;
    this.chart = chartConfig.Schedule_Variance_chart[0].chart;
    this.title = chartConfig.Schedule_Variance_chart[0].title;
    this.series = chartConfig.Schedule_Variance_chart[0].series;
    this.stroke = chartConfig.Schedule_Variance_chart[0].stroke;
    this.dataLabels = chartConfig.Schedule_Variance_chart[0].dataLabels;
  }

  ngOnInit() {
  }

}
