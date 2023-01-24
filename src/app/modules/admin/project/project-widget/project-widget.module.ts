import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { SprintDetailsComponent } from './sprint-details/sprint-details.component';
import { ScheduleVarianceComponent } from './schedule-variance/schedule-variance.component';
import { DefectLeakageComponent } from './defect-leakage/defect-leakage.component';
import { RetestRatioComponent } from './retest-ratio/retest-ratio.component';
import { CustomerHappinessScoreComponent } from './customer-happiness-score/customer-happiness-score.component';
import { Routes, RouterModule } from '@angular/router';
import { ProjectTimelineChartComponent } from './project-timeline-chart/project-timeline-chart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/core/shared.module';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { SprintsListComponent } from './sprints-list/sprints-list.component';
import { ProjectMembersListComponent } from './project-members-list/project-members-list.component';
import { MatIconModule } from '@angular/material/icon';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FuseCardModule } from '@fuse/components/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { OverallProjectScoreComponent } from './overall-project-score/overall-project-score.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatRippleModule } from '@angular/material/core';
import { TranslocoModule } from '@ngneat/transloco';
import { SprintIssuesComponent } from './sprint-issues/sprint-issues.component';
import { SprintStoryPointsComponent } from './sprint-story-points/sprint-story-points.component';
import { SprintIssuesTypeComponent } from './sprint-issues-type/sprint-issues-type.component';
import { SpringProgressComponent } from './spring-progress/spring-progress.component';
import { FuseAlertModule } from '@fuse/components/alert';
import { AssignBitbucketProjectDialogComponent } from './assign-bitbucket-project-dialog/assign-bitbucket-project-dialog.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const routes: Routes = [
    { path: 'project-details', component: ProjectDetailsComponent },
    { path: 'sprint-details', component: SprintDetailsComponent },
];

@NgModule({
    declarations: [
        SprintsListComponent,
        ProjectDetailsComponent,
        ProjectMembersListComponent,
        OverallProjectScoreComponent,
        ProjectTimelineChartComponent,
        CustomerHappinessScoreComponent,
        RetestRatioComponent,
        DefectLeakageComponent,
        ScheduleVarianceComponent,
        SprintDetailsComponent,
        SprintIssuesComponent,
        SprintStoryPointsComponent,
        SprintIssuesTypeComponent,
        SpringProgressComponent,
        AssignBitbucketProjectDialogComponent,
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
        FuseCardModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSidenavModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        FuseAlertModule,
        MatRadioModule,
        MatAutocompleteModule,
        MatTooltipModule,
        MatProgressSpinnerModule
    ],
    exports: [
        ProjectDetailsComponent,
        SprintsListComponent,
        ProjectMembersListComponent,
        ProjectTimelineChartComponent,
        OverallProjectScoreComponent,
        CustomerHappinessScoreComponent,
        RetestRatioComponent,
        DefectLeakageComponent,
        ScheduleVarianceComponent,
        SprintDetailsComponent,
        SprintIssuesComponent,
    ],
})
export class ProjectWidgetModule {}
