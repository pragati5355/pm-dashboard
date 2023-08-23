import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-work-logs-download',
  templateUrl: './work-logs-download.component.html',
  styleUrls: ['./work-logs-download.component.scss']
})
export class WorkLogsDownloadComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<WorkLogsDownloadComponent>,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  close(){
      this.matDialogRef.close();
  }
}
