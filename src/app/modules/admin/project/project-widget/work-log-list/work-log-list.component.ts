import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-work-log-list',
    templateUrl: './work-log-list.component.html',
    styleUrls: ['./work-log-list.component.scss'],
})
export class WorkLogListComponent implements OnInit {
    selected: string = '2020';
    currentYear: string = '';
    selectedTabIndex: number = 0;
    matTabList: any[] = [
        { value: 0, label: 'Jan' },
        { value: 1, label: 'Feb' },
        { value: 2, label: 'Mar' },
        { value: 3, label: 'Apr' },
        { value: 4, label: 'May' },
        { value: 5, label: 'Jun' },
        { value: 6, label: 'Jul' },
        { value: 7, label: 'Aug' },
        { value: 8, label: 'Sep' },
        { value: 9, label: 'Oct' },
        { value: 10, label: 'Nov' },
        { value: 11, label: 'Dec' },
    ];
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<WorkLogListComponent>
    ) {}

    ngOnInit(): void {
        this.getCurrentMonthAndYear();
    }

    close() {
        this.matDialogRef.close('close');
    }

    onTabChanged(event: any) {
        console.log(event);
    }

    private getCurrentMonthAndYear() {
        this.selected = String(new Date().getFullYear());
        this.selectedTabIndex = new Date().getMonth();
    }
}
