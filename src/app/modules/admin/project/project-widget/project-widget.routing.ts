import { Route, RouterModule } from '@angular/router';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { SprintDetailsComponent } from './sprint-details/sprint-details.component';
import { NgModule } from '@angular/core';
import { AddCrComponent } from './add-cr/add-cr.component';
import { ViewWorkLogComponent } from './view-work-log/view-work-log.component';
export const projectWidgetRoutes: Route[] = [
    {
        path: 'details',
        component: ProjectDetailsComponent,
        data: {
            pageTitle: 'Project Details',
        },
    },
    {
        path: 'work-logs/:id',
        component: ViewWorkLogComponent,
        data: {
            pageTitle: 'Work Logs',
        },
    },
    {
        path: ':id/add-cr',
        component: AddCrComponent,
        data: {
            pageTitle: 'Request Change',
        },
    },
    {
        path: 'sprint-details/:sprintId',
        component: SprintDetailsComponent,
        data: {
            pageTitle: 'Sprint Details',
        },
    },
];
@NgModule({
    imports: [RouterModule.forChild(projectWidgetRoutes)],
    exports: [RouterModule],
})
export class ProjectWidgetRoutingModule {}
