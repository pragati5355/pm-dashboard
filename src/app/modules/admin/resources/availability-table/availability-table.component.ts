import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface TableElement {
    name: string;
    skills: string;
    capacity: number;
    available: string;
    experience: string;
    profile: string;
}

const ELEMENT_DATA: TableElement[] = [
    {
        name: 'Rohan kadam',
        skills: 'iOS (Swift),Javascript,Typescript,React Native',
        capacity: 0.25,
        available: '01/12/2023 05:49:30',
        experience: '5 years 9 months',
        profile: 'https://dashboard.dev.mindbowser.com/resources/view/3',
    },
    {
        name: 'Shaikh Mohammad Affan Shamim Haider',
        skills: 'Javascript,Typescript,Material UI,HTML,CSS/SCSS,Python/Django,GraphQL,MySQL,Postgresql,ReactJS',
        capacity: 0.5,
        available: '18/12/2023 05:49:30',
        experience: '5 years 9 months',
        profile: 'https://dashboard.dev.mindbowser.com/resources/view/3',
    },
    {
        name: 'Rohan Shrivastava',
        skills: 'Springboot,Java,Postgresql,MySQL,GraphQL,Redis,JUnit,ReactJS',
        capacity: 1,
        available: '18/09/2023 05:49:30',
        experience: '1 years 9 months',
        profile: 'https://dashboard.dev.mindbowser.com/resources/view/3',
    },
];

@Component({
    selector: 'app-availability-table',
    templateUrl: './availability-table.component.html',
    styleUrls: ['./availability-table.component.scss'],
})
export class AvailabilityTableComponent implements OnInit {
    resourceId: string | number;
    displayedColumns: string[] = [
        'name',
        'skills',
        'capacity',
        'available',
        'experience',
        'profile',
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
    viewResourceProfile(url: string) {
        if (url) {
            this.router.navigate(['http://localhost:8080/resources/view/1']);
        }
    }
}
