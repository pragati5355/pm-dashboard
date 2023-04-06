import { Route, Router, RouterModule, Routes } from '@angular/router';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { SprintDetailsComponent } from './sprint-details/sprint-details.component';
import { NgModule } from '@angular/core';
export const projectWidgetRoutes: Route[] = [
    {
        path: 'details',
        component: ProjectDetailsComponent,
        data: {
            pageTitle: 'Project Details',
        },
    },
    {
        path: 'sprint-details/:sprintId/:name',
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
