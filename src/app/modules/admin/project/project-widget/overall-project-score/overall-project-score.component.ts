import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { chartConfig } from 'app/core/config/chart.config';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, ApexDataLabels, ApexNonAxisChartSeries, ApexStroke, ApexLegend, ApexFill, ApexTooltip, ApexPlotOptions, ApexResponsive, ApexYAxis, ApexGrid, ApexStates, ApexTheme, ApexAnnotations } from "ng-apexcharts";

@Component({
  selector: 'app-overall-project-score',
  templateUrl: './overall-project-score.component.html',
  styleUrls: ['./overall-project-score.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverallProjectScoreComponent implements OnInit {
  @Input() chart: ApexChart | any;
  @Input() xaxis: ApexXAxis | any;
  @Input() labels: string[] | any;
  @Input() title: ApexTitleSubtitle | any;
  @Input() responsive: ApexResponsive[] | any;
  @Input() series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  // @Input() yaxis: ApexYAxis | ApexYAxis[];
  // @Input() annotations: ApexAnnotations;
  @Input() colors: string[];
  // @Input() dataLabels: ApexDataLabels;
  // @Input() stroke: ApexStroke;
  // @Input() legend: ApexLegend;
  // @Input() fill: ApexFill;
  @Input() tooltip: ApexTooltip;
  @Input() plotOptions: ApexPlotOptions | any;
  // @Input() grid: ApexGrid;
  @Input() states: ApexStates;
  // @Input() subtitle: ApexTitleSubtitle;
  // @Input() theme: ApexTheme;
  data: any;
  constructor() {
    this.data = chartConfig.Overall_Project_Score_Chart[0];
    this.series = chartConfig.Overall_Project_Score_Chart[0].series;
    this.chart = chartConfig.Overall_Project_Score_Chart[0].chart;
    this.colors = chartConfig.Overall_Project_Score_Chart[0].colors;
    this.states = chartConfig.Overall_Project_Score_Chart[0].states;
    this.plotOptions = chartConfig.Overall_Project_Score_Chart[0].plotOptions;
    this.labels = chartConfig.Overall_Project_Score_Chart[0].labels;
    this.tooltip = chartConfig.Overall_Project_Score_Chart[0].tooltip;
  }

  ngOnInit() {
  }

}
