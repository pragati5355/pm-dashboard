import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { chartConfig } from 'app/core/config/chart.config';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, ApexDataLabels, ApexNonAxisChartSeries, ApexStroke, ApexLegend, ApexFill, ApexTooltip, ApexPlotOptions, ApexResponsive, ApexYAxis, ApexGrid, ApexStates, ApexTheme, ApexAnnotations } from "ng-apexcharts";

@Component({
  selector: 'app-project-timeline-chart',
  templateUrl: './project-timeline-chart.component.html'
})

export class ProjectTimelineChartComponent implements OnInit {
  @Input() fill: ApexFill;
  @Input() chart: ApexChart | any;
  @Input() xaxis: ApexXAxis | any;
  @Input() legend: ApexLegend | any;
  @Input() plotOptions: ApexPlotOptions;
  @Input() series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  @Input() labels: string[] | any;
  @Input() title: ApexTitleSubtitle | any;
  @Input() responsive: ApexResponsive[] | any;
  @Input() yaxis: ApexYAxis | ApexYAxis[] | any;
  @Input() annotations: ApexAnnotations | any;
  @Input() colors: string[] | any;
  @Input() dataLabels: ApexDataLabels | any;
  @Input() stroke: ApexStroke | any;
  @Input() tooltip: ApexTooltip | any;
  @Input() grid: ApexGrid | any;
  @Input() states: ApexStates | any;
  @Input() subtitle: ApexTitleSubtitle | any;
  @Input() theme: ApexTheme | any;

  constructor() {
    this.series = chartConfig.Timeline_Chart[0].series;
    this.chart = chartConfig.Timeline_Chart[0].chart;
    this.plotOptions = chartConfig.Timeline_Chart[0].plotOptions;
    this.xaxis = chartConfig.Timeline_Chart[0].xaxis
    this.fill = chartConfig.Timeline_Chart[0].fill;
    this.legend = chartConfig.Timeline_Chart[0].legend;
  }

  ngOnInit() {
  }

}
