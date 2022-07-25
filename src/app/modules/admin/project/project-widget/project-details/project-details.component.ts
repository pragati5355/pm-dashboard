import {Component, ElementRef, OnInit, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core';
import {FuseCardComponent} from '@fuse/components/card';
@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectDetailsComponent implements OnInit {
  projectList=[{
    name: "Survivance Design",
    status: "On Track",
    progres: 45
  }]
  constructor() { }
  private _fuseCards!: QueryList<ElementRef>;
  ngOnInit(): void {
    console.log('app-project-details' )
  }

}
