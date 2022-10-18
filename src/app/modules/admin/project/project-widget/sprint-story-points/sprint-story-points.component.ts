import { Component, OnInit } from '@angular/core';
import { StaticData } from "../../../../../core/constacts/static";
import { CreateProjecteService } from "@services/create-projecte.service";
import { AuthService } from '@services/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-sprint-story-points',
  templateUrl: './sprint-story-points.component.html',
  styleUrls: ['./sprint-story-points.component.scss']
})
export class SprintStoryPointsComponent implements OnInit {
  count = 1;
  initialLoading: boolean = false;
  totalRecored = 0;
  totalPerPageData = StaticData.PER_PAGE_DATA;
  sprintId: any
  storyPointList: any[] = []

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
      issueType:"Story"
    }
    this.getstoryPointList(payload);
  }

  getstoryPointList(paylaod: any) {
    this.initialLoading = true
    this.ProjectService.getSprintIssueList(paylaod).subscribe((res: any) => {
      if(res.data){
      this.storyPointList = res.data
      this.totalRecored = this.storyPointList.length 
      this.initialLoading = false;
      }else{
        this.totalRecored =  0;
        this.initialLoading = false;
      }
    }, error => {
      this.initialLoading = false;
    })
  }
}
