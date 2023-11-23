import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-one-to-one-form',
  templateUrl: './view-one-to-one-form.component.html',
  styleUrls: ['./view-one-to-one-form.component.scss']
})
export class ViewOneToOneFormComponent implements OnInit {

  public form!: Object;
  formData: any;
  initialLoading = false;
  pdfUrl: string = '';

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      public matDialogRef: MatDialogRef<ViewOneToOneFormComponent>
  ) {}

  ngOnInit(): void {
      this.pdfUrl = this.data?.link;
  }

  close() {
      this.matDialogRef.close();
  }

}
