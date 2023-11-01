import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenteeRoutingModule } from './mentee-routing.module';
import { MenteeHomeComponent } from './mentee-home/mentee-home.component';
import { MenteeListComponent } from './mentee-list/mentee-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { ViewMenteeComponent } from './view-mentee/view-mentee.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@NgModule({
    declarations: [
        MenteeHomeComponent,
        MenteeListComponent,
        ViewMenteeComponent,
    ],
    imports: [
        CommonModule,
        MenteeRoutingModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        MatProgressBarModule,
        MatTooltipModule,
    ],
})
export class MenteeModule {}
