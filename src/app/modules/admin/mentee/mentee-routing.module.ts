import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
