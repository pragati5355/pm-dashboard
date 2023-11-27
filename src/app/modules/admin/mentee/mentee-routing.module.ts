import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFormComponent } from './add-form/add-form.component';
import { MenteeFormListComponent } from './mentee-form-list/mentee-form-list.component';
import { MenteeHomeComponent } from './mentee-home/mentee-home.component';
import { MenteeListComponent } from './mentee-list/mentee-list.component';
import { ViewMenteeComponent } from './view-mentee/view-mentee.component';

const routes: Routes = [
    {
        path: '',
        component: MenteeHomeComponent,
        children: [
            {
                path: '',
                component: MenteeListComponent,
                data: {
                    pageTitle: 'Mentee',
                },
                children: [
                    {
                        path: 'view/:id',
                        component: ViewMenteeComponent,
                    },
                ],
            },
            {
                path: 'form-list/:id',
                component: MenteeFormListComponent,
                data: {
                    pageTitle: '1-1 Forms',
                },
            },
            {
                path: 'form-list/add-from/:id',
                component: AddFormComponent,
                data: {
                    pageTitle: '1-1 Forms',
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

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MenteeRoutingModule {}
