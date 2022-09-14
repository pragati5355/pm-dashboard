import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AbstractControl } from '@angular/forms';
import {SnackBar} from '../../../../core/utils/snackBar'
import { AddFormService } from '@services/add-form.service';
export interface DialogData {
  resend: any;
}
@Component({
  selector: 'app-copy-form',
  templateUrl: './copy-form.component.html',
  styleUrls: ['./copy-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CopyFormComponent implements OnInit {
copyForm!: FormGroup;
get copyFormValidation(): { [key: string]: AbstractControl } {
  return this.copyForm.controls;
}
formTitle = ""
  constructor(
       private snackBar: SnackBar, private formService: AddFormService,
      public matDialogRef: MatDialogRef<CopyFormComponent>,
      private _formBuilder: FormBuilder,
      private _authService: AuthService,
      @Inject(MAT_DIALOG_DATA) public data:any
  )
  {
    
  }

  ngOnInit(): void
  {
      // Create the form
      this.copyForm = this._formBuilder.group({
        formName: ['Copy of '+this.data.formname,[Validators.required]],
      });
      console.log(this.data)
      this.formTitle = this.data.formname
  }

  save() {
    if (!this.copyForm.invalid) {
      let payload = {
        id : this.data.id,
        formName: this.copyForm.value.formName
      }
    this.formService.copyForm(payload).subscribe((res: any)=>{
       if(res.message == "Success"){
         this.snackBar.successSnackBar("Form copied successfully!")
       }
    });
    this.matDialogRef.close({
      result: "success"
    });
  }
  }
  close(){
    this.matDialogRef.close();
  }
}
