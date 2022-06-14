import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from "./core/shared.module";

import { InitialDataResolver } from 'app/app.resolvers';
import { LayoutComponent } from './layout/layout.component';
export const appRoutes: Routes = [
  {
    path: "auth",
    loadChildren: () =>
      import("./modules/Authentication/Authentication.module").then(
        m => m.AuthenticationModule
      ),
    // canActivate: [IsUserUnAuthenticated]
  },
  // {
  //   path: "dashboard",
  //   loadChildren: () =>
  //     import("./modules/AppContainer/AppContainer.module").then(
  //       m => m.AppContainerModule
  //     ),
  //   // canActivate: [IsUserAuthenticated]
  // },
  // {
  //   path: "dashboard",
  //   loadChildren: () =>
  //     import("./modules/admin/dashboard/dashboard.module").then(
  //       m => m.DashboardModule
  //     ),
  //   // canActivate: [IsUserAuthenticated]
  // },
     // Admin routes
     {
      path       : 'dashboard',
      // canActivate: [AuthGuard],
      // canActivateChild: [AuthGuard],
      component  : LayoutComponent,
      resolve    : {
          initialData: InitialDataResolver,
      },
      children   : [
          {path: 'example', loadChildren: () => import('app/modules/admin/dashboard/dashboard.module').then(m => m.DashboardModule)},
      ]
  },
  {
    path: "",
    redirectTo: "auth",
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: "auth",
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
