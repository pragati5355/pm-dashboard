import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ResourceRoutingModule } from './resource-routing.module';
import { RegisterResourceComponent } from './register-resource/register-resource.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AddSkillAndIntegrationComponent } from './add-skill-and-integration/add-skill-and-integration.component';

@NgModule({
    declarations: [RegisterResourceComponent, AddSkillAndIntegrationComponent],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatInputModule,
        MatDatepickerModule,
        MatRadioModule,
        MatSelectModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        FormsModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        ResourceRoutingModule,
    ],
})
export class ResourceModule {}
