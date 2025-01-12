import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorklogRoutingModule } from './worklog-routing.module';
import { WorklogListComponent } from './worklog-list/worklog-list.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { SkeletonModule } from 'app/core/modules/skeleton/skeleton.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { SanitizeHtmlPipe } from './common/pipes/sanitize-html.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { WorklogDownloadComponent } from './worklog-download/worklog-download.component';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
    declarations: [
        WorklogListComponent,
        SanitizeHtmlPipe,
        WorklogDownloadComponent,
    ],
    imports: [
        CommonModule,
        WorklogRoutingModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTabsModule,
        SkeletonModule,
        MatButtonModule,
        MatDividerModule,
        MatTooltipModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatDialogModule,
    ],
    providers: [DatePipe],
})
export class WorklogModule {}
