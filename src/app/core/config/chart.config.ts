import { values } from "lodash";

export const chartConfig = {
    // Project Overall Project Score
    Overall_Project_Score_Chart: [{
        chart: {
            animations: {
                speed: 400,
                animateGradually: {
                    enabled: false
                }
            },
            fontFamily: 'inherit',
            foreColor: 'inherit',
            height: '100%',
            type: 'donut',
            sparkline: {
                enabled: true
            }
        },
        colors: ['#3182CE', '#63B3ED', "#231488", "#3ac5b7", "#e46e3b"],
        labels: ["Naynesh Rathod", "Rishikesh Salunkhe", "Suraj Jaiswal", "Pooja Tangade", "Sanskriti Gupta"],
        plotOptions: {
            pie: {
                customScale: 0.9,
                expandOnClick: false,
                donut: {
                    size: '70%'
                }
            }
        },
        series: [44, 55, 13, 43, 22],
        states: {
            hover: {
                filter: {
                    type: 'none'
                }
            },
            active: {
                filter: {
                    type: 'none'
                }
            }
        },
        tooltip: {
            enabled: true,
            fillSeriesColor: false,
            theme: 'dark',
        }
    }],
    // Project and Sprint Customer Happiness Score
    Customer_Happiness_Score_Chart: [{
        series: [100],
        chart: { type: "radialBar", offsetY: -20, height: '300' },
        fill: {
            type: "gradient",
            gradient: { shade: "light", shadeIntensity: 0.4, inverseColors: false, opacityFrom: 1, opacityTo: 1, stops: [0, 50, 53, 91] }
        },
        labels: ["All Test Cases Passed!"],
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
                    textAnchor: 'middle',
                    name: {
                        fontSize: "16px",
                        color: undefined,
                        offsetY: 55,
                    },
                    value: {
                        offsetY: 6,
                        fontSize: "22px",
                        color: undefined,
                        formatter: function (val: any) {
                            return val;
                        }
                    },
                }
            }
        },
        legend: { position: "top", horizontalAlign: "left" }
    }],
    // Project Timeline Chart
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

    // Sprint Start 
    // Sprint Defect Leakage  
    Defect_Leakage_Chart: [{
        chart: {
            height: 280, offsetY: -20, type: "radialBar",
        },
        series: [67],
        colors: ["#20E647"],
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                track: {
                    background: '#333',
                    startAngle: -90,
                    endAngle: 90,
                },
                dataLabels: {
                    name: {
                        fontSize: "16px",
                        color: undefined,
                        offsetY: 55,
                    },
                    value: {
                        offsetY: 15,
                        fontSize: "22px",
                        color: undefined,
                        formatter: function (val: any) {
                            return val;
                        }
                    },
                }
            }
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "dark",
                type: "horizontal",
                gradientToColors: ["#87D4F9"],
                stops: [0, 100]
            }
        },
        stroke: {
            lineCap: "butt"
        },
        labels: ["Progress"],
        legend: { position: "top", horizontalAlign: "left" }
    }],
    // Quality Percentage
    Quality_Percentage_Chart: [{
        series: [100],
        chart: { type: "radialBar", offsetY: -20, height: '300' },
        fill: {
            type: "gradient",
            gradient: { shade: "light", shadeIntensity: 0.4, inverseColors: false, opacityFrom: 1, opacityTo: 1, stops: [0, 50, 53, 91] }
        },
        labels: ["All Test Cases Passed!"],
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
                        fontSize: "16px",
                        color: undefined,
                        offsetY: 55,
                    },
                    value: {
                        offsetY: 6,
                        fontSize: "22px",
                        color: undefined,
                        formatter: function (val: any) {
                            return val;
                        }
                    },
                }
            }
        },
        legend: { position: "top", horizontalAlign: "left" }
    }],
    // Sprint Retest Ratio
    retest_ratio_chart: [{
        series: [44, 55, 67, 83],
        colors: ['#3182CE', '#63B3ED', "#3ac5b7", "#e46e3b"],

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
    // Sprint Schedule Variance
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
    }],
    // Sprint Progress
    Sprint_Progress_Chart: [{
        series: [100],
        chart: { type: "radialBar", offsetY: -20, height: '300' },
        fill: {
            type: "gradient",
            gradient: { shade: "light", shadeIntensity: 0.4, inverseColors: false, opacityFrom: 1, opacityTo: 1, stops: [0, 50, 53, 91] }
        },
        labels: ["All Test Cases Passed!"],
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
                    textAnchor: 'middle',
                    name: {
                        fontSize: "16px",
                        color: undefined,
                        offsetY: 55,
                    },
                    value: {
                        offsetY: 6,
                        fontSize: "22px",
                        color: undefined,
                        formatter: function (val: any) {
                            return val;
                        }
                    },
                }
            }
        },
        legend: { position: "top", horizontalAlign: "left" }
    }],
}
export interface ChartInterface {
    [key: string]: string;
}