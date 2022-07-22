import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {StaticData} from "../../../../../core/constacts/static";
import {CreateProjecteService} from "@services/create-projecte.service";
import {Router} from "@angular/router";
import {FuseConfirmationService} from "../../../../../../@fuse/services/confirmation";

@Component({
  selector: 'app-project-members-list',
  templateUrl: './project-members-list.component.html',
  styleUrls: ['./project-members-list.component.scss']
})
export class ProjectMembersListComponent implements OnInit {
  count = 1;
  pagination = false;
  isLoading: boolean = false;
  teamMember = StaticData.TEAM_MEMBER_LIST;
  totalPerPageData = StaticData.PER_PAGE_DATA;
  totalRecored = StaticData.TEAM_MEMBER_LIST.length;

  constructor(private ProjectService: CreateProjecteService, private router: Router, private _formBuilder: FormBuilder,
              private _fuseConfirmationService: FuseConfirmationService) {
  }

  ngOnInit(): void {
    console.log('teamMember',this.teamMember)
    // this.isLoading = true;
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
}
