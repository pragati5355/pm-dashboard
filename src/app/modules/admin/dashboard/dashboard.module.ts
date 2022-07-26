import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';

const dashboardRoutes: Route[] = [
  {
      path     : '',
      component: DashboardComponent
  }
];


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes),
  ]
})
export class DashboardModule { }
