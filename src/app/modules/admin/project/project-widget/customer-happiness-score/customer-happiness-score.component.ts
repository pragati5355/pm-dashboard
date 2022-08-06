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
    @Input() dataLabels: ApexResponsive[] | any;
    @Input() stroke: ApexStroke | any;
    @Input() legend: ApexLegend | any;
    @Input() tooltip: ApexTooltip | any;
    @Input() grid: ApexGrid | any;
    @Input() states: ApexStates | any;
    @Input() subtitle: ApexTitleSubtitle | any;
    @Input() theme: ApexTheme | any;

    constructor() {
        // this.fill = chartConfig.Semi_Circle_Gauge_Chart[0].fill;
        // this.chart = chartConfig.Semi_Circle_Gauge_Chart[0].chart;
        // this.xaxis = chartConfig.Semi_Circle_Gauge_Chart[0].xaxis;
        // this.series = chartConfig.Semi_Circle_Gauge_Chart[0].series;
        // this.labels = chartConfig.Semi_Circle_Gauge_Chart[0].labels;
        // this.responsive = chartConfig.Semi_Circle_Gauge_Chart[0].responsive;
        // this.plotOptions = chartConfig.Semi_Circle_Gauge_Chart[0].plotOptions;
        this.fill = chartConfig.SCORE_CHART[0].fill;
        this.chart = chartConfig.SCORE_CHART[0].chart;
        this.series = chartConfig.SCORE_CHART[0].series;
        this.labels = chartConfig.SCORE_CHART[0].labels;
        this.colors = chartConfig.SCORE_CHART[0].colors;
        this.stroke = chartConfig.SCORE_CHART[0].stroke;
        this.plotOptions = chartConfig.SCORE_CHART[0].plotOptions;
        // this.xaxis = chartConfig.SCORE_CHART[0].xaxis;
        // this.responsive = chartConfig.SCORE_CHART[0].responsive;
        // this.dataLabels =chartConfig.SCORE_CHART[0].dataLabels;
    }

    ngOnInit() {
    }

}
