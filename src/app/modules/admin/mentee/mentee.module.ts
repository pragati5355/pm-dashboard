import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenteeRoutingModule } from './mentee-routing.module';
import { MenteeHomeComponent } from './mentee-home/mentee-home.component';
import { MenteeListComponent } from './mentee-list/mentee-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [MenteeHomeComponent, MenteeListComponent],
    imports: [
        CommonModule,
        MenteeRoutingModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
    ],
})
export class MenteeModule {}
