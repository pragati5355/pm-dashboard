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
import { RepositoryService } from '@modules/admin/repository/common/services/repository.service';
import { ErrorMessage } from 'app/core/constacts/constacts'
export interface DialogData {
  resend: any;
}

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html'
})
export class SendMailComponent implements OnInit {
  sendYmlFileForm!: FormGroup;
  get sendYmlFileFormValidation(): { [key: string]: AbstractControl } {
    return this.sendYmlFileForm.controls;
  }
  repositoryName = ""
  technologyName=""
  projectName=""
  separatorKeysCodes: number[] = [ENTER, COMMA];
  emailCtrl = new FormControl('');
  emails: string[] = [];
  emailInvalid= false
  notEmpty = true
  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement> | any;
    constructor(
         private snackBar: SnackBar, 
        public matDialogRef: MatDialogRef<SendMailComponent>,
        private _formBuilder: FormBuilder,
        private _authService: AuthService,
        private RepositoryService: RepositoryService,
        @Inject(MAT_DIALOG_DATA) public data:any
    )
    {

    }
  
    ngOnInit(): void
    {
        // Create the form
        this.repositoryName = this.data.repositoryName
        this.technologyName = this.data.technologyName
        this.projectName = this.data.projectName
        this.sendYmlFileForm = this._formBuilder.group({
          toEmail: [ "ashwin.kawade@mindbowser.com",[Validators.required,
            Validators.pattern(ValidationConstants.EMAIL_VALIDATION)]],
          emails: this._formBuilder.array([]),
          subject: [ this.projectName+"-"+this.repositoryName+" | Need details for YML file ",[Validators.required]], 
           message: ["I am sharing with you the YML file for the project"+ this.projectName+" and repo "+this.repositoryName+". Can you please fill in the required details and share the file with me on the same email chain?",[Validators.required,
            TextRegexValidator(RegexConstants.Text_Area)]],
        },{
          validator: [
          noWhitespaceValidator("message"),
        ]
        });
        
    }
  
    save() {
      if(this.emails.length !==0){
      if (!this.sendYmlFileForm.invalid) {
        let payload = {
          content : this.sendYmlFileForm.value.message,
          cc: this.emails,
          to: this.sendYmlFileForm.value.toEmail,
          subject:this.sendYmlFileForm.value.subject,
          repoName: this.repositoryName
        }
        console.log(payload)
      this.RepositoryService.sendFileEmail(payload).subscribe((res: any)=>{
         if(res.data){
           this.snackBar.successSnackBar(res.data)
         }else{
           this.snackBar.errorSnackBar(ErrorMessage.ERROR_SOMETHING_WENT_WRONG)
         }
      }, error =>{
        this.snackBar.errorSnackBar(ErrorMessage.ERROR_SOMETHING_WENT_WRONG)
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
         this.notEmpty = true
         event.chipInput!.clear();
  
      this.emailCtrl.setValue(null);
      } else {
        this.notEmpty = false
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
  
