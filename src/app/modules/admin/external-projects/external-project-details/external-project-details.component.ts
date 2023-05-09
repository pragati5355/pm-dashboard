import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-external-project-details',
    templateUrl: './external-project-details.component.html',
    styleUrls: ['./external-project-details.component.scss'],
})
export class ExternalProjectDetailsComponent implements OnInit {
    projectDetails = {
        projectName: 'Metrics',
        technologys: ['Java', 'Angular', 'Microservices', 'Node Js'],
        teamMembers: [
            'Amaresh',
            'Rohit',
            'Rohan kadam',
            'Amaresh',
            'Rohit',
            'Rohan kadam',
        ],
        clientDetails: [
            { name: 'Rohan Kadam', email: 'rohan.kadam@mindbowser.com' },
            {
                name: 'Amaresh Joshi',
                email: 'amaresh.joshiasdasdasd@mindbowser.com',
            },
            {
                name: 'Amaresh Joshi',
                email: 'amaresh.joshi@mindbowser.com',
            },
        ],
        resourceDetails: [
            {
                name: 'Rohan kadam',
                Utilization: 0.5,
                startDate: 1682812800000,
                endDate: 1682812800000,
            },
            {
                name: 'Rohan kadam',
                Utilization: 0.5,
                startDate: 1682812800000,
                endDate: 1682812800000,
            },
            {
                name: 'Rohan kadam',
                Utilization: 0.5,
                startDate: 1682812800000,
                endDate: 1682812800000,
            },
            {
                name: 'Rohan kadam',
                Utilization: 0.5,
                startDate: 1682812800000,
                endDate: 1682812800000,
            },
        ],
    };

    constructor() {}

    ngOnInit(): void {}
}
