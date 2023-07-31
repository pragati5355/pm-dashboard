import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterResourceComponent } from './register-resource/register-resource.component';
import { SuccessPageComponent } from './success-page/success-page.component';

const routes: Routes = [
    // {
    //     path: 'register',
    //     component: RegisterResourceComponent,
    // },
    // {
    //     path: 'success',
    //     component: SuccessPageComponent,
    // },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ResourceRoutingModule {}
