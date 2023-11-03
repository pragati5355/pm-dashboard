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
import { DiffDatePipe } from './pipes/diff-date.pipe';
import { MenteeFormListComponent } from './mentee-form-list/mentee-form-list.component';
import { ViewFormComponent } from './view-form/view-form.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { AddFormComponent } from './add-form/add-form.component';
@NgModule({
    declarations: [
        MenteeHomeComponent,
        MenteeListComponent,
        ViewMenteeComponent,
        DiffDatePipe,
        MenteeFormListComponent,
        ViewFormComponent,
        AddFormComponent,
    ],
    imports: [
        CommonModule,
        MenteeRoutingModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        MatProgressBarModule,
        MatTooltipModule,
        NgxExtendedPdfViewerModule,
    ],
})
export class MenteeModule {}
