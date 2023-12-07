import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddFormService } from '@services/add-form.service';
import { SnackBar } from 'app/core/utils/snackBar';

@Component({
  selector: 'app-project-feedback-form',
  templateUrl: './project-feedback-form.component.html',
  styleUrls: ['./project-feedback-form.component.scss']
})
export class ProjectFeedbackFormComponent implements OnInit {

  public form!: Object;
  formData :any = [];
  routeSubscribe: any;
  initialLoading= false
  projectName = ""
  projectId: any
  sprintId: any
  email: any

  constructor(
    private snackBar: SnackBar,
    private formService: AddFormService,
    private _route: ActivatedRoute,
    private router: Router, 
  ) { }

  ngOnInit(): void {
    this.routeSubscribe = this._route.queryParams.subscribe(
      (params)=>{
        this.email = params['email']
    })
    this.routeSubscribe = this._route.params.subscribe(
      (res:any)=> {
        if(res){
          this.projectId = res['projectId']
          console.log("projectId : ", this.projectId);
          this.getFormDetails(this.projectId);
        }
      });
  }

  getFormDetails(id : any){
    this.initialLoading = true;
    // this.formService.getProjectFeedbackFormDetails(id).subscribe(
    //   (res:any)=> {
    //     this.initialLoading = false;
    //     if(!res?.error){
    //       this.formData = res?.data;
    //       this.projectName = 'Metrics';
    //       console.log("this.formData : ", this.formData);
    //     }
    //   },
    //   (err:any)=> {
    //     this.router.navigate([`/client-portal/empty-feedback-form`]);
    //   }
    // )
  }

  submit(eventData : any){


  }

}
