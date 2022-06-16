import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../../core/shared.module";
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FuseAlertModule } from '@fuse/components/alert';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginComponent } from './login/login.component';
import { AuthenticationHomeComponent } from './authentication-home/authentication-home.component';
import {IconsModule} from '../../core/icons/icons.module'
const routes: Routes = [
  {
    path: "",
    component: AuthenticationHomeComponent,
    children: [
      {
        path: "login",
        component: LoginComponent,
        // canActivate: [IsUserUnAuthenticated]
      },
      {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
      },
      {
        path: "**",
        redirectTo: "login"
      }
    ]
  }
];


@NgModule({
  declarations: [
    LoginComponent,
    AuthenticationHomeComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    IconsModule,
    FuseAlertModule
  ],
  providers: [
    
  ]
})
export class AuthenticationModule { }
