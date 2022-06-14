import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { FuseModule } from '@fuse';
// import {FuseMasonryModule} from '@fuse/components/masonry'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthServiceService } from './core/services/AuthService/AuthService.service';
import { environment } from "../environments/environment";
import { AuthenticationModule } from './modules/Authentication/Authentication.module';
const GoogleClientId = environment.GoogleClientId;
import { SocialLoginModule, SocialAuthServiceConfig,  } from 'angularx-social-login';

import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
const googleLoginOptions = {
  scope: 'profile email'
};

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
      SocialLoginModule,
    // FuseModule
    // FuseMasonryModule
  ],
  providers: [
    AuthServiceService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              GoogleClientId
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
