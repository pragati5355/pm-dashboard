import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterResourceComponent } from './register-resource/register-resource.component';

const routes: Routes = [
    {
        path: 'register',
        component: RegisterResourceComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ResourceRoutingModule {}
