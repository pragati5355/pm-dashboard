import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfitLossRoutingModule } from './profit-loss-routing.module';
import { ProfitLossHomeComponent } from './profit-loss-home/profit-loss-home.component';
import { ProfitLossProjectsListComponent } from './profit-loss-projects-list/profit-loss-projects-list.component';


@NgModule({
  declarations: [
    ProfitLossHomeComponent,
    ProfitLossProjectsListComponent
  ],
  imports: [
    CommonModule,
    ProfitLossRoutingModule
  ]
})
export class ProfitLossModule { }
