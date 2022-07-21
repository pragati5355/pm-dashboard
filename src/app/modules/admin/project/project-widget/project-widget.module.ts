import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/core/shared.module';
import { Route, RouterModule, Routes } from '@angular/router';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { SprintsListComponent } from './sprints-list/sprints-list.component';
import { ProjectMembersListComponent } from './project-members-list/project-members-list.component';


const routes: Routes = [
  {
    path: "",
    component: ProjectDetailsComponent,
  },
  {
    path: "",
    redirectTo: "",
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: ""
  }
];


@NgModule({
  declarations: [
    ProjectDetailsComponent,
    SprintsListComponent,
    ProjectMembersListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    ProjectDetailsComponent,
    SprintsListComponent,
    ProjectMembersListComponent,
  ]
})
export class ProjectWidgetModule { }
