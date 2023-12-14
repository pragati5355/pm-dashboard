import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
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
import { SharedModule } from 'app/core/shared.module';
import { ResourcesHomeComponent } from './resources-home/resources-home.component';
import { ResourcesListComponent } from './resources-list/resources-list.component';
import { AddResourcesComponent } from './add-resources/add-resources.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ResourceDetailsComponent } from './resource-details/resource-details.component';
import { DiffDatePipe } from './common/pipes/diff-date.pipe';
import { SkeletonModule } from 'app/core/modules/skeleton/skeleton.module';
import { resourcesRoutes } from './resources.routing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ResourceUploadCsvComponent } from './resource-upload-csv/resource-upload-csv.component';
import { JoinPipe } from './common/pipes/join-tech.pipe';
import { CreateResumeComponent } from './create-resume/create-resume.component';
import { ResumeVersionsComponent } from './resume-versions/resume-versions.component';
import { NameResumeVersionComponent } from './name-resume-version/name-resume-version.component';
import { OnboardResourceComponent } from './onboard-resource/onboard-resource.component';
import { OnboardResourceDetailsComponent } from './onboard-resource-details/onboard-resource-details.component';
import { OnboardVendorDetailsComponent } from './onboard-vendor-details/onboard-vendor-details.component';
import { ResourceInviteFormComponent } from './resource-invite-form/resource-invite-form.component';
import { OneToOneFormsComponent } from './one-to-one-forms/one-to-one-forms.component';
import { ViewOneToOneFormComponent } from './view-one-to-one-form/view-one-to-one-form.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ResourceUtilizationComponent } from './resource-utilization/resource-utilization.component';
import { ResourceAvailablityComponent } from './resource-availablity/resource-availablity.component';

@NgModule({
    declarations: [
        ResourcesHomeComponent,
        ResourcesListComponent,
        AddResourcesComponent,
        ResourceDetailsComponent,
        DiffDatePipe,
        ResourceUploadCsvComponent,
        JoinPipe,
        CreateResumeComponent,
        ResumeVersionsComponent,
        NameResumeVersionComponent,
        OnboardResourceComponent,
        OnboardResourceDetailsComponent,
        OnboardVendorDetailsComponent,
        ResourceInviteFormComponent,
        OneToOneFormsComponent,
        ViewOneToOneFormComponent,
        ResourceUtilizationComponent,
        ResourceAvailablityComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
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
        SkeletonModule,
        MatCheckboxModule,
        NgxExtendedPdfViewerModule,
        RouterModule.forChild(resourcesRoutes),
    ],
    providers: [DatePipe],
})
export class ResourcesModule {}
