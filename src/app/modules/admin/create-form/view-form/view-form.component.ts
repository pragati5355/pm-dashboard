import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddFormService } from '@services/add-form.service';
@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html'
})
export class ViewFormComponent implements OnInit {
  public form!: Object;
  formName = ""
  routeSubscribe: any;
  initialLoading= false
  constructor(
    private formService: AddFormService,
    private _route: ActivatedRoute,
    private router: Router, ) { }
  ngOnInit(): void {
    this.routeSubscribe = this._route.queryParams.subscribe(formtype => {
      if (formtype['id']) {
          this.getFormDetails({id:formtype['id']})
      }
    });
  }
   getFormDetails(payload: any){
    this.initialLoading = true;
     this.formService.getFormDetails(payload).subscribe((res: any) =>{

      this.initialLoading = false;
      let formdata: any = []
      formdata.push(res.data)
      formdata.forEach((item: any) => {
        this.formName = item.formName
        this.form = item.formComponent
      });
     })
   }
   submit(event: any) {
     console.log(event)
  }
  gotoforms(){
    this.router.navigate(
        [`/forms/form-list`]
    );
}
}
