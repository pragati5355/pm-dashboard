import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateProjecteService } from '@services/create-projecte.service';
import { SendFeedbackFormComponent } from '../send-feedback-form/send-feedback-form.component';

@Component({
  selector: 'app-feedback-form-list',
  templateUrl: './feedback-form-list.component.html',
  styleUrls: ['./feedback-form-list.component.scss']
})
export class FeedbackFormListComponent implements OnInit {

  routeSubscribe: any;
  loadingWeeklyFormData: boolean = false;
  public form!: any;
  userRole: string;
  initialLoading : boolean = false;
  projectId : any;
  projectHistory : any;
  requiredReposSkeletonData = {
    rowsToDisplay: 10,
    displayProfilePicture: false,
  };
  feedbackFormList : any = [
    {
      email : 'pragati.gawade@mindbowser.com',
      firstName : 'Pragati',
      lastName: 'Gawade',
      role: 'ADMIN',
      createdAt: '2023-08-31T18:30:00.000+00:00',
      lastModifiedAt: '2024-02-28T18:30:00.000+00:00',
    },
    {
      email : 'prafull.patil@mindbowser.com',
      firstName : 'Prafull',
      lastName: 'Patil',
      role: 'PM',
      createdAt: '2024-02-28T18:30:00.000+00:00',
      lastModifiedAt: '2023-11-27T06:04:59.922+00:00',
    },
    {
      email : 'rohan.kadam@mindbowser.com',
      firstName : 'Rohan',
      lastName: 'Kadam',
      role: 'SALES',
      createdAt: '2023-08-31T18:30:00.000+00:00',
      lastModifiedAt: '2023-11-27T06:04:59.922+00:00',
    }
  ];

  constructor(
    private projectService: CreateProjecteService,
    private route : ActivatedRoute,
    private dialog : MatDialog,
    private router : Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((projectId)=>{
      if(projectId['id']){
        this.projectId = projectId['id'];
      }
    });
    this.getProjectDetails();
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
}  

