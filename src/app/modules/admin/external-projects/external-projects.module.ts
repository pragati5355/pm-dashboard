import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { FuseScrollbarModule } from '@fuse/directives/scrollbar';
import { FuseScrollResetModule } from '@fuse/directives/scroll-reset';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatStepperModule } from '@angular/material/stepper';
import { FuseCardModule } from '@fuse/components/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { ExternalProjectsRoutingModule } from './external-projects-routing.module';
import { ExternalProjectsHomeComponent } from './external-projects-home/external-projects-home.component';
import { ExternalProjectsListComponent } from './external-projects-list/external-projects-list.component';
import { SkeletonModule } from 'app/core/modules/skeleton/skeleton.module';
import { ExternalProjectDetailsComponent } from './external-project-details/external-project-details.component';
import { CreateExternalProjectComponent } from './create-external-project/create-external-project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ExternalProjectsAddResourceComponent } from './external-projects-add-resource/external-projects-add-resource.component';
@NgModule({
    declarations: [
        ExternalProjectsHomeComponent,
        ExternalProjectsListComponent,
        ExternalProjectDetailsComponent,
        CreateExternalProjectComponent,
        ExternalProjectsAddResourceComponent,
    ],
    imports: [
        CommonModule,
        ExternalProjectsRoutingModule,
        MatChipsModule,
        MatButtonModule,
        MatDividerModule,
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
        ReactiveFormsModule,
    ],
    providers: [DatePipe],
})
export class ExternalProjectsModule {}