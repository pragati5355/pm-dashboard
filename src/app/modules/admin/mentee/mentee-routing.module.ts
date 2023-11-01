import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenteeHomeComponent } from './mentee-home/mentee-home.component';
import { MenteeListComponent } from './mentee-list/mentee-list.component';

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
