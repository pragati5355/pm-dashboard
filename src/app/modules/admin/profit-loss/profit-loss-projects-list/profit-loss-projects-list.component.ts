import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-profit-loss-projects-list',
  templateUrl: './profit-loss-projects-list.component.html',
  styleUrls: ['./profit-loss-projects-list.component.scss']
})
export class ProfitLossProjectsListComponent implements OnInit {

  projectList = [];
  filteredProjectList = [];
  searchControl = new FormControl();

  initialLoading: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  addSearchListener() {
    this.searchControl?.valueChanges.subscribe((searchKey: string) => {
        searchKey = searchKey?.trim()?.toLowerCase();
        if (searchKey) {
            this.filteredProjectList = this.projectList.filter(
                (project) =>
                    project?.name?.toLowerCase()?.includes(searchKey) ||
                    project?.description?.toLowerCase()?.includes(searchKey)
            );
        } else {
            this.filteredProjectList = this.projectList;
        }
    });
  }

  // private loadExternalProjectsList() {
  //   this.initialLoading = true;
  //   this.externalProjectsService.getExternalProjectsList().subscribe(
  //       (res: any) => {
  //           this.initialLoading = false;
  //           if (res?.error === false) {
  //               this.projectList = res?.data;
  //               this.filteredProjectList = res?.data;
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
