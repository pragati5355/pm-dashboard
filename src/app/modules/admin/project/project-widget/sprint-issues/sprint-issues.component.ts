import { Component, OnInit } from '@angular/core';
import { StaticData } from "../../../../../core/constacts/static";
import { CreateProjecteService } from "@services/create-projecte.service";
import { AuthService } from '@services/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-sprint-issues',
  templateUrl: './sprint-issues.component.html',
  styleUrls: ['./sprint-issues.component.scss']
})
export class SprintIssuesComponent implements OnInit {
  count = 1;
  isLoading: boolean = false;
  totalRecored = 0;
  totalPerPageData = StaticData.PER_PAGE_DATA;
  sprintId: any
  issuesList: any[] = []

  constructor(private _authService: AuthService, private _route: ActivatedRoute,private ProjectService: CreateProjecteService, private router: Router,) {
  }
  ngOnInit(): void {
    this._route.queryParams.subscribe((sprintId: any) => {
      if (sprintId['id']) {
          this.sprintId = parseInt(sprintId['id'])
      }
      });
    let payload = {
      sprintId:this.sprintId,
      issueType:"Bug"
    }
    this.getIssuesList(payload);
  }

  getIssuesList(paylaod: any) {
    this.ProjectService.getSprintIssueList(paylaod).subscribe((res: any) => {
      if(res.data){
      this.issuesList = res.data
      this.totalRecored = this.issuesList.length 
      this.isLoading = false;
      }else{
        this.totalRecored =  0;
        this.isLoading = false;
      }
    }, error => {
      this.isLoading = false;
    })
  }
}
