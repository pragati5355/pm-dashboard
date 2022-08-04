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
  @Input() stroke: ApexStroke | any;
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
    this.chart = chartConfig.Defect_Leakage_Chart[0].chart;
    this.series = [70];
    this.labels = ['More Bugs to Fix during the Iteration'];
    this.legend = chartConfig.Defect_Leakage_Chart[0].legend;
    this.plotOptions = chartConfig.Defect_Leakage_Chart[0].plotOptions;
    this.stroke = chartConfig.Defect_Leakage_Chart[0].stroke;
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
