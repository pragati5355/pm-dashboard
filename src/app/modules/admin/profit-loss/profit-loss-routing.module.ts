import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfitLossHomeComponent } from './profit-loss-home/profit-loss-home.component';
import { ProfitLossProjectsListComponent } from './profit-loss-projects-list/profit-loss-projects-list.component';
import { ProfitLossProjectStatisticComponent } from './profit-loss-project-statistic/profit-loss-project-statistic.component';

const routes: Routes = [
  {
    path : '',
    component : ProfitLossHomeComponent,
    children : [
      {
        path: '',
        component: ProfitLossProjectsListComponent,
        data: {
            pageTitle: 'Profit & Loss',
        },
      },
      {
        path: 'statistic',
        component: ProfitLossProjectStatisticComponent,
        data: {
            pageTitle: 'Statistics',
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfitLossRoutingModule { }
