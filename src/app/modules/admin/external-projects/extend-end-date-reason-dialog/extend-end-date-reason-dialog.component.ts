import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-extend-end-date-reason-dialog',
  templateUrl: './extend-end-date-reason-dialog.component.html',
  styleUrls: ['./extend-end-date-reason-dialog.component.scss']
})
export class ExtendEndDateReasonDialogComponent implements OnInit {
  reasonForm: FormGroup;
  loggedInUser: any;
  changedBy: any;
  currentDate: string;
  mode: 'ADD' | 'EDIT';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<ExtendEndDateReasonDialogComponent>,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    public datePipe : DatePipe
  ) { }

  ngOnInit(): void {
    this.loggedInUser = this.authService.getUser();
    this.getLoggedInUser();
    this.getCurrentDate();
    this.initializaForm();
  }

  submit(){
    if (this.reasonForm?.valid) {
      this.matDialogRef.close({
          reason: this.reasonForm?.get('editEndDateReason')?.value,
          edited: this.mode === 'EDIT' ? true : false,
      });
    }
  }

  private initializaForm() {
    this.reasonForm = this.formBuilder.group({
        editEndDateReason: [
            this.data?.prefiledReason ? this.data?.prefiledReason : '',
            Validators.required,
        ],
    });
  }

  private getLoggedInUser() {
    this.changedBy = `${this.loggedInUser?.firstName}
    ${this.loggedInUser?.lastName}
    `;
  }

  private getCurrentDate() {
    const date = new Date();
    var dateobj = this.datePipe.transform(date, 'dd-MM-yyyy');
    this.currentDate = dateobj;
  }

  close() {
    this.matDialogRef.close();
  }

}
