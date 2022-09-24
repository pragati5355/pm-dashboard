import { Component, OnInit, ViewEncapsulation, Inject,ElementRef, ViewChild } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AbstractControl } from '@angular/forms';
import {SnackBar} from '../../../../core/utils/snackBar'
import { ValidationConstants } from "../../../../core/constacts/constacts";
import {TextRegexValidator, RegexConstants,noWhitespaceValidator } from "../../../../core/utils/Validations";
import { AddFormService } from '@services/add-form.service';

export interface DialogData {
  resend: any;
}

@Component({
  selector: 'app-send-feedback-form',
  templateUrl: './send-feedback-form.component.html',
  styleUrls: ['./send-feedback-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SendFeedbackFormComponent implements OnInit {
  feedbaclForm!: FormGroup;
  get feedbaclFormValidation(): { [key: string]: AbstractControl } {
    return this.feedbaclForm.controls;
  }
  sprintName = ""
  form_name=""
  project_name=""
  separatorKeysCodes: number[] = [ENTER, COMMA];
  emailCtrl = new FormControl('');
  emails: string[] = [];
  emailInvalid= false
  notempty = true
  project_id =0
  sprint_id: any
  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement> | any;
    constructor(
         private snackBar: SnackBar, private formService: AddFormService,
        public matDialogRef: MatDialogRef<SendFeedbackFormComponent>,
        private _formBuilder: FormBuilder,
        private _authService: AuthService,
        @Inject(MAT_DIALOG_DATA) public data:any
    )
    {

    }
  
    ngOnInit(): void
    {
        // Create the form
        this.sprintName = this.data.sprintName
        this.sprint_id = this.data.id
        let projectData= this._authService.getProjectDetails()
        this.form_name = projectData.form.formName
        this.project_name = projectData.name
        this.project_id = projectData.id
        this.feedbaclForm = this._formBuilder.group({
          emails: this._formBuilder.array([]),
          subject: [ this.project_name +"| Feedback for Sprint "+this.sprintName,[Validators.required]], 
          formName: [this.form_name,[Validators.required]], 
           message: ['',[Validators.required,
            TextRegexValidator(RegexConstants.Text_Area)]],
        },{
          validator: [
          noWhitespaceValidator("message"),
        ]
        });
        
    }
  
    save() {
      if(this.emails.length !==0){
      if (!this.feedbaclForm.invalid) {
        let payload = {
          content : this.feedbaclForm.value.message,
          emails: this.emails,
          subject:this.feedbaclForm.value.subject,
          projectId:this.project_id,
          sprintId: parseInt(this.sprint_id)
        }
      this.formService.feedbaclForm(payload).subscribe((res: any)=>{
         if(res.data){
           this.snackBar.successSnackBar(res.data)
         }else{
           this.snackBar.errorSnackBar("Something went wrong")
         }
      });
      this.matDialogRef.close({
        result: "success"
      });
      }
      }else{
        this.emailInvalid=true
      }
    }
    close(){
      this.matDialogRef.close();
    }
    add(event: MatChipInputEvent): void {
      const value = (event.value || '').trim();
      if (this.validateEmail(value)) {
        this.emails.push(value);
        this.emailInvalid = false
         // Clear the input value
         this.notempty = true
         event.chipInput!.clear();
  
      this.emailCtrl.setValue(null);
      } else {
        this.notempty = false
      }
  
     
    }
  
    remove(email: string): void {
      const index = this.emails.indexOf(email);
  
      if (index >= 0) {
        this.emails.splice(index, 1);
      }
    }
  
    selected(event: MatAutocompleteSelectedEvent): void {
      this.emails.push(event.option.viewValue);
      this.emailInput.nativeElement.value = '';
      this.emailCtrl.setValue(null);
    }
    
  private validateEmail(email: any) {
    var re = ValidationConstants.EMAIL_VALIDATION;
    return re.test(String(email).toLowerCase());
  }
  }
  
