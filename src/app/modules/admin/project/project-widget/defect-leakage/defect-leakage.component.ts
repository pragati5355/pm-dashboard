import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { chartConfig } from 'app/core/config/chart.config';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, ApexDataLabels, ApexNonAxisChartSeries, ApexStroke, ApexLegend, ApexFill, ApexTooltip, ApexPlotOptions, ApexResponsive, ApexYAxis, ApexGrid, ApexStates, ApexTheme, ApexAnnotations } from "ng-apexcharts";

@Component({
  selector: 'app-defect-leakage',
  templateUrl: './defect-leakage.component.html',
  styleUrls: ['./defect-leakage.component.scss']
})
export class DefectLeakageComponent implements OnInit {
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
  @Input() colors: string[];
  // @Input() dataLabels: ApexDataLabels;
  // @Input() stroke: ApexStroke;
  @Input() legend: ApexLegend|any;
  // @Input() tooltip: ApexTooltip;
  // @Input() grid: ApexGrid;
  // @Input() states: ApexStates;
  // @Input() subtitle: ApexTitleSubtitle;
  // @Input() theme: ApexTheme;

  constructor() {
    this.fill = chartConfig.Defect_Leakage_Chart[0].fill;
    this.chart = chartConfig.Defect_Leakage_Chart[0].chart;
    this.colors = chartConfig.Defect_Leakage_Chart[0].colors;
    this.series = chartConfig.Defect_Leakage_Chart[0].series;
    this.labels = chartConfig.Defect_Leakage_Chart[0].labels;
    this.legend = chartConfig.Defect_Leakage_Chart[0].legend;
    this.plotOptions = chartConfig.Defect_Leakage_Chart[0].plotOptions;
  }

  ngOnInit() {
  }

}
