import { Route, Routes } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { AddProjectHomeComponent } from '../project/add-project-home/add-project-home.component';
import { ProjectHomeComponent } from './project-home/project-home.component';
export const projectRoutes: Route[] = [
    {
        path: '',
        component: ProjectHomeComponent,
        children: [
            {
                path: '',
                component: ProjectListComponent,
                data: {
                    pageTitle: 'Projects List',
                },
            },
            {
                path: 'add',
                component: AddProjectHomeComponent,
                data: {
                    pageTitle: 'Add New Project',
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
                path: 'project',
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
                redirectTo: '',
                pathMatch: 'full',
            },
            {
                path: '**',
                redirectTo: '',
            },
        ],
    },
];
