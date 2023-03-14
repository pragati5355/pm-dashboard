import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './core/shared.module';
import { AuthGuard } from '@services/auth/guards/auth.guard';
import { NoAuthGuard } from '@services/auth/guards/noAuth.guard';
import { InitialDataResolver } from 'app/app.resolvers';
import { LayoutComponent } from './layout/layout.component';
export const appRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'sign-in' },

    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'sign-in' },
    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'sign-in',
                loadChildren: () =>
                    import('./modules/auth/sign-in/sign-in.module').then(
                        (m) => m.AuthSignInModule
                    ),
            },
        ],
    },
    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            pageTitle: 'dashboard',
        },
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'dashboard',
                loadChildren: () =>
                    import('./modules/admin/dashboard/dashboard.module').then(
                        (m) => m.DashboardModule
                    ),
            },
            {
                path: 'projects',
                loadChildren: () =>
                    import('./modules/admin/project/project.module').then(
                        (m) => m.ProjectModule
                    ),
            },
            {
                path: 'resources',
                loadChildren: () =>
                    import('./modules/admin/resources/resources.module').then(
                        (m) => m.ResourcesModule
                    ),
            },
            {
                path: 'forms',
                loadChildren: () =>
                    import(
                        './modules/admin/create-form/create-form.module'
                    ).then((m) => m.CreateFormModule),
            },
        ],
    },
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'client-portal',
                loadChildren: () =>
                    import('./modules/public/shared/shared.module').then(
                        (m) => m.SharedModule
                    ),
            },
        ],
    },
    {
        path: '**',
        redirectTo: 'sign-in',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {
            initialNavigation: 'enabled',
            scrollPositionRestoration: 'enabled',
        }),
        SharedModule,
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
