import { ChangeDetectionStrategy, Component,ElementRef, Input, QueryList,  OnInit, ViewEncapsulation } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void { 
    
  }
  goBack(){
    window.history.back()
  }
}
