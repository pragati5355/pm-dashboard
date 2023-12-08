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

    particlesOptions = {
        fps_limit: 60,
        interactivity: {
            InteractivityDetect: 'canvas',
            events: {
                onclick: { enable: true, mode: 'push' },
                onhover: {
                    enable: true,
                    mode: 'attract',
                    parallax: { enable: false, force: 60, smooth: 10 },
                },
                resize: true,
            },
            modes: {
                push: { quantity: 4 },
                attract: { distance: 200, duration: 0.4, factor: 5 },
            },
        },
        particles: {
            color: { value: '#ffffff' },
            line_linked: {
                color: '#ffffff',
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1,
            },
            move: {
                attract: { enable: false, rotateX: 600, rotateY: 1200 },
                bounce: false,
                MoveDirection: 'none',
                enable: true,
                OutMode: 'out',
                random: false,
                speed: 2,
                straight: false,
            },
            number: { density: { enable: true, value_area: 800 }, value: 80 },
            opacity: {
                anim: {
                    enable: false,
                    opacity_min: 0.1,
                    speed: 1,
                    sync: false,
                },
                random: false,
                value: 0.5,
            },
            shape: {
                character: {
                    fill: false,
                    font: 'Verdana',
                    style: '',
                    value: '*',
                    weight: '400',
                },
                image: {
                    height: 100,
                    replace_color: true,
                    src: 'images/github.svg',
                    width: 100,
                },
                polygon: { nb_sides: 5 },
                stroke: { color: '#000000', width: 0 },
                type: 'circle',
            },
            size: {
                anim: { enable: false, size_min: 0.1, speed: 40, sync: false },
                random: true,
                value: 5,
            },
        },
        polygon: {
            draw: { enable: false, lineColor: '#ffffff', lineWidth: 0.5 },
            move: { radius: 10 },
            scale: 1,
            type: 'none',
            url: '',
        },
        retina_detect: true,
    };

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
