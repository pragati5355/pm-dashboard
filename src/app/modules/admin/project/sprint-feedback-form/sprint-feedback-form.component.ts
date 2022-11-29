import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddFormService } from '@services/add-form.service';
import { AuthService } from '@services/auth/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
@Component({
  selector: 'app-sprint-feedback-form',
  templateUrl: './sprint-feedback-form.component.html',
  styleUrls: ['./sprint-feedback-form.component.scss']
})
export class SprintFeedbackFormComponent  implements OnInit {
  public form!: Object;
  formName = ""
  routeSubscribe: any;
  initialLoading= false
  sprintId: any
  projectId: any
  // isShow =false
  emailList:any = []
  formComponent: any =[]
  formData: any
  sprintName: any
  isShowEmails: boolean = true
  constructor(private _authService: AuthService,
    private formService: AddFormService,
    private _route: ActivatedRoute,
    private router: Router,
    public matDialogRef: MatDialogRef<SprintFeedbackFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any ) { }
  ngOnInit(): void {
      
  
      this._route.queryParams.subscribe((sprintId: any) => {
        if (sprintId['id'] && sprintId['name']) {
            this.sprintId = parseInt(sprintId['id'])
            this.sprintName = sprintId['name']
            // this.isShow =true
        }
        });
        let projectData= this._authService.getProjectDetails()
        this.projectId = projectData.id
        // if(this.isShow){
          this.getFormDetailsBySprint()
          this.getFeedbackFormEmailList()
        // }
  
 
      console.log(this.router.url)
  }
   getFormDetailsBySprint(){
    this.initialLoading = true;
      let payload = {
        projectId: this.projectId,
        sprintId: this.sprintId
      }
     this.formService.getFeedbackFormBySprint(payload).subscribe((res: any) =>{

      this.initialLoading = false;
      let formdata: any = []
      formdata.push(res.data.form)
      formdata.forEach((item: any) => {
        this.formName = item.formName
        this.formComponent = item.formComponent.components
      });
      this.form = {components: this.formComponent}
     
     })
   }
   getFeedbackFormEmailList(){
    this.initialLoading = true;
      let payload = {
        projectId: this.projectId,
        sprintId: this.sprintId
      }
     this.formService.getFeedbackFormEamilList(payload).subscribe((res: any) =>{

      this.initialLoading = false
      this.emailList = res.data
      
      console.log(res)
     })
   }
   getFormDetailsByEmail(email:any){
    // this.initialLoading = true;
      let payload = {
        projectId: this.projectId,
        sprintId: this.sprintId,
        email:email
      }
     this.formService.getFeedbackFormByEmail(payload).subscribe((res: any) =>{

      // this.initialLoading = false;
      console.log(res)
      // let formdata: any = []
      // formdata.push(res.data.form)
      // formdata.forEach((item: any) => {
      //   this.formName = item.formName
      //   this.form = item.formComponent
      // });
      this.data = res.data.formResponse
      this.formData={data:res.data.formResponse}
      this.isShowEmails = false
      // this.form = {components: this.formComponent,data:this.formData}
      
     })
   }
   submit(event: any) {
  }
  gotoforms(){
    this.router.navigate(
        [`/forms/form-list`]
    );
}
close(){
  this.matDialogRef.close();
}
}
