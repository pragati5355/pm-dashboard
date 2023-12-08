import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {
    GoogleLoginProvider,
    SocialAuthService,
    SocialUser,
} from '@abacritt/angularx-social-login';
import { AuthService } from '../../../core/services/auth/auth.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { loadFull } from 'tsparticles';
import { Container, Engine } from 'tsparticles-engine';
import { particleObject } from './common';
@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthSignInComponent implements OnInit {
    id = 'tsparticles';
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    submitInProcess: boolean = false;
    showAlert: boolean = false;
    socialUser!: SocialUser;
    isLoggedin?: boolean;

    particlesOptions = particleObject;

    constructor(
        private _authService: AuthService,
        private authService: SocialAuthService,
        private socialAuthService: SocialAuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.socialAuthService.authState.subscribe((user) => {
            this.socialUser = user;
            this.isLoggedin = user != null;
        });
    }

    particlesLoaded(container: Container): void {
        console.log(container);
    }

    async particlesInit(engine: Engine): Promise<void> {
        console.log(engine);

        // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
        // await loadSlim(engine);
    }

    loginWithGoogle(): void {
        this.submitInProcess = true;
        this.socialAuthService
            .signIn(GoogleLoginProvider.PROVIDER_ID)
            .then((result) => {
                this.showAlert = false;
                const payload = {
                    email: result?.email,
                    providerId: result?.id,
                    provider: result?.provider,
                };
                this._authService.login(payload).subscribe(
                    (res: any) => {
                        this.submitInProcess = false;

                        this._authService.setToken(res.data.token.accessToken);
                        this._authService.setRefreshToken(
                            res.data.token.refreshToken
                        );
                        this._authService.setLastLoggedInAt(
                            this.getCurrentDate()
                        );
                        this._authService.setAuthenticated(true);
                        this._authService.setUser(res.data.user);
                        this._authService.setUserPhoto(result.photoUrl);
                        this.router.navigate(['/dashboard']);
                    },
                    (error) => {
                        this.submitInProcess = false;
                        this.alert = {
                            type: 'error',
                            message:
                                error?.error?.message ||
                                'Internal server error',
                        };
                        this.showAlert = true;
                    }
                );
            })
            .catch((error) => {
                this.submitInProcess = false;
                // this.alert = {
                //     type: 'error',
                //     message: 'Something went wrong',
                // };

                // // Show the alert
                // this.showAlert = true;
            });
    }

    logOut(): void {
        this.socialAuthService
            .signOut()
            .then(() => this.router.navigate(['login']));
    }

    private getCurrentDate(): string {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        return dd + '/' + mm + '/' + yyyy;
    }
}
