import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { chartConfig } from 'app/core/config/chart.config';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, ApexDataLabels, ApexNonAxisChartSeries, ApexStroke, ApexLegend, ApexFill, ApexTooltip, ApexPlotOptions, ApexResponsive, ApexYAxis, ApexGrid, ApexStates, ApexTheme, ApexAnnotations } from "ng-apexcharts";

@Component({
  selector: 'app-quality-percentage',
  templateUrl: './quality-percentage.component.html',
  styleUrls: ['./quality-percentage.component.scss']
})
export class QualityPercentageComponent implements OnInit {
  @Input() fill: ApexFill;
  @Input() chart: ApexChart | any;
  @Input() xaxis: ApexXAxis | any;
  @Input() labels: string[] | any;
  @Input() title: ApexTitleSubtitle | any;
  @Input() responsive: ApexResponsive[] | any;
  @Input() plotOptions: ApexPlotOptions | any;
  @Input() series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  // @Input() yaxis: ApexYAxis | ApexYAxis[];
  // @Input() annotations: ApexAnnotations;
  @Input() stroke: ApexStroke | any;
  @Input() colors: string[];
  // @Input() dataLabels: ApexDataLabels;
  // @Input() stroke: ApexStroke;
  // @Input() legend: ApexLegend;
  // @Input() tooltip: ApexTooltip;
  // @Input() grid: ApexGrid;
  // @Input() states: ApexStates;
  // @Input() subtitle: ApexTitleSubtitle;
  // @Input() theme: ApexTheme;

  constructor() {
    // this.fill = chartConfig.Quality_Percentage_Chart[0].fill;
    this.chart = chartConfig.Quality_Percentage_Chart[0].chart;
    this.series = chartConfig.Quality_Percentage_Chart[0].series;
    this.labels = chartConfig.Quality_Percentage_Chart[0].labels;
    this.responsive = chartConfig.Quality_Percentage_Chart[0].responsive;
    this.plotOptions = chartConfig.Quality_Percentage_Chart[0].plotOptions;
    this.stroke = chartConfig.Quality_Percentage_Chart[0].stroke;
    if(this.series[0] < 100){
      this.fill = chartConfig.Defect_Leakage_Chart[0].fill;
    }else{
      this.fill = chartConfig.Defect_Leakage_Chart[0].fullfill;
    }
    if(this.series[0] < 100){
      this.colors = chartConfig.Defect_Leakage_Chart[0].colors;
    }else{
      this.colors = chartConfig.Defect_Leakage_Chart[0].fullcolors;
    }
  }

  ngOnInit() {
  }
}