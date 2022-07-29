import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { chartConfig } from 'app/core/config/chart.config';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, ApexDataLabels, ApexNonAxisChartSeries, ApexStroke, ApexLegend, ApexFill, ApexTooltip, ApexPlotOptions, ApexResponsive, ApexYAxis, ApexGrid, ApexStates, ApexTheme, ApexAnnotations } from "ng-apexcharts";

@Component({
  selector: 'app-project-timeline-chart',
  templateUrl: './project-timeline-chart.component.html',
  styleUrls: ['./project-timeline-chart.component.scss']
})

export class ProjectTimelineChartComponent implements OnInit {
  @Input() fill: ApexFill;
  @Input() chart: ApexChart | any;
  @Input() xaxis: ApexXAxis | any;
  @Input() legend: ApexLegend | any;
  @Input() plotOptions: ApexPlotOptions;
  @Input() series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  // @Input() labels: string[];
  // @Input() title: ApexTitleSubtitle;
  // @Input() responsive: ApexResponsive[];
  // @Input() yaxis: ApexYAxis | ApexYAxis[];
  // @Input() annotations: ApexAnnotations;
  // @Input() colors: string[];
  // @Input() dataLabels: ApexDataLabels;
  // @Input() stroke: ApexStroke;
  // @Input() tooltip: ApexTooltip;
  // @Input() grid: ApexGrid;
  // @Input() states: ApexStates;
  // @Input() subtitle: ApexTitleSubtitle;
  // @Input() theme: ApexTheme;

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
