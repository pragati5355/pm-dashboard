import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-work-log-allow-edit-dialog',
  templateUrl: './work-log-allow-edit-dialog.component.html',
  styleUrls: ['./work-log-allow-edit-dialog.component.scss']
})
export class WorkLogAllowEditDialogComponent implements OnInit {

  submitInProcess = false;
  defaultResource: string;
  selectedResource : string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<WorkLogAllowEditDialogComponent>,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    if(this.data?.selectedResource == undefined){
      this.defaultResource = this.data?.defaultResource;
    }else{
      this.defaultResource = this.data?.selectedResource;
    }
  }
}
