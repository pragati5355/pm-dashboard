import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@services/auth/auth.service';
import { ValidationConstants } from 'app/core/constacts/constacts';
import { RegexConstants, TextRegexValidator } from 'app/core/utils/Validations';

@Component({
  selector: 'app-send-feedback-form',
  templateUrl: './send-feedback-form.component.html',
  styleUrls: ['./send-feedback-form.component.scss']
})
export class SendFeedbackFormComponent implements OnInit {

  feedbackFrom!: FormGroup;
  get feedbackFromValidation(): { [key: string]: AbstractControl } {
      return this.feedbackFrom.controls;
  }
  sprintName = '';
  form_name = '';
  project_name = '';
  separatorKeysCodes: number[] = [ENTER, COMMA];
  emailCtrl = new FormControl('');
  emails: string[] = [];
  emailInvalid = false;
  notempty = true;
  project_id = 0;
  checkFormId : boolean = false;
  projectHistory: any;
  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement> | any;

  constructor(
    public matDialogRef: MatDialogRef<SendFeedbackFormComponent>,
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.projectHistory = this.data?.projectHistory;
    console.log("this.projectHistory : ", this.projectHistory);
    this.initializeForm();
  }

  save() {
    if (this.emails.length !== 0) {
        if (!this.feedbackFrom.invalid) {
            let payload = {
                content: this.feedbackFrom.value.message,
                emails: this.emails,
                subject: this.feedbackFrom.value.subject,
                projectId: this.project_id,
            };
            console.log("Payload : ", payload);
            // this.formService.feedbackFrom(payload).subscribe((res: any) => {
            //     if (res.data) {
            //         this.snackBar.successSnackBar(res.data);
            //     } else {
            //         this.snackBar.errorSnackBar(
            //             ErrorMessage.ERROR_SOMETHING_WENT_WRONG
            //         );
            //     }
            // });
            // this.matDialogRef.close({
            //     result: 'success',
            // });
        }
    } else {
        this.emailInvalid = true;
    }
}

  close() {
    this.matDialogRef.close();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (this.validateEmail(value)) {
        this.emails.push(value);
        this.emailInvalid = false;
        // Clear the input value
        this.notempty = true;
        event.chipInput!.clear();

        this.emailCtrl.setValue(null);
    } else {
        this.notempty = false;
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


  private initializeForm(){
    this.feedbackFrom = this._formBuilder.group({
      emails: ['', [Validators.required, Validators.email]],
      subject: [this.projectHistory?.name + ' | Project Feedback Form', [Validators.required]],
      formName: [this.projectHistory?.form?.formName ? this.projectHistory?.form?.formName : '', [Validators.required]],
      message: ['',
        [
          Validators.required,
          TextRegexValidator(RegexConstants.Text_Area),
        ],],
    });

    if(this.projectHistory?.formId === 0){
      this.checkFormId = true;
      this.feedbackFrom.get('formName').disable();
    }
  }
}
