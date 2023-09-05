import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ExtraOptions, PreloadAllModules } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './core/services/auth/auth.service';
import { environment } from '../environments/environment';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { appConfig } from 'app/core/config/app.config';
import { LayoutModule } from 'app/layout/layout.module';
import {
    SocialLoginModule,
    SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { NgParticlesModule } from 'ng-particles';

const GoogleClientId = environment.GoogleClientId;
const googleLoginOptions = {
    scope: 'email',
    plugin_name: 'streamy',
};

const routerConfig: ExtraOptions = {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    enableTracing: true,
};
@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        CoreModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        SocialLoginModule,
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        LayoutModule,
        NgParticlesModule,
        MarkdownModule.forRoot({}),
        // provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        // provideDatabase(() => getDatabase()),
        // AngularFireModule.initializeApp(environment.firebaseConfig),
        // AngularFireDatabaseModule,
    ],
    providers: [
        AuthService,
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider(
                            GoogleClientId,
                            googleLoginOptions
                        ),
                    },
                ],
                onError: (err) => {
                    console.error(err);
                },
            } as SocialAuthServiceConfig,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
