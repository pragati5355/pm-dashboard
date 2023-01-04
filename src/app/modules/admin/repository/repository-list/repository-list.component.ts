import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss']
})
export class RepositoryListComponent implements OnInit {
  initialLoading = false
  totalRecored = 1
  repository: any = []
  constructor() { }

  ngOnInit(): void {
    this.repository = [
      {
        bitbucketProjectName: "demo",
        projectName:"indbowser",
        key: "GINGER14",
        bitbucketUrl:"GINGER14",
        createdAt: "2021-11-18",
        createdBy: "sanskriti",
        jenkinsUrl: "kj",
        status:"success",
        console:"console"

      },
      {
        bitbucketProjectName: "demo",
        projectName:"indbowser",
        key: "GINGER14",
        bitbucketUrl:"GINGER14",
        createdAt: "2021-11-18",
        createdBy: "sanskriti",
        jenkinsUrl: "kj",
        status:"success",
        console:"console"

      },
      
    ]
  }

}
