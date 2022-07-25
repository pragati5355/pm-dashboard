import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import * as Plotly from 'plotly.js';
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
    data: [{
      values: [16, 15, 12, 6, 5, 4, 42],
      labels: ['US', 'China', 'European Union', 'Russian Federation', 'Brazil', 'India', 'Rest of World' ],
      domain: {column: 0},
      name: 'GHG Emissions',
      hoverinfo: 'label+percent+name',
      hole: .4,
      type: 'pie'
    }],
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
