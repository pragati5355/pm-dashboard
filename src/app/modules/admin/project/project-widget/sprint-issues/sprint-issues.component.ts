import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StaticData } from "../../../../../core/constacts/static";
import { CreateProjecteService } from "@services/create-projecte.service";
import {  Input } from '@angular/core'
import { AuthService } from '@services/auth/auth.service';
@Component({
  selector: 'app-sprint-issues',
  templateUrl: './sprint-issues.component.html',
  styleUrls: ['./sprint-issues.component.scss']
})
export class SprintIssuesComponent implements OnInit {
  count = 1;
  isLoading: boolean = false;
  totalRecored = 2;
  totalPerPageData = StaticData.PER_PAGE_DATA;
  issuesList: any = [
    {
      assignee: "sanskriti",
      assigned: 7,
      resolved: 6
    },
    {
      assignee: "Suraj",
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
