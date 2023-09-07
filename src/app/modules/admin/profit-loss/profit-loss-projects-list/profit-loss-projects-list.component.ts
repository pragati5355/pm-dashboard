import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProfitLossService } from '../common/services/profit-loss.service';
import { AuthService } from '@services/auth/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profit-loss-projects-list',
  templateUrl: './profit-loss-projects-list.component.html',
  styleUrls: ['./profit-loss-projects-list.component.scss']
})
export class ProfitLossProjectsListComponent implements OnInit {

  searchValue: string = '';
  requiredSkeletonData = {
    rowsToDisplay: 10,
    displayProfilePicture: false,
  };
  projectList:any[] = [
    {
      "projectName":"Metrics",
      "projectPM" : "Vish Sande",
      "startDate" : 1684416463033,
      "endDate" : 1684416463033,
      "statistic" : "In Process",
    },
    {
      "projectName":"AllDay",
      "projectPM" : "ABCD",
      "startDate" : 1689897600000,
      "endDate" : 1689897600000,
      "statistic"  : "In Process",
    },
    {
      "projectName":"Lorem ipsum",
      "projectPM" : "MNC MNBBV",
      "startDate": 1689897600000,
      "endDate" : 1689897600000,
      "statistic" : "In Process",
    }
  ];
  
  searchControl = new FormControl();
  initialLoading: boolean = false;
  constructor(
    private pNLProjectList : ProfitLossService,
    private _authService: AuthService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    // this.loadProjectsList();
  }

  goBack(){

  }

  // private loadProjectsList() {
  //   this.initialLoading = true;
  //   const payload = {

  //   }
  //   this.pNLProjectList.getPNLProjectList(payload).subscribe(
  //       (res: any) => {
  //           this.initialLoading = false;
  //           if (res?.error === false) {
  //               this.projectList = res?.data;
  //           }
  //           if (res?.tokenExpire) {
  //               this._authService.updateAndReload(window.location);
  //           }
  //       },
  //       (err) => {
  //           this.initialLoading = false;
  //       }
  //   );
  // }


}
