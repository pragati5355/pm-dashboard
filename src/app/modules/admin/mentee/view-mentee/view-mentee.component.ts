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
    constructor(private menteeListComponent: MenteeListComponent) {}

    ngOnInit(): void {
        this.menteeListComponent.matDrawer.open();
    }

    closeDrawer(): Promise<MatDrawerToggleResult> {
        return this.menteeListComponent.matDrawer.close();
    }
}
