import { Component, OnInit } from '@angular/core';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { MenteeListComponent } from '../mentee-list/mentee-list.component';

@Component({
    selector: 'app-view-mentee',
    templateUrl: './view-mentee.component.html',
    styleUrls: ['./view-mentee.component.scss'],
})
export class ViewMenteeComponent implements OnInit {
    initialLoading: boolean = false;
    mbProjects: any[] = [];
    resourceDetails: any = {
        id: 5,
        isDeleted: false,
        firstName: 'Pranita',
        lastName: 'Jadhav',
        email: 'pranita.jadhav@mindbowser.com',
        role: 'DESIGNER',
        addedBy: 15,
        year: 1,
        month: 2,
        dateOfJoining: 1644796800000,
        careerStartDate: 1607904000000,
        salary: 830,
        assignedProjects: null,
        assignedProject: ['Test project Pm'],
        capacity: 0.75,
        technologies: [
            {
                id: 10,
                createdAt: 1685951167140,
                lastModifiedAt: 1698755869501,
                isDeleted: false,
                technologyId: 46,
                name: 'python',
                experienceYear: 9,
                experienceMonth: 4,
                resourceId: 5,
                deleted: false,
            },
            {
                id: 9,
                createdAt: 1685951167126,
                lastModifiedAt: 1692817380423,
                isDeleted: false,
                technologyId: 5,
                name: 'Angular',
                experienceYear: 4,
                experienceMonth: 10,
                resourceId: 5,
                deleted: false,
            },
        ],
        integrations: [],
        certificates: null,
        pmOrMentorEmail: 'amaresh.joshi@mindbowser.com',
        mbProjects: null,
        resourceUrl: null,
        isVendor: false,
        deleted: false,
        vendor: false,
    };
    constructor(private menteeListComponent: MenteeListComponent) {}

    ngOnInit(): void {
        this.menteeListComponent.matDrawer.open();
    }

    closeDrawer(): Promise<MatDrawerToggleResult> {
        return this.menteeListComponent.matDrawer.close();
    }
}
