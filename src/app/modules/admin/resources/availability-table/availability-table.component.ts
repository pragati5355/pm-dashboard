import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ResourcesService } from '../common/services/resources.service';

export interface TableElement {
    name: string;
    skills: string;
    capacity: number;
    available: string;
    experience: string;
    profile: string;
}

export interface TableInterface {
    name?: string;
    technicalSkill?: string;
    capacity?: number;
    availableFrom?: string;
    availableFromString?: string;
    experience?: string;
    profileUrl?: string;
    resourceId?: number;
    style?: string;
    cellData?: any;
    careerStartDate?: string;
}

const ELEMENT_DATA: TableInterface[] = [
    {
        name: 'rohan kadam',
        technicalSkill: 'HTML,css',
        capacity: 0.25,
        availableFromString: '18-12-2023',
        experience: '1 years 10 months',
        profileUrl: 'https://dashboard.dev.mindbowser.com/resources/view/21',
        resourceId: 1,
    },
    {
        name: 'Anish Patil',
        technicalSkill: 'Android (Java),Android (Kotlin),React Native',
        capacity: 0.5,
        availableFromString: '18-08-2023',
        experience: '2 years 10 months',
        profileUrl: 'https://dashboard.dev.mindbowser.com/resources/view/21',
        resourceId: 2,
    },
    {
        name: 'Ketulkumar Thakor',
        technicalSkill: 'Kubernates,Shell Script,AWS,Docker,Jenkins,Terraform',
        capacity: 0.1,
        availableFromString: '01-03-2023',
        experience: '5 years 10 months',
        profileUrl: 'https://dashboard.dev.mindbowser.com/resources/view/21',
        resourceId: 3,
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
        'technicalSkill',
        'capacity',
        'availableFromString',
        'experience',
        'profileUrl',
    ];
    dataSource = new MatTableDataSource(ELEMENT_DATA);
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _liveAnnouncer: LiveAnnouncer,
        private router: Router,
        private resourceService: ResourcesService
    ) {}

    ngOnInit(): void {
        // this.resourceService.getAvailabilityData().subscribe((res: any) => {
        //     if (res?.data) {
        //         this.dataSource = new MatTableDataSource(res?.data);
        //     }
        // });
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
    viewResourceProfile(resourceId: string) {
        if (resourceId) {
            this.router.navigate([`/resources/view/${resourceId}`]);
        }
    }
}
