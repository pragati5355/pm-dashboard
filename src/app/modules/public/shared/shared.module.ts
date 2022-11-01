import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { FormioModule, FormioAppConfig } from 'angular-formio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DATE_FORMATS, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import * as moment from 'moment';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedHomeComponent } from './shared-home/shared-home.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { EmptyHomeComponent } from './empty-home/empty-home.component';
import { FeedbackHomeComponent } from './feedback-home/feedback-home.component';

const routes: Routes = [
  {
    path: "",
    component: SharedHomeComponent,
    children: [
      { path: 'feedback/:projectId/:sprintId', component: FeedbackFormComponent },
      { path: 'empty-feedback-form', component: EmptyHomeComponent },
      { path: 'feedback-submitted', component: FeedbackHomeComponent },
      {
        path: "",
        redirectTo: "empty-feedback-form",
        pathMatch: "full"
      },
      {
        path: "**",
        redirectTo: "empty-feedback-form"
      }
    ]
  }
];

@NgModule({
  declarations: [
    SharedHomeComponent,
    FeedbackFormComponent,
    EmptyHomeComponent,
    FeedbackHomeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormioModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    RouterModule.forChild(routes),
  ],
  providers:    [ {provide: FormioAppConfig} ]
})
export class SharedModule { }
