import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StaticData } from "../../../../../core/constacts/static";
import { CreateProjecteService } from "@services/create-projecte.service";
import {  Input } from '@angular/core'
import { AuthService } from '@services/auth/auth.service';
@Component({
  selector: 'app-sprints-list',
  templateUrl: './sprints-list.component.html',
  styleUrls: ['./sprints-list.component.scss'],
})
export class SprintsListComponent implements OnInit {
  count = 1;
  isLoading: boolean = false;
  totalRecored = 0;
  totalPerPageData = StaticData.PER_PAGE_DATA;
  sprintList: any = [];

  constructor(private _authService: AuthService,private ProjectService: CreateProjecteService, private router: Router,) {
  }
  @Input() dataId: any ;
  ngOnInit(): void {
    console.log("projectId",this.dataId)
    this.isLoading = true;
    let payload = {
      "id": this.dataId
    }
    this.getSprintList(payload);
  }

  getSprintList(paylaod: any) {
    this.ProjectService.getSprintList(paylaod).subscribe((res: any) => {
      if(res.data){
        this.sprintList = res.data;
      this.totalRecored = this.sprintList.length ? this.sprintList.length : 0;
      this.isLoading = false;
      }else{
        this.totalRecored =  0;
        this.isLoading = false;
      }
      if(res.error == true){
        this._authService.updateAndReload(window.location);
        }
    }, error => {
      this.isLoading = false;
    })
  }
  goToSprint(id: number, name: any) {
    this.router.navigate(
      [`/projects/project/sprint-details`],
      { queryParams: { id: id, name: name } }
    );
  }
}
