import { Route, Routes } from '@angular/router';
import { ResourcesHomeComponent } from './resources-home/resources-home.component';
import { ResourcesListComponent } from './resources-list/resources-list.component';
import { AddResourcesComponent } from './add-resources/add-resources.component';
import { ResourceDetailsComponent } from './resource-details/resource-details.component';
export const resourcesRoutes: Route[] = [
    {
        path: '',
        component: ResourcesHomeComponent,
        children: [
            {
                path: 'add',
                component: AddResourcesComponent,
                data: {
                    pageTitle: 'Add Resource',
                },
            },
            {
                path: 'edit/:id',
                component: AddResourcesComponent,
                data: {
                    pageTitle: 'Edit Resource',
                },
            },
            {
                path: 'list',
                component: ResourcesListComponent,
                data: {
                    pageTitle: 'Resources',
                },
                children: [
                    {
                        path: ':id',
                        component: ResourceDetailsComponent,
                    },
                ],
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
