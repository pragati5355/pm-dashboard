import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/core/shared.module';
import { Route, RouterModule, Routes } from '@angular/router';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { SprintDetailsComponent } from './sprint-details/sprint-details.component';
import { OverallProjectScoreComponent } from './overall-project-score/overall-project-score.component';
import { CustomerHappinessScoreComponent } from './customer-happiness-score/customer-happiness-score.component';
import { SprintsListComponent } from './sprints-list/sprints-list.component';
import { ProjectTimelineComponent } from './project-timeline/project-timeline.component';
import { ProjectMembersListComponent } from './project-members-list/project-members-list.component';
import { DefectLeakageComponent } from './defect-leakage/defect-leakage.component';
import { QualityPercentageComponent } from './quality-percentage/quality-percentage.component';
import { RetestRatioComponent } from './retest-ratio/retest-ratio.component';
import { ScheduleVarianceComponent } from './schedule-variance/schedule-variance.component';
import { SprintProgressComponent } from './sprint-progress/sprint-progress.component';

const routes: Routes = [
  {
    path: "",
    component: ProjectDetailsComponent,
  },
  {
    path: "sprint",
    component: SprintDetailsComponent,
  },
  {
    path: "",
    redirectTo: "",
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: ""
  }
];


@NgModule({
  declarations: [
    ProjectDetailsComponent,
    SprintDetailsComponent,
    OverallProjectScoreComponent,
    CustomerHappinessScoreComponent,
    SprintsListComponent,
    ProjectTimelineComponent,
    ProjectMembersListComponent,
    DefectLeakageComponent,
    QualityPercentageComponent,
    RetestRatioComponent,
    ScheduleVarianceComponent,
    SprintProgressComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    ProjectDetailsComponent,
    SprintDetailsComponent,
    OverallProjectScoreComponent,
    CustomerHappinessScoreComponent,
    SprintsListComponent,
    ProjectTimelineComponent,
    ProjectMembersListComponent,
    DefectLeakageComponent,
    QualityPercentageComponent,
    RetestRatioComponent,
    ScheduleVarianceComponent,
    SprintProgressComponent
  ]
})
export class ProjectWidgetModule { }
