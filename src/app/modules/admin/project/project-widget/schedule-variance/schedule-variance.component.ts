import {Component, Input, OnInit} from '@angular/core';
import {chartConfig} from 'app/core/config/chart.config';
import {
    ApexAnnotations,
    ApexAxisChartSeries,
    ApexChart,
    ApexDataLabels,
    ApexFill,
    ApexGrid,
    ApexLegend,
    ApexNonAxisChartSeries,
    ApexPlotOptions,
    ApexResponsive,
    ApexStates,
    ApexStroke,
    ApexTheme,
    ApexTitleSubtitle,
    ApexTooltip,
    ApexXAxis,
    ApexYAxis
} from "ng-apexcharts";
import {FormControl} from "@angular/forms";

@Component({
    selector: 'app-schedule-variance',
    templateUrl: './schedule-variance.component.html',
    styleUrls: ['./schedule-variance.component.scss']
})
export class ScheduleVarianceComponent implements OnInit {
    @Input() grid: ApexGrid;
    @Input() fill: ApexFill | any;
    @Input() chart: ApexChart | any;
    @Input() xaxis: ApexXAxis | any;
    @Input() theme: ApexTheme | any;
    @Input() colors: string[] | any;
    @Input() labels: string[] | any;
    @Input() stroke: ApexStroke | any;
    @Input() states: ApexStates | any;
    @Input() legend: ApexLegend | any;
    @Input() dataLabels: ApexDataLabels;
    @Input() tooltip: ApexTooltip | any;
    @Input() title: ApexTitleSubtitle | any;
    @Input() subtitle: ApexTitleSubtitle | any;
    @Input() responsive: ApexResponsive[] | any;
    @Input() plotOptions: ApexPlotOptions | any;
    @Input() annotations: ApexAnnotations | any;
    @Input() yaxis: ApexYAxis | ApexYAxis[] | any;
    @Input() series: ApexAxisChartSeries | ApexNonAxisChartSeries;
    chartData = [
        {name: 'Original Time Estimate'},
        {name: 'Story Points'}
    ]
    chartChange ="Original Time Estimate";

    constructor() {
        this.grid = chartConfig.Schedule_Variance_chart[0].grid;
        this.xaxis = chartConfig.Schedule_Variance_chart[0].xaxis;
        this.yaxis = chartConfig.Schedule_Variance_chart[0].yaxis;
        this.chart = chartConfig.Schedule_Variance_chart[0].chart;
        this.title = chartConfig.Schedule_Variance_chart[0].title;
        this.series = chartConfig.Schedule_Variance_chart[0].series;
        this.stroke = chartConfig.Schedule_Variance_chart[0].stroke;
        this.dataLabels = chartConfig.Schedule_Variance_chart[0].dataLabels;
    }

    ngOnInit() {
    }
    selectvalue(value:string){
     this.chartChange = value
    }
}
