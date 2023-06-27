import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WeeklyFeedbackFormComponent } from '../weekly-feedback-form/weekly-feedback-form.component';
import { WeeklyStatusService } from '../common/services/weekly-status.service';
import { LoggedInUserService } from '@modules/admin/common/services/logged-in-user.service';
import { ActivatedRoute } from '@angular/router';
import { WeeklyFormComponent } from '../weekly-form/weekly-form.component';
import { DatePipe } from '@angular/common';

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
  projectId = 0;
  weeklyFormList : any = [];
  formList: any = [];
  routeSubscribe: any;
  requiredReposSkeletonData = {
    rowsToDisplay: 10,
    displayProfilePicture: false,
  };

  constructor(
    private dialog: MatDialog,
    private weeklyStatusService: WeeklyStatusService,
    private loggedInUserService: LoggedInUserService,
    private _route: ActivatedRoute,
    public datePipe : DatePipe
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.routeSubscribe = this._route.params.subscribe((id) => {
      if (id['id']) {
          this.projectId = id['id'];
    }
    });
    this.getWeeklyStatusList();
  }

  weeklyFeedbackDialog(){
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
            this.loadData();
        }
    });
  }

  private loadData() {
    this.getUserRole();
    this.loadWeeklyStatusForm();
  }

  getWeeklyStatusList(){
    this.initialLoading = true;
    const payload = {
      projectId: this.projectId,
    }
    this.weeklyStatusService.getWeeklyStatusList(payload).subscribe(
      (res:any)=>{
        this.initialLoading = false;
        this.weeklyFormList = res?.data;
      },
      (err) => {
        this.initialLoading = false;
      }
    )
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

  getDialogData(
    formResponse: any,
    formComponent:any){
    const dialogRef = this.dialog.open(WeeklyFormComponent, {
      disableClose: true,
      width: '60%',
      panelClass: 'warn-dialog-content',
      autoFocus: false,
      data: {
          projectId: this.projectId,
          formResponse: formResponse,
          formComponent : formComponent,
      },
  });
  dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
          this.resetList();
      }
  });

  }

  private resetList() {
    this.formList = [];
    this.getWeeklyStatusList();
}

}
