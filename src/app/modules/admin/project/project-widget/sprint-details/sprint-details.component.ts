import { ChangeDetectionStrategy, Component,ElementRef, Input, QueryList,  OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-sprint-details',
  templateUrl: './sprint-details.component.html',
  styleUrls: ['./sprint-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SprintDetailsComponent implements OnInit {
  project_name = "This is a Sprint name";
  project_status = "On Track";
  project_progres = 45;
  @Input() dataType: any;
  qulitychare= ["defectLeakage","qualityPercentage"]
  routeSubscribe: any;
  sprintId = 0
  initialLoading = false
  @Input() dataId: any;
  constructor(private router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void { 
    this.routeSubscribe = this._route.queryParams.subscribe(sprintId => {
      if (sprintId['id']) {
          this.sprintId = sprintId['id']
      }
  });
  }
  goBack(){
    window.history.back()
  }
}
