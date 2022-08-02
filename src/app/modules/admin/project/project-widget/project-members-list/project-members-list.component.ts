import { Component, OnInit } from '@angular/core';
import { StaticData } from "../../../../../core/constacts/static";
import { CreateProjecteService } from "@services/create-projecte.service";
import { Router } from "@angular/router";
import {  Input } from '@angular/core'
@Component({
  selector: 'app-project-members-list',
  templateUrl: './project-members-list.component.html',
  styleUrls: ['./project-members-list.component.scss']
})
export class ProjectMembersListComponent implements OnInit {
  count = 1;
  pagination = false;
  isLoading: boolean = false;
  totalPerPageData = StaticData.PER_PAGE_DATA;
  totalRecored = 0;
  teamMember: any = [];
  @Input() dataId: any ;
  constructor(private ProjectService: CreateProjecteService, private router: Router) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    // id pass only temporary after implementing router pass query by id
    let payload = {
      "id": this.dataId
    }
    this.getTeamMemberList(payload);
  }

  /*******************************************************************
   * @description
   *
   * @author- Naynesh Rathod
   * @created_date - 21/07/2022
   *
   ******************************************************************/

  handleScroll() {
    if (!this.pagination) {
      this.count = this.count + this.totalPerPageData;
      this.pagination = true;
    }
  }

  /*******************************************************************
   * @description Get Team Member List
   *
   * @author- Naynesh Rathod
   * @created_date - 21/07/2022
   *
   ******************************************************************/

  getTeamMemberList(payload: any) {
    this.ProjectService.getTeamMemberList(payload).subscribe((res: any) => {
      this.teamMember = res.data;
      this.totalRecored = this.teamMember.length ? this.teamMember.length : 0;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    })
  }
}
