import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorklogListComponent } from './worklog-list/worklog-list.component';

const routes: Routes = [
    {
        path: 'project/:id',
        component: WorklogListComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class WorklogRoutingModule {}
