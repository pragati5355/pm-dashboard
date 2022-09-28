import { Component,ElementRef, Input, QueryList,  OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { CreateProjecteService } from "@services/create-projecte.service";
import { MatDialog } from '@angular/material/dialog';
import { SendFeedbackFormComponent } from '../../send-feedback-form/send-feedback-form.component';
@Component({
  selector: 'app-sprint-details',
  templateUrl: './sprint-details.component.html',
  styleUrls: ['./sprint-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SprintDetailsComponent implements OnInit {
  sprint_name = "This is a Sprint name";
  project_status = "On Track";
  project_progres = 45;
  @Input() dataType: any;
  qulitychare= ["defectLeakage","qualityPercentage"]
  routeSubscribe: any;
  sprintId = 0
  initialLoading = false
  @Input() dataId: any;
  @Input() data: any = {};
  isLoading= false
  constructor(private router: Router, private dialog: MatDialog, private _route: ActivatedRoute,private ProjectService: CreateProjecteService) { }

  ngOnInit(): void { 
    this.routeSubscribe = this._route.queryParams.subscribe(sprintId => {
      if (sprintId['id']) {
          this.sprintId = sprintId['id']
          this.sprint_name =sprintId['name']
      }
  });
  }
  goBack(){
    window.history.back()
  }

  feedbackForm(){
    const dialogRef = this.dialog.open(SendFeedbackFormComponent, {
      disableClose: true,
      panelClass:"warn-dialog-content",
      autoFocus: false,
      data: {
        id:this.sprintId,
        sprintName: this.sprint_name
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.result == 'success') {
      }
    });
  }
}
