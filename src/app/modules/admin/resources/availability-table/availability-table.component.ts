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
        name: 'Anish Patil',
        technicalSkill:
            'Javascript,Typescript,Material UI,HTML,CSS/SCSS,Python/Django,GraphQL,MySQL,Postgresql,ReactJS',
        capacity: 1.0,
        availableFrom: '2023-12-18T10:13:51.909+00:00',
        availableFromString: '18-12-2023',
        experience: '1 years 10 months',
        profileUrl: 'https://dashboard.dev.mindbowser.com/resources/view/21',
        resourceId: 21,
        style: 'RED',
        cellData: null,
        careerStartDate: '2022-02-12T18:30:00.000+00:00',
    },
    {
        name: 'Anuja Pise',
        technicalSkill: 'Android (Java),Android (Kotlin),React Native',
        capacity: 0.5,
        availableFrom: '2023-12-18T10:13:52.112+00:00',
        availableFromString: '18-12-2023',
        experience: '5 years 10 months',
        profileUrl: 'https://dashboard.dev.mindbowser.com/resources/view/11',
        resourceId: 11,
        style: 'RED',
        cellData: null,
        careerStartDate: '2018-01-31T18:30:00.000+00:00',
    },
    {
        name: 'Hirdesh  Kumar',
        technicalSkill:
            'HTML,Typescript,Material UI,Express,NextJS,Javascript,ReactJS,NodeJS,MongoDB',
        capacity: 1.0,
        availableFrom: '2023-12-18T10:13:52.151+00:00',
        availableFromString: '18-12-2023',
        experience: '5 years 0 months',
        profileUrl: 'https://dashboard.dev.mindbowser.com/resources/view/16',
        resourceId: 16,
        style: 'RED',
        cellData: null,
        careerStartDate: '2018-12-04T18:30:00.000+00:00',
    },
    {
        name: 'sanket salvi',
        technicalSkill:
            'GCP,AWS - S3,AWS - EKS,AWS - IAM,AWS - VPC,Prowler,Kubernates,AWS,Terraform,AWS - EC2,Docker',
        capacity: 1.0,
        availableFrom: '2023-12-18T10:13:52.248+00:00',
        availableFromString: '18-12-2023',
        experience: '4 years 1 months',
        profileUrl: 'https://dashboard.dev.mindbowser.com/resources/view/8',
        resourceId: 8,
        style: 'RED',
        cellData: null,
        careerStartDate: '2019-11-15T18:30:00.000+00:00',
    },
    {
        name: 'Ankit Yadav',
        technicalSkill: 'Android (Java),iOS (Swift),Angular,Flutter(Dart)',
        capacity: 0.75,
        availableFrom: '2023-12-18T10:13:52.379+00:00',
        availableFromString: '18-12-2023',
        experience: '8 years 6 months',
        profileUrl: 'https://dashboard.dev.mindbowser.com/resources/view/6',
        resourceId: 6,
        style: 'RED',
        cellData: null,
        careerStartDate: '2015-06-14T18:30:00.000+00:00',
    },
    {
        name: 'Cynola Rodricks',
        technicalSkill: 'NA',
        capacity: 0.5,
        availableFrom: '2023-12-18T10:13:52.466+00:00',
        availableFromString: '18-12-2023',
        experience: '10 years 10 months',
        profileUrl: 'https://dashboard.dev.mindbowser.com/resources/view/14',
        resourceId: 14,
        style: 'RED',
        cellData: null,
        careerStartDate: '2013-02-01T18:30:00.000+00:00',
    },
    {
        name: 'Ketulkumar Thakor',
        technicalSkill: 'iOS (Swift),Javascript,Typescript,React Native',
        capacity: 1.0,
        availableFrom: '2023-12-18T10:13:52.484+00:00',
        availableFromString: '18-12-2023',
        experience: '5 years 9 months',
        profileUrl: 'https://dashboard.dev.mindbowser.com/resources/view/3',
        resourceId: 3,
        style: 'RED',
        cellData: null,
        careerStartDate: '2018-03-19T18:30:00.000+00:00',
    },
    {
        name: 'Ramireddy Vijaykanth Reddy',
        technicalSkill: 'Kubernates,Shell Script,AWS,Docker,Jenkins,Terraform',
        capacity: 1.0,
        availableFrom: '2023-12-18T10:13:52.531+00:00',
        availableFromString: '18-12-2023',
        experience: '3 years 11 months',
        profileUrl: 'https://dashboard.dev.mindbowser.com/resources/view/22',
        resourceId: 22,
        style: 'RED',
        cellData: null,
        careerStartDate: '2020-01-20T18:30:00.000+00:00',
    },
    {
        name: 'Maithili Savant',
        technicalSkill: 'Javascript,Typescript,Material UI,ReactJS',
        capacity: 1.0,
        availableFrom: '2023-12-18T10:13:52.559+00:00',
        availableFromString: '18-12-2023',
        experience: '3 years 5 months',
        profileUrl: 'https://dashboard.dev.mindbowser.com/resources/view/23',
        resourceId: 23,
        style: 'RED',
        cellData: null,
        careerStartDate: '2020-07-11T18:30:00.000+00:00',
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
