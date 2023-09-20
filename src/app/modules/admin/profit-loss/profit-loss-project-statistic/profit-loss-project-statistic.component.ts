import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profit-loss-project-statistic',
  templateUrl: './profit-loss-project-statistic.component.html',
  styleUrls: ['./profit-loss-project-statistic.component.scss']
})
export class ProfitLossProjectStatisticComponent implements OnInit {

  routeSubscribe: any;
  projectId = 0;
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
    private _route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.routeSubscribe = this._route.params.subscribe((id) => {
      if (id['id']) {
          this.projectId = id['id'];
          console.log("this.projectId : " , this.projectId);
      }
    });

  }

  goBack(){
    this.router.navigate([`/p&l`]);
  }

}
