import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Router } from '@angular/router';
import { ResourcesService } from '../common/services/resources.service';

export interface TableElement {
    resource: string;
    project: string;
    utilization: number;
    start: string;
    end: string;
    shadow: string;
}

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
    dataSource = new MatTableDataSource();
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _liveAnnouncer: LiveAnnouncer,
        private router: Router,
        private resourceService: ResourcesService
    ) {}

    ngOnInit(): void {
        this.loadTableData();
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

    goBack() {
        this.router.navigate(['/resources']);
    }
    private loadTableData() {
        this.resourceService.getUtilizationData().subscribe((res: any) => {
            if (res?.data) {
                this.dataSource = new MatTableDataSource(res?.data);
                this.dataSource.sort = this.sort;
            }
        });
    }
}
