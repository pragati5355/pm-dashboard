import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Routes, RouterModule } from "@angular/router";
import { AppContainerHomeComponent } from './app-container-home/app-container-home.component';
import { MainBarComponent } from './main-bar/main-bar.component';
const routes: Routes = [
  {
    path: "",
    component: AppContainerHomeComponent,
  }
];


@NgModule({
  declarations: [
    AppContainerHomeComponent,
    MainBarComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
  ]
})
export class AppContainerModule { }
