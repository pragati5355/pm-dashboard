export const chartConfig = {
    Timeline_Chart: [{
        series: [
            {
                name: "Bob",
                data: [
                    {
                        x: "Design",
                        y: [
                            new Date("2019-03-05").getTime(),
                            new Date("2019-03-08").getTime()
                        ]
                    },
                    {
                        x: "Code",
                        y: [
                            new Date("2019-03-02").getTime(),
                            new Date("2019-03-05").getTime()
                        ]
                    },
                    {
                        x: "Code",
                        y: [
                            new Date("2019-03-05").getTime(),
                            new Date("2019-03-07").getTime()
                        ]
                    },
                    {
                        x: "Test",
                        y: [
                            new Date("2019-03-03").getTime(),
                            new Date("2019-03-09").getTime()
                        ]
                    },
                    {
                        x: "Test",
                        y: [
                            new Date("2019-03-08").getTime(),
                            new Date("2019-03-11").getTime()
                        ]
                    },
                    {
                        x: "Validation",
                        y: [
                            new Date("2019-03-11").getTime(),
                            new Date("2019-03-16").getTime()
                        ]
                    },
                    {
                        x: "Design",
                        y: [
                            new Date("2019-03-01").getTime(),
                            new Date("2019-03-03").getTime()
                        ]
                    }
                ]
            },
            {
                name: "Joe",
                data: [
                    {
                        x: "Design",
                        y: [
                            new Date("2019-03-02").getTime(),
                            new Date("2019-03-05").getTime()
                        ]
                    },
                    {
                        x: "Test",
                        y: [
                            new Date("2019-03-06").getTime(),
                            new Date("2019-03-16").getTime()
                        ]
                    },
                    {
                        x: "Code",
                        y: [
                            new Date("2019-03-03").getTime(),
                            new Date("2019-03-07").getTime()
                        ]
                    },
                    {
                        x: "Deployment",
                        y: [
                            new Date("2019-03-20").getTime(),
                            new Date("2019-03-22").getTime()
                        ]
                    },
                    {
                        x: "Design",
                        y: [
                            new Date("2019-03-10").getTime(),
                            new Date("2019-03-16").getTime()
                        ]
                    }
                ]
            },
            {
                name: "Dan",
                data: [
                    {
                        x: "Code",
                        y: [
                            new Date("2019-03-10").getTime(),
                            new Date("2019-03-17").getTime()
                        ]
                    },
                    {
                        x: "Validation",
                        y: [
                            new Date("2019-03-05").getTime(),
                            new Date("2019-03-09").getTime()
                        ]
                    }
                ]
            }
        ],
        chart: {
            height: 350,
            type: "rangeBar"
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: "80%"
            }
        },
        xaxis: {
            type: "datetime"
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "light",
                type: "vertical",
                shadeIntensity: 0.25,
                gradientToColors: undefined,
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [50, 0, 100, 100]
            }
        },
        legend: {
            position: "top",
            horizontalAlign: "left"
        }
    }],
    Pie_Chart: [{
        series: [44, 55, 13, 43, 22],
        chart: { type: "donut", height: '300' },
        title: { text: "Overall Project Score" },
        labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
        xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"] },
        responsive: [{ breakpoint: 480, options: { chart: { width: 200 }, legend: { position: "bottom" } } }],
        legend: { position: "top", horizontalAlign: "left" }
    }],
    Semi_Circle_Gauge_Chart: [{
        series: [76],
        chart: { type: "radialBar", offsetY: -20, height: '300' },
        fill: {
            type: "gradient",
            gradient: { shade: "light", shadeIntensity: 0.4, inverseColors: false, opacityFrom: 1, opacityTo: 1, stops: [0, 50, 53, 91] }
        },
        labels: ["Average Results"],
        xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"] },
        responsive: [{ breakpoint: 480, options: { chart: { width: 200 }, legend: { position: "bottom" } } }],
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                track: {
                    background: "#e7e7e7",
                    strokeWidth: "97%",
                    margin: 5, // margin is in pixels
                    dropShadow: {
                        enabled: true,
                        top: 2,
                        left: 0,
                        opacity: 0.31,
                        blur: 2
                    }
                },
                dataLabels: {
                    name: {
                        show: false
                    },
                    value: {
                        offsetY: -2,
                        fontSize: "22px"
                    }
                }
            }
        },
        legend: { position: "top", horizontalAlign: "left" }
    }],
    retest_ratio_chart: [{
        series: [44, 55, 67, 83],
        chart: { height: 200, type: "radialBar" },
        legend: { position: "top", horizontalAlign: "left" },
        plotOptions: {
            radialBar: {
                dataLabels: {
                    name: {
                        fontSize: "22px"
                    },
                    value: {
                        fontSize: "16px"
                    },
                    total: {
                        show: true,
                        label: "Total",
                        formatter: function (w: any) {
                            return "249";
                        }
                    }
                }
            }
        },
        labels: ["Apples", "Oranges", "Bananas", "Berries"]
    }],
    Schedule_Variance_chart: [{
        series: [
            {
                name: "Desktops",
                data: [210, 181, 155, 161, 109, 72, 55, 22, 18]
            },
            {
                name: "Laptops",
                data: [184, 141, 135, 91, 76, 62, 69, 44, 28]
            }
        ],
        chart: {
            height: 350,
            width:650,
            type: "line",
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: "straight"
        },
        title: {
            text: "Schedule Variance",
            align: "left"
        },
        grid: {
            row: {
                colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                opacity: 0.5
            }
        },
        xaxis: {
            categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep"
            ]
        },
        yaxis: {
            categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep"
            ]
        }
    }]
}
export interface ChartInterface {
    [key: string]: string;
}