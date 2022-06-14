import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from "./core/shared.module";
const routes: Routes = [
  {
    path: "auth",
    loadChildren: () =>
      import("./modules/Authentication/Authentication.module").then(
        m => m.AuthenticationModule
      ),
    // canActivate: [IsUserUnAuthenticated]
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./modules/AppContainer/AppContainer.module").then(
        m => m.AppContainerModule
      ),
    // canActivate: [IsUserAuthenticated]
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
  imports: [ RouterModule.forRoot(routes, {
    initialNavigation: "enabled",
    scrollPositionRestoration: "enabled"
  }),
  SharedModule
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
