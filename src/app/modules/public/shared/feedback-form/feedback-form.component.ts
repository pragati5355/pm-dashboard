import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddFormService } from '@services/add-form.service';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html'
})
export class FeedbackFormComponent implements OnInit {
  public form!: Object;
  routeSubscribe: any;
  initialLoading= false
  projectName = "Demo"
  sprintName="UT Sprint"
  constructor(
    private formService: AddFormService,
    private _route: ActivatedRoute,
    private router: Router, ) { }
  ngOnInit(): void {
    this.routeSubscribe = this._route.queryParams.subscribe(formtype => {
      console.log(formtype)
    });
    this.routeSubscribe = this._route.params.subscribe(res => {
      if (res) {
        let payload = {
          projectId: res['projectId'],
          sprintId: res['sprintId']
        }
        this.getFormDetails(payload)
      }
    })
  }
   getFormDetails(payload: any){
    this.initialLoading = true;
     this.formService.getFeedbackForm(payload).subscribe((res: any) =>{
       console.log(res)
      this.initialLoading = false;
      if(!res.error){
        let formdata: any = []
      formdata.push(res.data)
      formdata.forEach((item: any) => {
        this.form = item.formComponent
      });
      }else{
        this.router.navigate(
          [`/client-portal/empty-feedback-form`]
        );
      }
     })
   }
   submit(event: any) {
     console.log(event);
  }
}
