import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExternalProjectDetailsComponent } from './external-project-details/external-project-details.component';
import { ExternalProjectsHomeComponent } from './external-projects-home/external-projects-home.component';
import { ExternalProjectsListComponent } from './external-projects-list/external-projects-list.component';
import { WorkLogsListComponent } from './work-logs-list/work-logs-list.component';

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
                path: 'details/:id',
                component: ExternalProjectDetailsComponent,
                data: {
                    pageTitle: 'External Project Details',
                },
            },
            {
                path: 'work-logs/:id',
                component: WorkLogsListComponent,
                data: {
                    pageTitle: 'External Project Details',
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
