import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthServiceService } from './core/services/AuthService/AuthService.service';
import { environment } from "../environments/environment";
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { SocialLoginModule, SocialAuthServiceConfig,  } from 'angularx-social-login';
import { GoogleLoginProvider } from "angularx-social-login";

import { appRoutes } from 'app/app-routing.module';
const GoogleClientId = environment.GoogleClientId;
const googleLoginOptions = {
  scope: 'profile email'
};

const routerConfig: ExtraOptions = {
  preloadingStrategy       : PreloadAllModules,
  scrollPositionRestoration: 'enabled',
};
@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CoreModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, routerConfig),
    BrowserAnimationsModule,
    HttpClientModule,
      SocialLoginModule,
     // Fuse, FuseConfig & FuseMockAPI
     FuseModule,
     FuseConfigModule.forRoot(appConfig),
     FuseMockApiModule.forRoot(mockApiServices),
     LayoutModule
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
