import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { WeeklyFeedbackFormComponent } from '../weekly-feedback-form/weekly-feedback-form.component';

@Component({
  selector: 'app-weekly-feedback-list',
  templateUrl: './weekly-feedback-list.component.html',
  styleUrls: ['./weekly-feedback-list.component.scss']
})
export class WeeklyFeedbackListComponent implements OnInit {

  routeSubscribe: any;
  projectId : any;
  initialLoading = false;
  loadingWeeklyFormData: boolean = false;
  public form!: any;
  userRole: string;
  weeklyFormList: any = [
    {
      firstName : 'Pragati',
      lastName: 'Gawade',
      role: 'ADMIN',
      createdAt: '2023-08-31T18:30:00.000+00:00',
      lastModifiedAt: '2024-02-28T18:30:00.000+00:00',
    },
    {
      firstName : 'Prafull',
      lastName: 'Patil',
      role: 'PM',
      createdAt: '2024-02-28T18:30:00.000+00:00',
      lastModifiedAt: '2023-11-27T06:04:59.922+00:00',
    },
    {
      firstName : 'Rohan',
      lastName: 'Kadam',
      role: 'SALES',
      createdAt: '2023-08-31T18:30:00.000+00:00',
      lastModifiedAt: '2023-11-27T06:04:59.922+00:00',
    }
  ];
  formList: any = [];
  requiredReposSkeletonData = {
    rowsToDisplay: 10,
    displayProfilePicture: false,
  };


  constructor(
    private router: Router,
    private _route: ActivatedRoute,
    private dialog : MatDialog
  ) { }

  ngOnInit(): void {
    this.routeSubscribe = this._route.params.subscribe((id) => {
      if (id['id']) {
          this.projectId = id['id'];
      }
    });

  }

  goBack() {
    this.router.navigate([`/external-projects/details/${this.projectId}`]);
  }

  weeklyFeedbackDialog() {
    const dialogRef = this.dialog.open(WeeklyFeedbackFormComponent, {
        disableClose: true,
        width: '60%',
        panelClass: 'warn-dialog-content',
        autoFocus: false,
        data: {
            projectId: this.projectId,
            form: this.form,
        },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
            // this.loadData();
            // this.getWeeklyStatusList();
        }
    });
  }

}
