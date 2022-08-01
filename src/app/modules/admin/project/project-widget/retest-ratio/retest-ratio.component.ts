import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { chartConfig } from 'app/core/config/chart.config';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, ApexDataLabels, ApexNonAxisChartSeries, ApexStroke, ApexLegend, ApexFill, ApexTooltip, ApexPlotOptions, ApexResponsive, ApexYAxis, ApexGrid, ApexStates, ApexTheme, ApexAnnotations } from "ng-apexcharts";

@Component({
  selector: 'app-retest-ratio',
  templateUrl: './retest-ratio.component.html',
  styleUrls: ['./retest-ratio.component.scss']
})
export class RetestRatioComponent implements OnInit {

  @Input() chart: ApexChart | any;
  @Input() xaxis: ApexXAxis | any;
  @Input() labels: string[] | any;
  @Input() legend: ApexLegend | any;
  @Input() title: ApexTitleSubtitle | any;
  @Input() responsive: ApexResponsive[] | any;
  @Input() plotOptions: ApexPlotOptions | any;
  @Input() series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  data: any;
  // @Input() yaxis: ApexYAxis | ApexYAxis[];
  // @Input() annotations: ApexAnnotations;
  @Input() colors: string[]|any;
  // @Input() dataLabels: ApexDataLabels;
  // @Input() stroke: ApexStroke;
  // @Input() fill: ApexFill;
  // @Input() tooltip: ApexTooltip;
  // @Input() grid: ApexGrid;
  // @Input() states: ApexStates;
  // @Input() subtitle: ApexTitleSubtitle;
  // @Input() theme: ApexTheme;

  constructor() {
    this.data = chartConfig.retest_ratio_chart[0];
    
    this.colors = chartConfig.retest_ratio_chart[0].colors;
    this.series = chartConfig.retest_ratio_chart[0].series;
    this.chart = chartConfig.retest_ratio_chart[0].chart;
    this.labels = chartConfig.retest_ratio_chart[0].labels;
    this.plotOptions = chartConfig.retest_ratio_chart[0].plotOptions;
    this.legend = chartConfig.retest_ratio_chart[0].legend;
  }

  ngOnInit() {
  }

}
