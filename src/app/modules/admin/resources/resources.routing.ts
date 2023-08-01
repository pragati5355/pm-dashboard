import { Route, Routes } from '@angular/router';
import { ResourcesHomeComponent } from './resources-home/resources-home.component';
import { ResourcesListComponent } from './resources-list/resources-list.component';
import { AddResourcesComponent } from './add-resources/add-resources.component';
import { ResourceDetailsComponent } from './resource-details/resource-details.component';
import { OnboardResourceComponent } from './onboard-resource/onboard-resource.component';
export const resourcesRoutes: Route[] = [
    {
        path: '',
        component: ResourcesHomeComponent,
        data: {
            allowedRoles: ['ADMIN'],
        },
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
                path: '',
                component: ResourcesListComponent,
                data: {
                    pageTitle: 'Resources',
                },
                children: [
                    {
                        path: 'view/:id',
                        component: ResourceDetailsComponent,
                    },
                ],
            },
            {
                path: 'onboard',
                component: OnboardResourceComponent,
                data: {
                    pageTitle: 'Onboarded Resource',
                },
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
