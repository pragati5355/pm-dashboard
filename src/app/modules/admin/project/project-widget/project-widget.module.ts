import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/core/shared.module';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { SprintsListComponent } from './sprints-list/sprints-list.component';
import { ProjectMembersListComponent } from './project-members-list/project-members-list.component';
import { MatIconModule } from "@angular/material/icon";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { FuseCardModule } from '@fuse/components/card';
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { NgApexchartsModule } from 'ng-apexcharts';


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
    NgApexchartsModule,
    FuseCardModule
  ],
  exports: [
    ProjectDetailsComponent,
    SprintsListComponent,
    ProjectMembersListComponent,
  ]
})
export class ProjectWidgetModule { }
