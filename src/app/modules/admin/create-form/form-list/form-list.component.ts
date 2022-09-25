import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SnackBar} from '../../../../core/utils/snackBar'
import {AbstractControl, FormBuilder, FormControl, FormGroup,Validators} from '@angular/forms';
import {fuseAnimations} from '@fuse/animations';
import { MatDialog } from '@angular/material/dialog';
import {FuseConfirmationService} from '@fuse/services/confirmation';
import { AddFormService } from '@services/add-form.service';
import {AuthService} from '@services/auth/auth.service';
import { CopyFormComponent } from '../copy-form/copy-form.component';
@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss'],
  animations: fuseAnimations
})
export class FormListComponent implements OnInit {

  constructor(private router: Router,
    private snackBar: SnackBar,
    private formService: AddFormService,
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _fuseConfirmationService: FuseConfirmationService,
    private dialog: MatDialog,
    ) { }
    formList: any = []
   isLoading = false
   pageNo = 1;
   pagination = false;
   initialLoading = false;
   totalPageData = 10
  totalForm = 0;
  count = 1;
  configForm!: FormGroup;
  ngOnInit(): void {
    let payload = {
      perPageData: this.count,
      totalPerPageData: this.totalPageData,
    }
    this.getList(payload);
    this.configForm = this._formBuilder.group({
      title: 'Delete Form',
      message: 'Are you sure you want to delete this form? <span class="font-medium">This action cannot be undone!</span>',
      icon: this._formBuilder.group({
        show: true,
        name: 'heroicons_outline:exclamation',
        color: 'warn'
      }),
      actions: this._formBuilder.group({
        confirm: this._formBuilder.group({
          show: true,
          label: 'Delete',
          color: 'warn'
        }),
        cancel: this._formBuilder.group({
          show: true,
          label: 'Cancel'
        })
      }),
      dismissible: false
    });
  }
  gotoAddForm() {
    this.router.navigate(['/forms/add-form'])
  }
  deleteForm(id: number): void {
    let payload = {
      id: id
    }
    // Open the dialog and save the reference of it
        const dialogRef = this._fuseConfirmationService.open(this.configForm.value);
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "confirmed") {
            this.formService.deleteForm(payload).subscribe(
              (res: any) => {
                if(!res.data.error){
                  this.snackBar.successSnackBar(res.data.message)
                }
                else{
                  this.snackBar.errorSnackBar(res.data.message)
                }
                this.count  = 0
                this.formList = []
                let payload = {
                  perPageData: this.count,
                  totalPerPageData: this.totalPageData,
                }
                this.getList(payload);
              },
              error => {
                this.snackBar.errorSnackBar("Server error")
              })
          }
        });
  }
  editForm(id: number) {
    this.router.navigate(
      [`/forms/edit-form`],
      {queryParams: {id: id}}
    );
  }
  viewForm(id: number) {
    this.router.navigate(
      [`/forms/view-form`],
      {queryParams: {id: id}}
    );
  }
  handleScroll() {
    if (!this.pagination && this.formList.length < this.totalForm) {
      this.count = this.count + this.totalPageData;
      let payload = {
        perPageData: this.count,
        totalPerPageData: this.totalPageData,
      };
      this.pagination = true;
      this.formService.getFormList(payload).subscribe(
        (res: any) => {
          this.pagination = false;
          if (res) {
            this.formList = [...this.formList, ...res.data.forms];
          }
        }, (err: any) => {
          this.pagination = false;
        });
    }
  }
  getList(payload: any) {
    this.initialLoading = true;
    this.formService.getFormList(payload).subscribe(
      (res: any) => {
        this.initialLoading = false;
       if(res.data){
        this.formList = res.data.forms;
        this.totalForm = res.data.totalRecords
       }else{
        this.totalForm = 0
       }
       if(res.error == true){
        this._authService.updateAndReload(window.location);
        }
      }, error => {
        this.initialLoading = false;
      });
  }
  duplicateForm(id: number, name:any){
    const dialogRef = this.dialog.open(CopyFormComponent, {
      disableClose: true,
      panelClass:"warn-dialog-content",
      autoFocus: false,
      data: {
        id:id,
        formname: name
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.result == 'success') {
        this.count  = 0
        this.formList = []
        let payload = {
          perPageData: this.count,
          totalPerPageData: this.totalPageData,
        }
        this.getList(payload);
      }
    });
  }
}
