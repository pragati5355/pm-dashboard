import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import {GraphStaticData} from 'app/core/constacts/graphStatic';
@Component({
  selector: 'app-overall-project-score',
  templateUrl: './overall-project-score.component.html',
  styleUrls: ['./overall-project-score.component.scss']
})
export class OverallProjectScoreComponent implements OnInit {
  @ViewChild('chart')
  div!:ElementRef;


  name = 'Angular';

  public graph = {
    data: GraphStaticData.PIE_CHART,
    
     layout: [{
      height: 700,
      width: 700
    }],
    config: {
      displayModeBar: false,
      displaylogo: false,                                       
      modeBarButtonsToRemove: ['zoom2d', 'hoverCompareCartesian', 'hoverClosestCartesian', 'toggleSpikelines']
    }
};

  ngOnInit() {
  }

}
