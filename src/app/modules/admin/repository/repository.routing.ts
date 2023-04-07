import { Route } from '@angular/router';
import { RepositoryHomeComponent } from './repository-home/repository-home.component';
import { RepositoryListComponent } from './repository-list/repository-list.component';
import { AddRepositoryComponent } from './add-repository/add-repository.component';
export const repositoryRoutes: Route[] = [
    {
        path: '',
        component: RepositoryHomeComponent,
        children: [
            {
                path: 'list',
                component: RepositoryListComponent,
                data: {
                    pageTitle: 'Repos',
                },
            },
            {
                path: 'add',
                component: AddRepositoryComponent,
                data: {
                    pageTitle: 'Add Repository',
                },
            },
            {
                path: 'list',
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
