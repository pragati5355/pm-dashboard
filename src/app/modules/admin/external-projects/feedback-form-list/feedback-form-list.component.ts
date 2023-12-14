import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateProjecteService } from '@services/create-projecte.service';
import { SendFeedbackFormComponent } from '../send-feedback-form/send-feedback-form.component';
import { FeedbackFormViewComponent } from '../feedback-form-view/feedback-form-view.component';
import { T } from '@angular/cdk/keycodes';
import { AddFormService } from '@services/add-form.service';
import { SnackBar } from 'app/core/utils/snackBar';

@Component({
  selector: 'app-feedback-form-list',
  templateUrl: './feedback-form-list.component.html',
  styleUrls: ['./feedback-form-list.component.scss']
})
export class FeedbackFormListComponent implements OnInit {

  routeSubscribe: any;
  public form!: any;
  userRole: string;
  initialLoading : boolean = false;
  projectId : any;
  projectHistory : any;
  formId : any
  requiredReposSkeletonData = {
    rowsToDisplay: 10,
    displayProfilePicture: false,
  };
  feedbackFormList : any = [];

  constructor(
    private projectService: CreateProjecteService,
    private route : ActivatedRoute,
    private dialog : MatDialog,
    private router : Router,
    private formService : AddFormService,
    private snackBar : SnackBar
  ) { }

  ngOnInit(): void {
    this.routeSubscribe = this.route.params.subscribe((projectId)=>{
      if(projectId['id']){
        this.projectId = projectId['id'];
      }
    });
    this.getProjectDetails();
    this.getFeedbackFormList();
  }

  goBack() {
    this.router.navigate([`/external-projects/details/${this.projectId}`]);
  }

  sendFeedbackForm(){
    const dialogRef = this.dialog.open(SendFeedbackFormComponent, {
        disableClose: true,
        panelClass: 'warn-dialog-content',
        autoFocus: false,
        data: {
            projectHistory : this.projectHistory,
        },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
        if (result?.result == 'success') {
          this.getFeedbackFormList();
        }
    });
  }

  getProjectDetails() {
    this.initialLoading = true;
    this.projectService
        .getProjectById(this.projectId)
        .subscribe((res: any) => {
            this.projectHistory = res?.data?.project;
            this.initialLoading = false;
    });
  }

  getFeedbackFormList(){
    this.initialLoading = true;
    this.formService.getProjectFeedbackFormList(this.projectId).subscribe(
      (res:any)=> {
        this.initialLoading = false;
        if(res?.code === 200){
          this.feedbackFormList = res?.data
        }
      },
      (err:any) => {
        this.snackBar.errorSnackBar('Internal Server Error');
      }
    );
  }

  viewFeedbackForm(id : number){
    const dialogRef = this.dialog.open(FeedbackFormViewComponent, {
      disableClose: true,
      width: '70%',
      height: '95%',
      panelClass : 'warn-dialog-content',
      autoFocus : false,
      data : {
        formId : id,
      },
    })
    dialogRef.afterClosed().subscribe((result : any)=> {
      if(result?.result === 'success'){
        this.getFeedbackFormList();
      }
    })
  }
}  

