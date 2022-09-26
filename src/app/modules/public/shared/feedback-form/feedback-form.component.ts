import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddFormService } from '@services/add-form.service';
import {SnackBar} from '../../../../core/utils/snackBar'
@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html'
})
export class FeedbackFormComponent implements OnInit {
  public form!: Object;
  routeSubscribe: any;
  initialLoading= false
  projectName = ""
  sprintName=""
  projectId: any
  sprintId: any
  email: any
  constructor(
    private snackBar: SnackBar,
    private formService: AddFormService,
    private _route: ActivatedRoute,
    private router: Router, ) { }
  ngOnInit(): void {
    this.routeSubscribe = this._route.queryParams.subscribe(params => {
      this.email = params['email']
    });
    this.routeSubscribe = this._route.params.subscribe(res => {
      if (res) {
        this.projectId =res['projectId']
        this.sprintId= res['sprintId']
        let payload = {
          projectId:  this.projectId,
          sprintId:  this.sprintId
        }
        this.getFormDetails(payload)
      }
    })
  }
   getFormDetails(payload: any){
    this.initialLoading = true;
     this.formService.getFeedbackForm(payload).subscribe((res: any) =>{
      this.initialLoading = false;
      if(!res.error){
        let formdata: any = []
      formdata.push(res.data)
      formdata.forEach((item: any) => {
        this.projectName = item.projectName
        this.sprintName = item.sprintName
        this.form = item.form.formComponent
      });
      }else{
        this.router.navigate(
          [`/client-portal/empty-feedback-form`]
        );
      }
     })
   }
   submit(event: any) {
     let formComponent = event.data
     let payload = {
      formResponse: formComponent,
      projectId: this.projectId,
      sprintId: this.sprintId,
      emailId: this.email
     }
     this.formService.saveFeedbackForm(payload).subscribe((res: any) =>{
       if(res.error){
         this.snackBar.errorSnackBar(res.message)
       }else{
        this.router.navigate(
          [`/client-portal/feedback`]
        );
         this.snackBar.successSnackBar("Successfully submitted!")
       }
     })
  }
}
