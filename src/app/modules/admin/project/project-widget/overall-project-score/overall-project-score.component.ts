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
    displaylogo: false,
    config: {
      displayModeBar: false,
      displaylogo: false,                                       
      modeBarButtonsToRemove: ['zoom2d', 'hoverCompareCartesian', 'hoverClosestCartesian', 'toggleSpikelines']
    },
    ultimateColors:[
      ['rgb(56, 75, 126)', 'rgb(18, 36, 37)', 'rgb(34, 53, 101)', 'rgb(36, 55, 57)', 'rgb(6, 4, 4)'],
      ['rgb(177, 127, 38)', 'rgb(205, 152, 36)', 'rgb(99, 79, 37)', 'rgb(129, 180, 179)', 'rgb(124, 103, 37)'],
      ['rgb(33, 75, 99)', 'rgb(79, 129, 102)', 'rgb(151, 179, 100)', 'rgb(175, 49, 35)', 'rgb(36, 73, 147)'],
      ['rgb(146, 123, 21)', 'rgb(177, 180, 34)', 'rgb(206, 206, 40)', 'rgb(175, 51, 21)', 'rgb(35, 36, 21)']
    ]
};

  ngOnInit() {
  }

}
