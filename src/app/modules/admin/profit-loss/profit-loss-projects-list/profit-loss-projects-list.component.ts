import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProfitLossService } from '../common/services/profit-loss.service';
import { AuthService } from '@services/auth/auth.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

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
  filteredProjectList:any = [
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
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.addSearchListener();
    // this.loadProjectsList();
  }

  goToStatisticPage(){
    this.router.navigate([`/profit-loss/statistic`]);
  }

  addSearchListener() {
    this.searchControl?.valueChanges.subscribe((searchKey: string) => {
        searchKey = searchKey?.trim()?.toLowerCase();
        if (searchKey) {
            this.filteredProjectList = this.projectList.filter(
                (project) =>
                    project?.projectName?.toLowerCase()?.includes(searchKey) ||
                    project?.projectPM?.toLowerCase()?.includes(searchKey)
            );
        } else {
            this.filteredProjectList = this.projectList;
        }
    });
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
