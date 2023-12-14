import { T } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddFormService } from '@services/add-form.service';
import { SnackBar } from 'app/core/utils/snackBar';

@Component({
  selector: 'app-feedback-form-view',
  templateUrl: './feedback-form-view.component.html',
  styleUrls: ['./feedback-form-view.component.scss']
})
export class FeedbackFormViewComponent implements OnInit {

  public form!: Object;
  formId: any;
  formData : any;
  initialLoading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<FeedbackFormViewComponent>,
    private formService : AddFormService,
    private snackBar : SnackBar,
  ) { }

  ngOnInit(): void {
    this.formId = this.data?.formId;
    this.getProjectFormDetails();
  }

  close() {
    this.matDialogRef.close();
  }

  getProjectFormDetails(){
    this.initialLoading  = true;
    this.formService.getProjectFormById(this.formId).subscribe(
      (res:any)=>{
        if(res?.data){
          this.initialLoading = false;
          this.form = res?.data?.formComponent;
          this.formData = {
            data: res?.data?.formResponse,
          };
        }else {
          this.snackBar.errorSnackBar('Internal Server Error');
        }
      },
      (err:any)=> {
        this.snackBar.errorSnackBar('Internal Server Error');
      }
    );
  }

}
