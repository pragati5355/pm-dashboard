import { members } from './../../../../../mock-api/apps/scrumboard/data';
import { Component, ElementRef, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FuseCardComponent } from '@fuse/components/card';
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
  constructor() { }
  private _fuseCards!: QueryList<ElementRef>;
  ngOnInit(): void {
    console.log('app-project-details')
  }

}
