import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StaticData } from "../../../../../core/constacts/static";
import { CreateProjecteService } from "@services/create-projecte.service";
import {  Input } from '@angular/core'
import { AuthService } from '@services/auth/auth.service';
@Component({
  selector: 'app-sprint-issues-type',
  templateUrl: './sprint-issues-type.component.html',
  styleUrls: ['./sprint-issues-type.component.scss']
})
export class SprintIssuesTypeComponent implements OnInit {
  count = 1;
  isLoading: boolean = false;
  totalRecored = 2;
  totalPerPageData = StaticData.PER_PAGE_DATA;
  issuesList: any = [
    {
      assignee: "Epic",
      assigned: 12,
    },
    {
      assignee: "Stories",
      assigned: 12,
    },
    {
      assignee: "Sub tasks",
      assigned: 23,
    },
    {
      assignee: "Bugs",
      assigned: 24,
    },
  ];

  constructor(private _authService: AuthService,private ProjectService: CreateProjecteService, private router: Router,) {
  }
  ngOnInit(): void {
    this.isLoading = true;
  }


}
