import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormioModule, FormioAppConfig } from 'angular-formio';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SharedHomeComponent } from './shared-home/shared-home.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { EmptyHomeComponent } from './empty-home/empty-home.component';
import { FeedbackHomeComponent } from './feedback-home/feedback-home.component';
import { WorkLogsComponent } from './work-logs/work-logs.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { QuillModule } from 'ngx-quill';
import { NgParticlesModule } from 'ng-particles';
import { WrongUrlComponent } from './wrong-url/wrong-url.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WorkLogsSuccessComponent } from './work-logs-success/work-logs-success.component';
import { MatSelectModule } from '@angular/material/select';

const routes: Routes = [
    {
        path: '',
        component: SharedHomeComponent,
        children: [
            {
                path: 'feedback/:projectId/:sprintId',
                component: FeedbackFormComponent,
            },
            { path: 'empty-feedback-form', component: EmptyHomeComponent },
            { path: 'feedback-submitted', component: FeedbackHomeComponent },
            {
                path: '',
                redirectTo: 'empty-feedback-form',
                pathMatch: 'full',
            },
            {
                path: '**',
                redirectTo: 'empty-feedback-form',
            },
        ],
    },
];

@NgModule({
    declarations: [
        SharedHomeComponent,
        FeedbackFormComponent,
        EmptyHomeComponent,
        FeedbackHomeComponent,
        WorkLogsComponent,
        WrongUrlComponent,
        WorkLogsSuccessComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormioModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        FormsModule,
        MatTooltipModule,
        QuillModule,
        NgParticlesModule,
        RouterModule.forChild(routes),
    ],
    providers: [{ provide: FormioAppConfig }],
})
export class SharedModule {}
