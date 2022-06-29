import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { InterceptorService } from "./services/interceptor/httpInterceptor";
import { AuthService } from "./services/auth/auth.service";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import {MatIconModule} from '@angular/material/icon';
@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    // AngularWebStorageModule,
    RouterModule,
    MatSnackBarModule,
    MatIconModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSnackBarModule
  ],
  providers: [
    AuthService,
    HttpClientModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  entryComponents: []
})
export class SharedModule {}
