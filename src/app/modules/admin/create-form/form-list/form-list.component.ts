import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SnackBar} from '../../../../core/utils/snackBar'
import { AddFormService } from '@services/add-form.service';
import {AuthService} from '@services/auth/auth.service';
@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})
export class FormListComponent implements OnInit {

  constructor(private router: Router,
    private snackBar: SnackBar,
    private formService: AddFormService,
    private _authService: AuthService) { }
    formList: any = []
   isLoading = false
   pageNo = 1;
   pagination = false;
   initialLoading = false;
   totalPageData = 2
  totalForm = 0;
  count = 1;
  ngOnInit(): void {
    let payload = {
      perPageData: this.count,
      totalPerPageData: this.totalPageData,
    }
    this.getList(payload);
  }
  gotoAddForm() {
    this.router.navigate(['/forms/add-form'])
  }
  deleteResource(event:any){

  }
  edit(event: any){

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
        this._authService.updateToken().subscribe(
          (res: any) => {
           if(res){
            this._authService.setToken(res.data.accessToken);
            window.location.reload() 
           }else{
            this.router.navigate(['/sign-in'])
           }
          })
        }
      }, error => {
        this.initialLoading = false;
      });
  }
}
