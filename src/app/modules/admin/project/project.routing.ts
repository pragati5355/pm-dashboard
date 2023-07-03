import { Route, Router, RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { AddProjectHomeComponent } from '../project/add-project-home/add-project-home.component';
import { ProjectHomeComponent } from './project-home/project-home.component';
import { NgModule } from '@angular/core';
import { WeeklyFeedbackListComponent } from './weekly-feedback-list/weekly-feedback-list.component';
export const projectRoutes: Route[] = [
    {
        path: '',
        component: ProjectHomeComponent,
        children: [
            {
                path: 'add',
                component: AddProjectHomeComponent,
                data: {
                    pageTitle: 'Add New Project',
                    allowedRoles: ['ADMIN'],
                },
            },
            {
                path: 'edit/:id',
                component: AddProjectHomeComponent,
                data: {
                    pageTitle: 'Edit Project',
                },
            },
            {
                path: ':id',
                loadChildren: () =>
                    import(
                        '../project/project-widget/project-widget.module'
                    ).then((m) => m.ProjectWidgetModule),
            },

            {
                path: 'repository',
                loadChildren: () =>
                    import('../repository/repository.module').then(
                        (m) => m.RepositoryModule
                    ),
            },
            {
                path: 'project-process',
                loadChildren: () =>
                    import('../project-process/project-process.module').then(
                        (m) => m.ProjectProcessModule
                    ),
            },
            {
                path: '',
                component: ProjectListComponent,
                data: {
                    pageTitle: 'Projects List',
                },
            },
            {
                path: ':id/feedback/list',
                component: WeeklyFeedbackListComponent,
                data: {
                    pageTitle: 'Weekly Feedback List',
                },
            },
            {
                path: '**',
                redirectTo: '',
            },
        ],
    },
];
@NgModule({
    imports: [RouterModule.forChild(projectRoutes)],
    exports: [RouterModule],
})
export class ProjectRoutingModule {}
