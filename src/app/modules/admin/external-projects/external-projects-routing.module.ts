import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExternalProjectsHomeComponent } from './external-projects-home/external-projects-home.component';
import { ExternalProjectsListComponent } from './external-projects-list/external-projects-list.component';

const routes: Routes = [
    {
        path: '',
        component: ExternalProjectsHomeComponent,
        children: [
            {
                path: '',
                component: ExternalProjectsListComponent,
                data: {
                    pageTitle: 'External Projects',
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
export class ExternalProjectsRoutingModule {}
