import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/core/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule, Routes } from '@angular/router';
import { ProjectProcessListComponent } from './project-process-list/project-process-list.component';
import { ProjectProcessHomeComponent } from './project-process-home/project-process-home.component';
const routes: Routes = [
    {
        path: '',
        component: ProjectProcessHomeComponent,
        children: [
            { path: 'list', component: ProjectProcessListComponent },
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
@NgModule({
    declarations: [ProjectProcessListComponent, ProjectProcessHomeComponent],
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
    ],
})
export class ProjectProcessModule {}
