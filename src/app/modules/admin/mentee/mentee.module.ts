import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenteeRoutingModule } from './mentee-routing.module';
import { MenteeHomeComponent } from './mentee-home/mentee-home.component';
import { MenteeListComponent } from './mentee-list/mentee-list.component';


@NgModule({
  declarations: [
    MenteeHomeComponent,
    MenteeListComponent
  ],
  imports: [
    CommonModule,
    MenteeRoutingModule
  ]
})
export class MenteeModule { }
