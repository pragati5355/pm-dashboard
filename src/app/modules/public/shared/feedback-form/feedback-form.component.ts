import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddFormService } from '@services/add-form.service';
import {SnackBar} from '../../../../core/utils/snackBar'
@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html'
})
export class FeedbackFormComponent implements OnInit {
  public form!: any;
  routeSubscribe: any;
  initialLoading= false
  projectName = ""
  projectResources : any = [];
  sprintName=""
  projectId: any
  sprintId: any
  email: any
  constructor(
    private snackBar: SnackBar,
    private formService: AddFormService,
    private _route: ActivatedRoute,
    private router: Router, 
    ) 
  { }

  ngOnInit(): void {
    this.routeSubscribe = this._route.queryParams.subscribe(params => {
      this.email = params['email']
    });
    this.routeSubscribe = this._route.params.subscribe(res => {
      if (res) {
        this.projectId =res['projectId']
        this.sprintId= res['sprintId']
        this.getFormDetails(this.projectId)
      }
    })
  }

  getFormDetails(id: any) {
    this.initialLoading = true;
    this.formService.getProjectFeedbackFormDetails(id).subscribe(
        (res: any) => {
            this.initialLoading = false;
            if (!res?.error) {
                this.projectName = res?.data?.projectName;
                this.projectResources = res?.data?.resource;
                this.form = res?.data?.form?.formComponent;
                this.assignResourcesDynamically();
            }
        },
        (err: any) => {
            this.router.navigate([`/client-portal/empty-feedback-form`]);
        }
    );
  }

  assignResourcesDynamically() {
    if(this.projectResources.length === 0){
        this.form?.components.forEach((item) => {
            if (item?.label === 'Survey') {
                item.hidden = true;
            }
        });
    }else {
        this.form?.components.forEach((item) => {
            if (item?.label === 'Survey') {
                item.hidden = false;
                item.questions =  this.projectResources;
            }
        });
    }
  }

  submit(event: any) {
    let formResponse = event.data;
    let payload = {
        formResponse: formResponse,
        formComponent : this.form,
        sprintId: this.sprintId,
        projectId: this.projectId,
        emailId: this.email
    }
    this.initialLoading = true;
    this.formService.submitProjectFeedbackForm(payload).subscribe(
        (res:any)=> {
        if(res.error){
            this.initialLoading = false;
            this.snackBar.errorSnackBar(res.message)
        }else if(res?.status === 404){
            this.snackBar.errorSnackBar(res.message)
        }
        else{
           this.initialLoading = false;
           this.router.navigate(
             [`/client-portal/feedback-submitted`]
           );
            this.snackBar.successSnackBar("Successfully submitted!")
        }
        },
        (err:any)=>{
            if(err?.status === 404){
                this.snackBar.errorSnackBar(err.message)
            }
            this.router.navigate([`/client-portal/invalid-email-invite`]);
        }
    );
  }
}
