import { Route, Router, RouterModule, Routes } from '@angular/router';
import { ProjectProcessListComponent } from './project-process-list/project-process-list.component';
import { ProjectProcessHomeComponent } from './project-process-home/project-process-home.component';
import { NgModule } from '@angular/core';
export const routes: Route[] = [
    {
        path: '',
        component: ProjectProcessHomeComponent,
        children: [
            {
                path: 'list',
                component: ProjectProcessListComponent,
                data: {
                    pageTitle: 'Project Process Checklist',
                },
            },
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full',
            },
            {
                path: '**',
                redirectTo: 'list',
            },
        ],
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProjectProcessRoutingModule {}
