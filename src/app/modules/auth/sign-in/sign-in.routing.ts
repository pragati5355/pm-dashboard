import { Route, Routes } from '@angular/router';
import { AuthSignInComponent } from 'app/modules/auth/sign-in/sign-in.component';

export const authSignInRoutes: Routes = [
    {
        path     : '',
        component: AuthSignInComponent
    }
];
