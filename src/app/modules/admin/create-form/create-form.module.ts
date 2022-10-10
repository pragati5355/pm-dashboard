import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormioModule, FormioAppConfig } from 'angular-formio';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
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
import { CreateFormHomeComponent } from './create-form-home/create-form-home.component';
import { FormListComponent } from './form-list/form-list.component';
import { AddFormComponent } from './add-form/add-form.component';
import { SharedModule } from 'app/core/shared.module';
import { ViewFormComponent } from './view-form/view-form.component';
import { CopyFormComponent } from './copy-form/copy-form.component';
const routes: Routes = [
  {
    path: "",
    component: CreateFormHomeComponent,
    children: [
      { path: 'add-form', component: AddFormComponent },
      { path: 'edit-form', component: AddFormComponent },
      { path: 'view-form', component: ViewFormComponent },
      { path: 'form-list', component: FormListComponent },
      {
        path: "",
        redirectTo: "form-list",
        pathMatch: "full"
      },
      {
        path: "**",
        redirectTo: "form-list"
      }
    ]
  }
];

@NgModule({
  declarations: [
    CreateFormHomeComponent,
    FormListComponent,
    AddFormComponent,
    ViewFormComponent,
    CopyFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FormioModule,
    DragDropModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatMomentDateModule,
        MatProgressBarModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatTooltipModule,
        InfiniteScrollModule,
  ],
  providers:    [  ]
})
export class CreateFormModule { }
