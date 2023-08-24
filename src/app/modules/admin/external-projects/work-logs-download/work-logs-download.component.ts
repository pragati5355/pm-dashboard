import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import saveAs from 'save-as';
import { LoggedInUserService } from '@modules/admin/common/services/logged-in-user.service';
import {
  MAT_SELECT_YEARS,
  MAT_TAB_MONTHS,
} from '@modules/admin/project/project-widget/common/constants';
import moment, { Moment } from 'moment';

@Component({
  selector: 'app-work-logs-download',
  templateUrl: './work-logs-download.component.html',
  styleUrls: ['./work-logs-download.component.scss']
})
export class WorkLogsDownloadComponent implements OnInit {

  projectId: any;
  selectedYear: string = '2020';
  initialLoading: boolean = false;
  selectedTabIndex: number = 7;
  matTabList: any[] = MAT_TAB_MONTHS;
  matSelectYears: string[] = MAT_SELECT_YEARS;
  loggedInUser: any;
  submitInProcess: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<WorkLogsDownloadComponent>,
    private dialog: MatDialog,
    private loggedInService: LoggedInUserService,
    private route: ActivatedRoute,
    public datePipe : DatePipe
  ) { }

  ngOnInit(): void {
    this.getCurrentMonthAndYear();
    this.routeSubscription();
    this.getLoggedInUser();
  }

  close(){
      this.matDialogRef.close();
  }

  onYearChange(event: any) {
    console.log(" event?.value :- " + event?.value);
    this.loadData(event?.value, this.selectedTabIndex);
  }

  onMonthChanged(event: any) {
    console.log(" event?.value :- " + event?.value);
    console.log(" event?.index :- " + event?.index);
    this.selectedTabIndex = event?.value;
    console.log(" this.selectedTabIndex :- " +  this.selectedTabIndex);
    this.loadData(this.selectedYear, this.selectedTabIndex);
  }

  private routeSubscription() {
    this.route.params.subscribe((projectId) => {
        if (projectId['id']) {
            this.projectId = projectId['id'];
        }
    });
}

  private getLoggedInUser() {
    this.initialLoading = true;
    this.loggedInService.getLoggedInUser().subscribe((res: any) => {
        this.initialLoading = false;
        if (res) {
            this.loggedInUser = res;
            this.loadData(this.selectedYear, this.selectedTabIndex);
        }
    });
  }

  
  private loadData(year: any, month: number) {
    this.initialLoading = true;
    const payload = {
        resourceId: this.loggedInUser?.resourceId,
        projectId: this.projectId,
        month: ++month,
        year: year,
    };
  }

  private getCurrentMonthAndYear() {
    this.selectedYear = String(new Date().getFullYear());
    this.selectedTabIndex = new Date().getMonth();
    console.log("new Date().getMonth()-> " + new Date().getMonth().toString);
    console.log("this.selectedTabIndex :- " + this.selectedTabIndex);
    console.log("this.selectedYear :- " + this.selectedYear);
  }

  downloadWorklogReport(){

  }

  downloadFile(b64encodedString: string) {
    if (b64encodedString) {
        var today = new Date();
        var dateobj = this.datePipe.transform(today, 'dd-MM-yyyy');
        var blob = this.base64ToBlob(b64encodedString, 'text/plain');
        saveAs(blob, 'resource-worklog' + '-'+ dateobj + '.xls');
    }
  }

  public base64ToBlob(b64Data, contentType = '', sliceSize = 512) {
    b64Data = b64Data.replace(/\s/g, ''); //IE compatibility...
    let byteCharacters = atob(b64Data);
    let byteArrays = [];
    for (
        let offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
    ) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);

        let byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        let byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }
}
