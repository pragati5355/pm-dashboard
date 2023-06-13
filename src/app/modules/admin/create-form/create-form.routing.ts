import { Route, Routes } from '@angular/router';
import { CreateFormHomeComponent } from './create-form-home/create-form-home.component';
import { FormListComponent } from './form-list/form-list.component';
import { AddFormComponent } from './add-form/add-form.component';
import { ViewFormComponent } from './view-form/view-form.component';
export const createFormRoutes: Route[] = [
    {
        path: '',
        component: CreateFormHomeComponent,
        data: {
            allowedRoles: ['ADMIN'],
        },
        children: [
            {
                path: 'add',
                component: AddFormComponent,
                data: {
                    pageTitle: 'Add Form',
                },
            },
            {
                path: 'edit/:id',
                component: AddFormComponent,
                data: {
                    pageTitle: 'Edit Form',
                },
            },
            {
                path: 'view/:id',
                component: ViewFormComponent,
                data: {
                    pageTitle: 'View Form',
                },
            },
            {
                path: '',
                component: FormListComponent,
                data: {
                    pageTitle: 'Forms List',
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
