import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profit-loss-project-statistic',
  templateUrl: './profit-loss-project-statistic.component.html',
  styleUrls: ['./profit-loss-project-statistic.component.scss']
})
export class ProfitLossProjectStatisticComponent implements OnInit {

  requiredSkeletonData = {
    rowsToDisplay: 10,
    displayProfilePicture: true,
  };
  resourceList:any[] = [
    {
      "resourceName":"Dhruv Kumar",
      "actualHours" : 90,
      "idealHours" : 60,
    },
    {
      "resourceName":"Anjali Gupta",
      "actualHours" : 70,
      "idealHours" : 55,
    },
    {
      "resourceName":"Jaya Bhat",
      "actualHours" : 100,
      "idealHours" : 94,
    },
    {
      "resourceName":"Nila Patil",
      "actualHours" : 80,
      "idealHours" : 80,
    }
  ];

  initialLoading : boolean = false;
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {

  }

  goBack(){
    this.router.navigate([`/profit-loss`]);
  }

}
