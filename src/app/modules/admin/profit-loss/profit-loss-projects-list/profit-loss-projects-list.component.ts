import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProfitLossService } from '../common/services/profit-loss.service';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-profit-loss-projects-list',
  templateUrl: './profit-loss-projects-list.component.html',
  styleUrls: ['./profit-loss-projects-list.component.scss']
})
export class ProfitLossProjectsListComponent implements OnInit {

  requiredSkeletonData = {
    rowsToDisplay: 10,
    displayProfilePicture: false,
  };
  projectList: [
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
  filteredProjectList = [];
  searchControl = new FormControl();

  initialLoading: boolean = false;
  constructor(
    private pNLProjectList : ProfitLossService,
    private _authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.addSearchListener();
    this.loadProjectsList();
  }

  addSearchListener() {
    this.searchControl?.valueChanges.subscribe((searchKey: string) => {
        searchKey = searchKey?.trim()?.toLowerCase();
        if (searchKey) {
            this.filteredProjectList = this.projectList.filter(
                (project) =>
                    project?.projectName?.toLowerCase()?.includes(searchKey) ||
                    project?.statistic?.toLowerCase()?.includes(searchKey)
            );
        } else {
            this.filteredProjectList = this.projectList;
        }
    });
  }

  goBack(){

  }

  private loadProjectsList() {
    this.initialLoading = true;
    const payload = {

    }
    this.pNLProjectList.getPNLProjectList(payload).subscribe(
        (res: any) => {
            this.initialLoading = false;
            if (res?.error === false) {
                this.projectList = res?.data;
                this.filteredProjectList = res?.data;
            }
            if (res?.tokenExpire) {
                this._authService.updateAndReload(window.location);
            }
        },
        (err) => {
            this.initialLoading = false;
        }
    );
  }


}
