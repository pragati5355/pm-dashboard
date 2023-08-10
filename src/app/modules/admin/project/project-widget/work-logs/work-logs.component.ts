import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditWorkLogComponent } from '../add-edit-work-log/add-edit-work-log.component';
import { MAT_TAB_MONTHS } from '../common/constants';

@Component({
    selector: 'app-work-logs',
    templateUrl: './work-logs.component.html',
    styleUrls: ['./work-logs.component.scss'],
})
export class WorkLogsComponent implements OnInit {
    selected: string = '2020';
    currentYear: string = '';
    selectedTabIndex: number = 0;
    matTabList: any[] = MAT_TAB_MONTHS;
    constructor(private matDialog: MatDialog) {}

    ngOnInit(): void {
        this.getCurrentMonthAndYear();
    }

    close() {}

    onTabChanged(event: any) {
        console.log(event);
    }

    addOrEditWorklog() {
        const workLogdialogRef = this.matDialog.open(AddEditWorkLogComponent, {
            disableClose: true,
            width: '60%',
            maxHeight: '90vh',
            panelClass: 'warn-dialog-content',
            autoFocus: false,
            data: {},
        });
        workLogdialogRef.afterClosed().subscribe((result: any) => {
            if (result) {
            }
        });
    }

    private getCurrentMonthAndYear() {
        this.selected = String(new Date().getFullYear());
        this.selectedTabIndex = new Date().getMonth();
    }
}
