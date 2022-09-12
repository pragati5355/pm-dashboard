import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AbstractControl } from '@angular/forms';
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
    this.matDialogRef.close({
      result: "success"
    });
  }
  }
  close(){
    this.matDialogRef.close();
  }
}
