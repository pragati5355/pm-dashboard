import { Component, Inject, OnInit } from '@angular/core';
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AddEditWorkLogComponent } from '../add-edit-work-log/add-edit-work-log.component';
import { MAT_TAB_MONTHS } from '../common/constants';

@Component({
    selector: 'app-work-log-list',
    templateUrl: './work-log-list.component.html',
    styleUrls: ['./work-log-list.component.scss'],
})
export class WorkLogListComponent implements OnInit {
    selected: string = '2020';
    currentYear: string = '';
    selectedTabIndex: number = 0;
    matTabList: any[] = MAT_TAB_MONTHS;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<WorkLogListComponent>,
        private matDialog: MatDialog
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
