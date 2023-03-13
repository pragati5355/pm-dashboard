import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
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
import { SharedModule } from 'app/core/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatStepperModule } from '@angular/material/stepper';
import { RepositoryHomeComponent } from './repository-home/repository-home.component';
import { RepositoryListComponent } from './repository-list/repository-list.component';
import { AddRepositoryComponent } from './add-repository/add-repository.component';
import { SendMailComponent } from './send-mail/send-mail.component';

const routes: Routes = [
    {
        path: '',
        component: RepositoryHomeComponent,
        children: [
            {
                path: 'repository-list',
                component: RepositoryListComponent,
                data: {
                    pageTitle: 'Repos',
                },
            },
            {
                path: 'add-repository',
                component: AddRepositoryComponent,
                data: {
                    pageTitle: 'Add Repository',
                },
            },
            {
                path: '',
                redirectTo: 'repository-list',
                pathMatch: 'full',
            },
            {
                path: '**',
                redirectTo: 'repository-list',
            },
        ],
    },
];

@NgModule({
    declarations: [
        RepositoryHomeComponent,
        RepositoryListComponent,
        AddRepositoryComponent,
        SendMailComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
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
    ],
})
export class RepositoryModule {}
