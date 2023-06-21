import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WeeklyFeedbackFormComponent } from '../weekly-feedback-form/weekly-feedback-form.component';
import { WeeklyStatusService } from '../common/services/weekly-status.service';
import { LoggedInUserService } from '@modules/admin/common/services/logged-in-user.service';

@Component({
  selector: 'app-weekly-feedback-list',
  templateUrl: './weekly-feedback-list.component.html',
  styleUrls: ['./weekly-feedback-list.component.scss']
})
export class WeeklyFeedbackListComponent implements OnInit {

  initialLoading = false;
  loadingWeeklyFormData: boolean = false;
  public form!: any;
  userRole: string;
  requiredReposSkeletonData = {
    rowsToDisplay: 10,
    displayProfilePicture: false,
  };

  weeklyFeedbackModel = [ 
    {
      weekEndDate : "09-02-2023",
      submitDate : "10-02-2023",
      name: "Test",
      resource : "Pragati Gawade",
    },
    {
      weekEndDate : "04-02-2023",
      submitDate : "06-02-2023",
      name: "Test1",
      resource : "Pragati Gawade",
    },
    {
      weekEndDate : "02-06-2023",
      submitDate : "04-06-2023",
      name: "Test2",
      resource : "Pragati Gawade",
    },
    {
      weekEndDate : "07-07-2023",
      submitDate : "10-07-2023",
      name: "Test3",
      resource : "Pragati Gawade",
    },
    {
      weekEndDate : "15-04-2023",
      submitDate : "18-04-2023",
      name: "Test4",
      resource : "Pragati Gawade",
    },
  ]

  constructor(
    private dialog: MatDialog,
    private weeklyStatusService: WeeklyStatusService,
    private loggedInUserService: LoggedInUserService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  weeklyFeedbackDialog() {
    const dialogRef = this.dialog.open(WeeklyFeedbackFormComponent, {
        disableClose: true,
        width: '60%',
        panelClass: 'warn-dialog-content',
        autoFocus: false,
        data: {
            // projectId: id,
            form: this.form,
        },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
            this.loadData();
        }
    });
  }

  private loadData() {
    this.getUserRole();
    this.loadWeeklyStatusForm();
 }

   private getUserRole() {
        this.loggedInUserService.getLoggedInUser().subscribe((res: any) => {
            if (res?.role) {
                this.userRole = res?.role;
            }
        });
  }

  private loadWeeklyStatusForm() {
    this.loadingWeeklyFormData = true;
    this.weeklyStatusService.getWeeklyStatusFormComponent().subscribe(
        (res: any) => {
            this.loadingWeeklyFormData = false;
            this.form = res?.data;
        },
        (err) => {
            this.loadingWeeklyFormData = false;
        }
    );
  } 

}
