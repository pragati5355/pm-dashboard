import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {ProjectWidgetModule} from "@modules/admin/project/project-widget/project-widget.module";

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
    ProjectWidgetModule
  ]
})
export class DashboardModule { }
