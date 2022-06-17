import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from "./core/shared.module";

import { InitialDataResolver } from 'app/app.resolvers';
import { LayoutComponent } from './layout/layout.component';
export const appRoutes: Routes = [
  {
    path: "sign-in",
    loadChildren: () =>
      import("./modules/auth/sign-in/sign-in.module").then(
        m => m.AuthSignInModule
      ),
    // canActivate: [IsUserUnAuthenticated]
  },
      // Auth routes for guests
       {
        path: '',
        // canActivate: [NoAuthGuard],
        // canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
        ]
    },
     // Admin routes
     {
      path       : "",
      // canActivate: [AuthGuard],
      // canActivateChild: [AuthGuard],
      component  : LayoutComponent,
      resolve    : {
          initialData: InitialDataResolver,
      },
      children   : [
          {path: 'dashboard', loadChildren: () => import('./modules/admin/dashboard/dashboard.module').then(m => m.DashboardModule)},
      ]
  },
  {
    path: "",
    redirectTo: "sign-in",
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: "sign-in",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes, {
    initialNavigation: "enabled",
    scrollPositionRestoration: "enabled"
  }),
  SharedModule
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
