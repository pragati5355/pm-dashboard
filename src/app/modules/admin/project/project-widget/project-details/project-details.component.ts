import { members } from './../../../../../mock-api/apps/scrumboard/data';
import { Component, ElementRef, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FuseCardComponent } from '@fuse/components/card';
import { ActivatedRoute, Router } from '@angular/router';
import {SnackBar} from '../../../../../core/utils/snackBar'
@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectDetailsComponent implements OnInit {
  project_name = "This is a Project name";
  project_status = "On Track";
  project_progres = 45;
  members=true;
  sprints=true;
  routeSubscribe: any;
  projectId = 0
  constructor(private router: Router,
    private _route: ActivatedRoute,
    private snackBar: SnackBar) { }
  private _fuseCards!: QueryList<ElementRef>;
  ngOnInit(): void {
    console.log('app-project-details')
    this.routeSubscribe = this._route.queryParams.subscribe(projectId => {
      if (projectId['id']) {
          this.projectId = projectId['id']
      }
    });
  }
  editProject() {
    this.router.navigate(
      [`/projects/edit-project`],
      {queryParams: {id: this.projectId}}
    );
  }
}
