import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { chartConfig } from 'app/core/config/chart.config';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, ApexDataLabels, ApexNonAxisChartSeries, ApexStroke, ApexLegend, ApexFill, ApexTooltip, ApexPlotOptions, ApexResponsive, ApexYAxis, ApexGrid, ApexStates, ApexTheme, ApexAnnotations } from "ng-apexcharts";

@Component({
  selector: 'app-defect-leakage',
  templateUrl: './defect-leakage.component.html',
  styleUrls: ['./defect-leakage.component.scss']
})
export class DefectLeakageComponent implements OnInit {
  titleMain =""
  @Input() fill: ApexFill |any;
  @Input() chart: ApexChart | any;
  @Input() xaxis: ApexXAxis | any;
  @Input() labels: string[] | any;
  @Input() title: ApexTitleSubtitle | any;
  @Input() responsive: ApexResponsive[] | any;
  @Input() plotOptions: ApexPlotOptions | any;
  @Input() series: ApexAxisChartSeries | any;
  @Input() stroke: ApexStroke | any;
  @Input() colors: string[] | any;
  @Input() legend: ApexLegend|any;
  @Input() dataType: any ;
  constructor() {
  }

  ngOnInit() {
    console.log(this.dataType)
    this.chartfunction()
  }
  chartfunction(){
    this.chart = chartConfig.Defect_Leakage_Chart[0].chart;
    this.legend = chartConfig.Defect_Leakage_Chart[0].legend;
    this.plotOptions = chartConfig.Defect_Leakage_Chart[0].plotOptions;
    this.stroke = chartConfig.Defect_Leakage_Chart[0].stroke;
    if(this.dataType == "defectLeakage"){
      this.fill = chartConfig.Defect_Leakage_Chart[0].fill;
      this.series = [70];
      this.labels = ['More Bugs to Fix during the Iteration'];
      this.titleMain = "Defect Leakage"
    }else{
      this.fill = chartConfig.Defect_Leakage_Chart[0].fullfill;
      this.series = [100];
      this.labels = ['All Test Cases Passed!'];
      this.titleMain = "Quality Percentage"
    }
    if(this.dataType == "defectLeakage"){
      this.colors = chartConfig.Defect_Leakage_Chart[0].colors;
    }else{
      this.colors = chartConfig.Defect_Leakage_Chart[0].fullcolors;
    }
  }

}
