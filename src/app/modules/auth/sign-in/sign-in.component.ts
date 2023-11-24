import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
    GoogleLoginProvider,
    SocialAuthService,
    SocialUser,
} from '@abacritt/angularx-social-login';
import { AuthService } from '../../../core/services/auth/auth.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthSignInComponent implements OnInit {
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    submitInProcess: boolean = false;
    showAlert: boolean = false;
    socialUser!: SocialUser;
    isLoggedin?: boolean;

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
    loginWithGoogle(): void {
        this.submitInProcess = true;
        this.socialAuthService
            .signIn(GoogleLoginProvider.PROVIDER_ID)
            .then((result) => {
                this.showAlert = false;
                const payload = {
                    email: result?.email,
                    providerId: result?.id,
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
