import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Router } from '@angular/router';

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
        resource: 'Pranita jadhav',
        project: 'Core',
        utilization: 0.75,
        start: '11/06/2023',
        end: '01/09/2023',
        shadow: 'Yes',
    },
    {
        resource: 'Suhail Chand',
        project: 'Courtyardly',
        utilization: 1.0,
        start: '2023-08-27T18:30:00.000+00:00',
        end: '2023-11-26T18:30:00.000+00:00',
        shadow: 'No',
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
        private _liveAnnouncer: LiveAnnouncer,
        private router: Router
    ) {}

    ngOnInit(): void {}

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

    goBack() {
        this.router.navigate(['/resources']);
    }
}
