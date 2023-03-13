import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';


const dashboardRoutes: Route[] = [
    {
        path: '',
        component: DashboardComponent,
    },
];

@NgModule({
    declarations: [DashboardComponent],
    imports: [
        CommonModule,
        MatIconModule,
        MatMenuModule,
        RouterModule.forChild(dashboardRoutes),
    ],
})
export class DashboardModule {}
