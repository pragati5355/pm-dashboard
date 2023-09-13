import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-work-logs-list',
    templateUrl: './work-logs-list.component.html',
    styleUrls: ['./work-logs-list.component.scss'],
})
export class WorkLogsListComponent implements OnInit {
    foods: any[] = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos' },
    ];
    constructor() {}

    ngOnInit(): void {}
}
