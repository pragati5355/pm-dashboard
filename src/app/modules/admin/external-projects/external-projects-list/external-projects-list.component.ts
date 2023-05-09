import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-external-projects-list',
    templateUrl: './external-projects-list.component.html',
    styleUrls: ['./external-projects-list.component.scss'],
})
export class ExternalProjectsListComponent implements OnInit {
    projectList = [
        {
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
        },
        {
            projectName: 'Foxnfork Food Network',
            technologys: [
                'React-Native',
                'Angular',
                'Microservices',
                'Node Js',
            ],
            teamMembers: ['Amaresh', 'Rohit'],
            clientDetails: [
                { name: 'Rohan Kadam', email: 'rohan.kadam@mindbowser.com' },
                {
                    name: 'Amaresh Joshi',
                    email: 'amaresh.joshi@mindbowser.com',
                },
            ],
        },
        {
            projectName: 'Foxnfork Food Network',
            technologys: [
                'React-Native',
                'Angular',
                'Microservices',
                'Node Js',
            ],
            teamMembers: ['Amaresh', 'Rohit', 'Rohan kadam'],
            clientDetails: [
                { name: 'Rohan Kadam', email: 'rohan.kadam@mindbowser.com' },
                {
                    name: 'Amaresh Joshi',
                    email: 'amaresh.joshi@mindbowser.com',
                },
            ],
        },
    ];

    initialLoading: boolean = false;
    constructor(private router: Router) {}

    ngOnInit(): void {}

    goToExternalProjectDetails(id: number) {
        this.router.navigate([`/external-projects/details/${id}`]);
    }
}
