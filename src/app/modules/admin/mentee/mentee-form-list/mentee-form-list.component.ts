import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-mentee-form-list',
    templateUrl: './mentee-form-list.component.html',
    styleUrls: ['./mentee-form-list.component.scss'],
})
export class MenteeFormListComponent implements OnInit {
    menteeFormList: any[] = [
        {
            formName: '1 to 1 form',
            date: 'Jun 02 2023',
        },
        {
            formName: '1 to 1 form',
            date: 'Aug 03 2023',
        },
        {
            formName: '1 to 1 form',
            date: 'Sept 04 2023',
        },
        {
            formName: '1 to 1 form',
            date: 'Oct 02 2023',
        },
        {
            formName: '1 to 1 form',
            date: 'Nov 02 2023',
        },
        {
            formName: '1 to 1 form',
            date: 'Dec 02 2023',
        },
    ];
    constructor(private router: Router) {}

    ngOnInit(): void {}

    goBack() {
        this.router.navigate([`/mentee`]);
    }
}
