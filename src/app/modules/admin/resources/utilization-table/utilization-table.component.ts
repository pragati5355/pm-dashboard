import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';

export interface TableElement {
    resource: string;
    project: string;
    utilization: number;
    start: string;
    end: string;
    shadow: string;
}

const ELEMENT_DATA: TableElement[] = [
    {
        resource: 'Rohan kadam',
        project: 'Metrics',
        utilization: 0.5,
        start: '12/12/2023',
        end: '12/12/2024',
        shadow: 'Yes',
    },
    {
        resource: 'Amaresh joshi',
        project: 'Healthlink',
        utilization: 1,
        start: '21/08/2023',
        end: '12/07/2024',
        shadow: 'NO',
    },
    {
        resource: 'Rohan kadam',
        project: 'Healthlink',
        utilization: 0.5,
        start: '21/09/2023',
        end: '15/09/2024',
        shadow: 'NO',
    },
    {
        resource: 'Pragati gawade',
        project: 'TTA',
        utilization: 0.2,
        start: '21/04/2023',
        end: '15/09/2023',
        shadow: 'NO',
    },
    {
        resource: 'Pranita jadhav',
        project: 'Core',
        utilization: 0.75,
        start: '11/06/2023',
        end: '01/09/2023',
        shadow: 'Yes',
    },
];
@Component({
    selector: 'app-utilization-table',
    templateUrl: './utilization-table.component.html',
    styleUrls: ['./utilization-table.component.scss'],
})
export class UtilizationTableComponent implements OnInit, AfterViewInit {
    resourceId: string | number;
    displayedColumns: string[] = [
        'resource',
        'project',
        'utilization',
        'start',
        'end',
        'shadow',
    ];
    dataSource = new MatTableDataSource(ELEMENT_DATA);
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private route: ActivatedRoute,
        private _liveAnnouncer: LiveAnnouncer
    ) {}

    ngOnInit(): void {
        this.addRouteSubscription();
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
    }

    announceSortChange(sortState: any) {
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    private addRouteSubscription() {
        this.route.paramMap.subscribe((paramMap) => {
            this.resourceId = paramMap.get('id');
            if (this.resourceId) {
                console.log(this.resourceId);
            }
        });
    }
}
