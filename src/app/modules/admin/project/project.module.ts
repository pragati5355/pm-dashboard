import { ProjectListModule } from './../project-list/project-list.module';
import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { FuseScrollbarModule } from '@fuse/directives/scrollbar';
import { FuseScrollResetModule } from '@fuse/directives/scroll-reset';
import { ProjectHomeComponent } from './project-home/project-home.component';
import { SharedModule } from 'app/core/shared.module';
import {MatChipsModule} from '@angular/material/chips';
import { FormioModule, FormioAppConfig } from 'angular-formio';
import { ConnectJiraPopupComponent } from './connect-jira-popup/connect-jira-popup.component';
import { ProjectWidgetModule } from "@modules/admin/project/project-widget/project-widget.module";
import { SendFeedbackFormComponent } from './send-feedback-form/send-feedback-form.component';
import { SprintFeedbackFormComponent } from './sprint-feedback-form/sprint-feedback-form.component';
const routes: Routes = [
  {
    path: "",
    component: ProjectHomeComponent,
    children: [
      {
        path: "project-list",
        loadChildren: () =>
          import("../project-list/project-list.module").then(m => m.ProjectListModule)
      },
      {
        path: "add-project",
        loadChildren: () =>
          import("../add-project/add-project.module").then(m => m.AddProjectModule)
      },
      {
        path: "edit-project",
        loadChildren: () =>
          import("../add-project/add-project.module").then(m => m.AddProjectModule)
      },

      {
        path: "project",
        loadChildren: () =>
          import("../project/project-widget/project-widget.module").then(m => m.ProjectWidgetModule)
      },
      
      {
        path: "repository",
        loadChildren: () =>
          import("../repository/repository.module").then(m => m.RepositoryModule)
      },

      {
        path: "",
        redirectTo: "project-list",
        pathMatch: "full"
      },
      {
        path: "**",
        redirectTo: "project-list"
      }
    ]
  }
];

@NgModule({
  declarations: [
    ProjectHomeComponent,
    ConnectJiraPopupComponent,
    SendFeedbackFormComponent,
    SprintFeedbackFormComponent,
  ],
  exports: [CdkStepperModule,
    MatStepperModule,],
  imports: [
    CommonModule,
    ProjectWidgetModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    CdkStepperModule,
    MatStepperModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSortModule,
    MatTableModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSidenavModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    FuseFindByKeyPipeModule,
    FuseNavigationModule,
    FuseScrollbarModule,
    FuseScrollResetModule,
    MatChipsModule,
    FormioModule
  ]
})
export class ProjectModule { }
