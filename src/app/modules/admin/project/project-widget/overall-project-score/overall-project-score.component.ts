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
    layout: {
      title: 'Global Emissions 1990-2011',
      annotations: [
        {
          font: {
            size: 20
          },
          showarrow: false,
          text: '',
          x: 0.17,
          y: 0.5
        }
      ],
      height: 400,
      width: 600,
      showlegend: false,
      grid: {rows: 1, columns: 2}
    }
};

  ngOnInit() {
  }

}
