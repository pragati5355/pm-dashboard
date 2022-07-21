import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/core/shared.module';
import { Route, RouterModule, Routes } from '@angular/router';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { SprintsListComponent } from './sprints-list/sprints-list.component';
import { ProjectMembersListComponent } from './project-members-list/project-members-list.component';
import {MatIconModule} from "@angular/material/icon";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";


const routes: Routes = [
  // {    path: "",   component: ProjectDetailsComponent,  },
  // {   path: "",    redirectTo: "",    pathMatch: "full"  },
  // {    path: "**",    redirectTo: ""  }
];


@NgModule({
  declarations: [
    SprintsListComponent,
    ProjectDetailsComponent,
    ProjectMembersListComponent,
  ],
  imports: [
    FormsModule,
    SharedModule,
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    MatProgressBarModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ProjectDetailsComponent,
    SprintsListComponent,
    ProjectMembersListComponent,
  ]
})
export class ProjectWidgetModule { }
