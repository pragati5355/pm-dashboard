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
            width: 280,
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
        },
        legend: { position: "top", horizontalAlign: "left" }
    }],
    // Project and Sprint Customer Happiness Score
    Customer_Happiness_Score_Chart: [{
        series: [75],
        chart: {
            height: 350,
            type: "radialBar",
            toolbar: {
                show: true
            }
        },
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                hollow: {
                    margin: 60,
                    size: "70%",
                    background: "transparent",
                    image: undefined,
                    position: "front",
                    dropShadow: {
                        enabled: true,
                        top: 3,
                        left: 0,
                        blur: 4,
                        opacity: 0.24
                    }
                },
                track: {
                    background: "#fff",
                    strokeWidth: "67%",
                    margin: 0, // margin is in pixels
                    dropShadow: {
                        enabled: true,
                        top: -3,
                        left: 0,
                        blur: 4,
                        opacity: 0.35
                    }
                },

                dataLabels: {
                    show: true,
                    value: {
                        formatter: function (val: any) {
                            return parseInt(val.toString(), 10).toString();
                        },
                        color: "#111",
                        fontSize: "30px",
                        show: true
                    }
                }
            }
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "dark",
                type: "horizontal",
                shadeIntensity: 0.5,
                gradientToColors: ["#ABE5A1"],
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100]
            }
        },
        // stroke: {
        //     lineCap: "round"
        // },
        stroke: {
            // curve: 'stepline',
            // OR provide an array
            curve: ['smooth', 'straight', 'stepline']
        },
        labels: ["All Test Cases Passed!"],
        responsive: [{ breakpoint: 480, options: { chart: { width: 200 }, legend: { position: "bottom" } } }],
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
    Pie_Chart: [{
        series: [44, 55, 13, 43, 22],
        chart: { type: "donut", height: '300' },
        title: { text: "Overall Project Score" },
        labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
        xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"] },
        responsive: [{ breakpoint: 480, options: { chart: { width: 200 }, legend: { position: "bottom" } } }],
        legend: { position: "top", horizontalAlign: "left" },
         dataLabels: { // add this part to remove %
            enabled: false,
          }
        }],
    // Sprint Start 
    // Sprint Defect Leakage  
    Defect_Leakage_Chart: [{
        chart: {
            height: 280, offsetY: -20, type: "radialBar",
        },
        series: [67],
        labels: ['More Bugs to Fix during the Iteration'],
        colors: ["#DC2626"],
        // fullcolors: ["#20E647"],
        fullcolors: ["#22C55E"],
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                hollow: {
                    
                    // image: '../../assets/mbicons/circle.svg',
                    // imageWidth: 10,
                    // imageHeight: 10,
                    // imageClipped: false
                  },
                track: {
                    dropShadow: {
                        enabled: true,
                        top: 2,
                        left: 0,
                        blur: 8,
                        opacity: 0.15
                      }
                },
                dataLabels: {
                    name: {
                        // show: false,
                        fontSize: "14px",
                        color: undefined,
                        offsetY: 65,
                        values: "More Bugs to Fix during the Iteration"
                    },
                    value: {
                        offsetY: 25,
                        fontSize: "22px",
                        color: undefined,
                        fontWeight: 800,
                    },
                }
            }
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "dark",
                type: "horizontal",
                // type: "gradient",
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                colorStops: [
                  {
                    offset: 20,
                    color: "#FF720D",
                    opacity: 1
                  },

                  {
                    offset: 100,
                    color: "#DC2626",
                    opacity: 1
                  }
                ]
              }
            // }
        },
        fullfill: {
            type: "gradient",
            gradient: {
                shade: "dark",
                type: "horizontal",
                // type: "gradient",
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                colorStops: [
                  {
                    offset: 2,
                    color: "#87D4F9",
                    opacity: 1
                  },

                  {
                    offset: 100,
                    color: "#22C55E",
                    opacity: 1
                  }
                ]
              }
            // }
        },
        stroke: {
            lineCap: "butt",
            dashArray: 2
        },
        legend: { position: "top", horizontalAlign: "left" },
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
        stroke: {
            lineCap: "butt",
            dashArray: 0
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
            enabled: true
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
    SCORE_CHART: [{
        chart: {
          height: 280,
          type: "radialBar",
        },
      
        series: [67],
        colors: ["#20E647"],
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 135,
            hollow: {
              margin: 20,
              size: "70%",
              background: "#293450",
            },
            track: {
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                blur: 8,
                opacity: 0.15
              }
            },
            dataLabels: {
              name: {
                show: false,
                offsetY: -10,
                color: "#fff",
                fontSize: "13px"
              },
              value: {
                offsetY: 12,
                color: "#fff",
                fontSize: "30px",
                show: true,
                formatter: function (val:any) {
                    return val 
                  }
              }
            }
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "vertical",
            gradientToColors: ["#87D4F9"],
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: "round"
        },
        labels: ["Progress"],
      } 
    ],

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