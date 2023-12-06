import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-feedback-form-view',
  templateUrl: './feedback-form-view.component.html',
  styleUrls: ['./feedback-form-view.component.scss']
})
export class FeedbackFormViewComponent implements OnInit {

  public form!: Object;
  formData: any;
  initialLoading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<FeedbackFormViewComponent>
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.matDialogRef.close();
  }

}
