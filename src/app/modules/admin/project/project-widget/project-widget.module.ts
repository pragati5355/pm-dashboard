import { ProjectTimelineChartComponent } from './project-timeline-chart/project-timeline-chart.component';
import { Route, Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/core/shared.module';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { SprintsListComponent } from './sprints-list/sprints-list.component';
import { ProjectMembersListComponent } from './project-members-list/project-members-list.component';
import { MatIconModule } from "@angular/material/icon";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { FuseCardModule } from '@fuse/components/card';
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { OverallProjectScoreComponent } from './overall-project-score/overall-project-score.component';
import { NgApexchartsModule } from 'ng-apexcharts';
const routes: Routes = [
  { path: "details", component: ProjectDetailsComponent, }
]

@NgModule({
  declarations: [
    SprintsListComponent,
    ProjectDetailsComponent,
    ProjectMembersListComponent,
    OverallProjectScoreComponent,
    ProjectTimelineChartComponent,
  ],
  imports: [
    FormsModule,
    SharedModule,
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    MatProgressBarModule,
    NgApexchartsModule,
    RouterModule.forChild(routes),
    FuseCardModule
  ],
  exports: [
    ProjectDetailsComponent,
    SprintsListComponent,
    ProjectMembersListComponent,
    ProjectTimelineChartComponent,
    OverallProjectScoreComponent,
  ]
})
export class ProjectWidgetModule { }
