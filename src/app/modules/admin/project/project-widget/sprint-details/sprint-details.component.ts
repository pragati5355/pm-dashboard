import { ChangeDetectionStrategy, Component,ElementRef, Input, QueryList,  OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { CreateProjecteService } from "@services/create-projecte.service";
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
  @Input() data: any = {};
  isLoading= false
  burndownData = {}
  constructor(private router: Router, private _route: ActivatedRoute,private ProjectService: CreateProjecteService) { }

  ngOnInit(): void { 
    this.routeSubscribe = this._route.queryParams.subscribe(sprintId => {
      if (sprintId['id']) {
          this.sprintId = sprintId['id']
      }
  });
  let payload = {
    sprintId: this.sprintId
  }
  // this.getBurnDownChartData(payload)
  }
  goBack(){
    window.history.back()
  }
   getBurnDownChartData(payload: any) {
    this.isLoading = true
     this.ProjectService.burndownChart(payload).subscribe((res: any) => {
      this.burndownData = res.data
      // console.log(this.burndownData)
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    })
  }
  
}
