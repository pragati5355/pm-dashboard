import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApexOptions } from 'ng-apexcharts';
import moment from 'moment';

@Component({
  selector: 'app-sprint-details',
  templateUrl: './sprint-details.component.html',
  styleUrls: ['./sprint-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SprintDetailsComponent implements OnInit {
  project_name = "This is a Project name";
  project_status = "On Track";
  project_progres = 45;
  chartGithubIssues: ApexOptions | any = {};
  chartTaskDistribution: ApexOptions | any = {};
  chartBudgetDistribution: ApexOptions | any = {};
  chartWeeklyExpenses: ApexOptions | any = {};
  chartMonthlyExpenses: ApexOptions | any = {};
  chartYearlyExpenses: ApexOptions | any = {};
  data: any;
  selectedProject: string = 'ACME Corp. Backend App';
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _router: Router
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  /**
   * Prepare the chart data from the data
   *
   * @private
   */
  private _prepareChartData(): void {
    // Github issues
    this.chartGithubIssues = {
      chart: {
        fontFamily: 'inherit',
        foreColor: 'inherit',
        height: '100%',
        type: 'line',
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      colors: ['#64748B', '#94A3B8'],
      dataLabels: {
        enabled: true,
        enabledOnSeries: [0],
        background: {
          borderWidth: 0
        }
      },
      grid: {
        borderColor: 'var(--fuse-border)'
      },
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      legend: {
        show: false
      },
      plotOptions: {
        bar: {
          columnWidth: '50%'
        }
      },
      series: [{
        'this-week': [
          {
            name: 'New issues',
            type: 'line',
            data: [42, 28, 43, 34, 20, 25, 22]
          },
          {
            name: 'Closed issues',
            type: 'column',
            data: [11, 10, 8, 11, 8, 10, 17]
          }
        ],
        'last-week': [
          {
            name: 'New issues',
            type: 'line',
            data: [37, 32, 39, 27, 18, 24, 20]
          },
          {
            name: 'Closed issues',
            type: 'column',
            data: [9, 8, 10, 12, 7, 11, 15]
          }
        ]
      }],
      states: {
        hover: {
          filter: {
            type: 'darken',
            value: 0.75
          }
        }
      },
      stroke: {
        width: [3, 0]
      },
      tooltip: {
        followCursor: true,
        theme: 'dark'
      },
      xaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          color: 'var(--fuse-border)'
        },
        labels: {
          style: {
            colors: 'var(--fuse-text-secondary)'
          }
        },
        tooltip: {
          enabled: false
        }
      },
      yaxis: {
        labels: {
          offsetX: -16,
          style: {
            colors: 'var(--fuse-text-secondary)'
          }
        }
      }
    };

    // Task distribution
    this.chartTaskDistribution = {
      chart: {
        fontFamily: 'inherit',
        foreColor: 'inherit',
        height: '100%',
        type: 'polarArea',
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      labels: ['API', 'Backend', 'Frontend', 'Issues'],
      legend: {
        position: 'bottom'
      },
      plotOptions: {
        polarArea: {
          spokes: {
            connectorColors: 'var(--fuse-border)'
          },
          rings: {
            strokeColor: 'var(--fuse-border)'
          }
        }
      },
      series: {
        'this-week': [15, 20, 38, 27],
        'last-week': [19, 16, 42, 23]
      },
      states: {
        hover: {
          filter: {
            type: 'darken',
            value: 0.75
          }
        }
      },
      stroke: {
        width: 2
      },
      theme: {
        monochrome: {
          enabled: true,
          color: '#93C5FD',
          shadeIntensity: 0.75,
          shadeTo: 'dark'
        }
      },
      tooltip: {
        followCursor: true,
        theme: 'dark'
      },
      yaxis: {
        labels: {
          style: {
            colors: 'var(--fuse-text-secondary)'
          }
        }
      }
    };

    // Budget distribution
    this.chartBudgetDistribution = {
      chart: {
        fontFamily: 'inherit',
        foreColor: 'inherit',
        height: '100%',
        type: 'radar',
        sparkline: {
          enabled: true
        }
      },
      colors: ['#818CF8'],
      dataLabels: {
        enabled: true,
        formatter: (val: number): string | number => `${val}%`,
        textAnchor: 'start',
        style: {
          fontSize: '13px',
          fontWeight: 500
        },
        background: {
          borderWidth: 0,
          padding: 4
        },
        offsetY: -15
      },
      markers: {
        strokeColors: '#818CF8',
        strokeWidth: 4
      },
      plotOptions: {
        radar: {
          polygons: {
            strokeColors: 'var(--fuse-border)',
            connectorColors: 'var(--fuse-border)'
          }
        }
      },
      series: [
        {
          name: 'Budget',
          data: [12, 20, 28, 15, 25]
        }
      ],
      stroke: {
        width: 2
      },
      tooltip: {
        theme: 'dark',
        y: {
          formatter: (val: number): string => `${val}%`
        }
      },
      xaxis: {
        labels: {
          show: true,
          style: {
            fontSize: '12px',
            fontWeight: '500'
          }
        },
        categories: ['Concept', 'Design', 'Development', 'Extras', 'Marketing'],
      },
      yaxis: {
        max: (max: number): number => parseInt((max + 10).toFixed(0), 10),
        tickAmount: 7
      }
    };

    // Weekly expenses
    this.chartWeeklyExpenses = {
      chart: {
        animations: {
          enabled: false
        },
        fontFamily: 'inherit',
        foreColor: 'inherit',
        height: '100%',
        type: 'line',
        sparkline: {
          enabled: true
        }
      },
      colors: ['#22D3EE'],
      series: [
        {
          name: 'Expenses',
          data: [4412, 4345, 4541, 4677, 4322, 4123]
        }
      ],
      stroke: {
        curve: 'smooth'
      },
      tooltip: {
        theme: 'dark'
      },
      xaxis: {
        type: 'category',
        categories: [
          moment().subtract(47, 'days').format('DD MMM') + ' - ' + moment().subtract(40, 'days').format('DD MMM'),
          moment().subtract(39, 'days').format('DD MMM') + ' - ' + moment().subtract(32, 'days').format('DD MMM'),
          moment().subtract(31, 'days').format('DD MMM') + ' - ' + moment().subtract(24, 'days').format('DD MMM'),
          moment().subtract(23, 'days').format('DD MMM') + ' - ' + moment().subtract(16, 'days').format('DD MMM'),
          moment().subtract(15, 'days').format('DD MMM') + ' - ' + moment().subtract(8, 'days').format('DD MMM'),
          moment().subtract(7, 'days').format('DD MMM') + ' - ' + moment().format('DD MMM')
        ]
      },
      yaxis: {
        labels: {
          formatter: (val: any): string => `$${val}`
        }
      }
    };

    // Monthly expenses
    this.chartMonthlyExpenses = {
      chart: {
        animations: {
          enabled: false
        },
        fontFamily: 'inherit',
        foreColor: 'inherit',
        height: '100%',
        type: 'line',
        sparkline: {
          enabled: true
        }
      },
      colors: ['#4ADE80'],
      series: [
        {
          name: 'Expenses',
          data: [15521, 15519, 15522, 15521]
        }
      ],
      stroke: {
        curve: 'smooth'
      },
      tooltip: {
        theme: 'dark'
      },
      xaxis: {
        type: 'category',
        categories: [
          moment().subtract(31, 'days').format('DD MMM') + ' - ' + moment().subtract(24, 'days').format('DD MMM'),
          moment().subtract(23, 'days').format('DD MMM') + ' - ' + moment().subtract(16, 'days').format('DD MMM'),
          moment().subtract(15, 'days').format('DD MMM') + ' - ' + moment().subtract(8, 'days').format('DD MMM'),
          moment().subtract(7, 'days').format('DD MMM') + ' - ' + moment().format('DD MMM')
        ]
      },
      yaxis: {
        labels: {
          formatter: (val: any): string => `$${val}`
        }
      }
    };

    // Yearly expenses
    this.chartYearlyExpenses = {
      chart: {
        animations: {
          enabled: false
        },
        fontFamily: 'inherit',
        foreColor: 'inherit',
        height: '100%',
        type: 'line',
        sparkline: {
          enabled: true
        }
      },
      colors: ['#FB7185'],
      series: [
        {
          name: 'Expenses',
          data: [45891, 45801, 45834, 45843, 45800, 45900, 45814, 45856, 45910, 45849]
        }
      ],
      stroke: {
        curve: 'smooth'
      },
      tooltip: {
        theme: 'dark'
      },
      xaxis: {
        type: 'category',
        categories: [
          moment().subtract(79, 'days').format('DD MMM') + ' - ' + moment().subtract(72, 'days').format('DD MMM'),
          moment().subtract(71, 'days').format('DD MMM') + ' - ' + moment().subtract(64, 'days').format('DD MMM'),
          moment().subtract(63, 'days').format('DD MMM') + ' - ' + moment().subtract(56, 'days').format('DD MMM'),
          moment().subtract(55, 'days').format('DD MMM') + ' - ' + moment().subtract(48, 'days').format('DD MMM'),
          moment().subtract(47, 'days').format('DD MMM') + ' - ' + moment().subtract(40, 'days').format('DD MMM'),
          moment().subtract(39, 'days').format('DD MMM') + ' - ' + moment().subtract(32, 'days').format('DD MMM'),
          moment().subtract(31, 'days').format('DD MMM') + ' - ' + moment().subtract(24, 'days').format('DD MMM'),
          moment().subtract(23, 'days').format('DD MMM') + ' - ' + moment().subtract(16, 'days').format('DD MMM'),
          moment().subtract(15, 'days').format('DD MMM') + ' - ' + moment().subtract(8, 'days').format('DD MMM'),
          moment().subtract(7, 'days').format('DD MMM') + ' - ' + moment().format('DD MMM')
        ]
      },
      yaxis: {
        labels: {
          formatter: (val: any): string => `$${val}`
        }
      }
    };
  }
}
