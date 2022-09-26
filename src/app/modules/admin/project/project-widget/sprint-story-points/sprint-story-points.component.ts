import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StaticData } from "../../../../../core/constacts/static";
import { CreateProjecteService } from "@services/create-projecte.service";
import {  Input } from '@angular/core'
import { AuthService } from '@services/auth/auth.service';
@Component({
  selector: 'app-sprint-story-points',
  templateUrl: './sprint-story-points.component.html',
  styleUrls: ['./sprint-story-points.component.scss']
})
export class SprintStoryPointsComponent implements OnInit {
  count = 1;
  isLoading: boolean = false;
  totalRecored = 2;
  totalPerPageData = StaticData.PER_PAGE_DATA;
  storyPointList: any = [
    {
      assignee: "Vish",
      assigned: 7,
      resolved: 6
    },
    {
      assignee: "Amaresh",
      assigned: 8,
      resolved: 5
    },
    {
      assignee: "Rushikesh",
      assigned: 8,
      resolved: 5
    }
  ];

  constructor(private _authService: AuthService,private ProjectService: CreateProjecteService, private router: Router,) {
  }
  ngOnInit(): void {
    this.isLoading = true;
  }

}
