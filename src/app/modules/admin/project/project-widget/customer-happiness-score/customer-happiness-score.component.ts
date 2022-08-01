import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { chartConfig } from 'app/core/config/chart.config';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, ApexDataLabels, ApexNonAxisChartSeries, ApexStroke, ApexLegend, ApexFill, ApexTooltip, ApexPlotOptions, ApexResponsive, ApexYAxis, ApexGrid, ApexStates, ApexTheme, ApexAnnotations } from "ng-apexcharts";


@Component({
  selector: 'app-customer-happiness-score',
  templateUrl: './customer-happiness-score.component.html',
  styleUrls: ['./customer-happiness-score.component.scss']
})
export class CustomerHappinessScoreComponent implements OnInit {
  @Input() fill: ApexFill;
  @Input() chart: ApexChart | any;
  @Input() xaxis: ApexXAxis | any;
  @Input() labels: string[] | any;
  @Input() title: ApexTitleSubtitle | any;
  @Input() responsive: ApexResponsive[] | any;
  @Input() plotOptions: ApexPlotOptions | any;
  @Input() series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  @Input() yaxis: ApexYAxis | ApexYAxis[] | any;
  @Input() annotations: ApexAnnotations | any;
  @Input() colors: string[] | any;
  @Input() dataLabels: ApexDataLabels | any;
  @Input() stroke: ApexStroke | any;
  @Input() legend: ApexLegend | any;
  @Input() tooltip: ApexTooltip | any;
  @Input() grid: ApexGrid | any;
  @Input() states: ApexStates | any;
  @Input() subtitle: ApexTitleSubtitle | any;
  @Input() theme: ApexTheme | any;

  constructor() {
    this.fill = chartConfig.Customer_Happiness_Score_Chart[0].fill;
    this.chart = chartConfig.Customer_Happiness_Score_Chart[0].chart;
    this.series = chartConfig.Customer_Happiness_Score_Chart[0].series;
    this.labels = chartConfig.Customer_Happiness_Score_Chart[0].labels;
    this.legend = chartConfig.Customer_Happiness_Score_Chart[0].legend;
    this.stroke = chartConfig.Customer_Happiness_Score_Chart[0].stroke;
    this.responsive = chartConfig.Customer_Happiness_Score_Chart[0].responsive;
    this.plotOptions = chartConfig.Customer_Happiness_Score_Chart[0].plotOptions;
  }

  ngOnInit() {
  }

}
