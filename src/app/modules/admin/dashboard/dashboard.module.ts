import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NominateFormComponent } from './nominate-form/nominate-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NomineeListComponent } from './nominee-list/nominee-list.component';
const dashboardRoutes: Route[] = [
    {
        path: '',
        data: {
            pageTitle: 'Dashboard',
            allowedRoles: ['ADMIN', 'SALES'],
        },
        component: DashboardComponent,
    },
];

@NgModule({
    declarations: [DashboardComponent, NominateFormComponent, NomineeListComponent],
    imports: [
        CommonModule,
        MatIconModule,
        MatMenuModule,
        MatTooltipModule,
        MatButtonModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatDialogModule,
        MatMenuModule,
        MatInputModule,
        MatSelectModule,
        RouterModule.forChild(dashboardRoutes),
    ],
    providers: [DatePipe],
})
export class DashboardModule {}
