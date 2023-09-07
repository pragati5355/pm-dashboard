import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ProfitLossRoutingModule } from './profit-loss-routing.module';
import { ProfitLossHomeComponent } from './profit-loss-home/profit-loss-home.component';
import { ProfitLossProjectsListComponent } from './profit-loss-projects-list/profit-loss-projects-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { FuseScrollResetModule } from '@fuse/directives/scroll-reset';
import { FuseScrollbarModule } from '@fuse/directives/scrollbar';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatStepperModule } from '@angular/material/stepper';
import { FuseCardModule } from '@fuse/components/card';
import { SkeletonModule } from 'app/core/modules/skeleton/skeleton.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { QuillModule } from 'ngx-quill';

@NgModule({
    declarations: [
      ProfitLossHomeComponent, 
      ProfitLossProjectsListComponent,
    ],
    imports: [
        CommonModule,
        ProfitLossRoutingModule,
        ReactiveFormsModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatTableModule,
        MatDialogModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatSidenavModule,
        MatRadioModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        FuseFindByKeyPipeModule,
        FuseNavigationModule,
        FuseScrollbarModule,
        FuseScrollResetModule,
        InfiniteScrollModule,
        MatStepperModule,
        FuseCardModule,
        SkeletonModule,
        FormsModule,
        MatCheckboxModule,
        MatTabsModule,
        QuillModule,
    ],
    providers: [DatePipe],
})
export class ProfitLossModule {}
