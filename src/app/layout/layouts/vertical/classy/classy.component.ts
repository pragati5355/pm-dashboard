import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap, Subject, takeUntil } from 'rxjs';
import { AuthService } from '@services/auth/auth.service';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import {
    FuseNavigationService,
    FuseVerticalNavigationComponent,
} from '@fuse/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';
import packageJson from '../../../../../../package.json';
import { LoggedInUserService } from '@modules/admin/common/services/logged-in-user.service';
import { Container, Engine } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';
import { snowOptions } from '@modules/auth/sign-in/common';

@Component({
    selector: 'classy-layout',
    templateUrl: './classy.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ClassyLayoutComponent implements OnInit, OnDestroy {
    id = 'tsparticles';
    appVersion = packageJson?.version;
    isScreenSmall: boolean | undefined;
    navigation!: Navigation;
    user!: User;
    userData: any;
    pageTitle: string;
    userPhoto: any = '';
    userState: any;

    snowConfig = snowOptions;
      
    
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    /**
     * Constructor
     */
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private _navigationService: NavigationService,
        private _userService: UserService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService,
        private authService: AuthService,
        private loggedInUserService: LoggedInUserService
    ) {
        this.addRouteChangeSubscription(activatedRoute);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.extractRouteData(this.activatedRoute);
        this.addNavigationSubscription();
        this.addUserSubscription();
        this.addWatcherSubscription();
        this.userData = this.authService.getUser();
        this.userPhoto = this.authService.getUserPhoto();

        this.getUserState();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void {
        const navigation =
            this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(
                name
            );

        if (navigation) {
            navigation.toggle();
        }
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


    private getUserState() {
        this.loggedInUserService.getLoggedInUser().subscribe((res) => {
            if (res) {
                this.userState = res;
            }
        });
    }

    private addWatcherSubscription() {
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }

    private addUserSubscription() {
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this.user = user;
            });
    }

    private addNavigationSubscription() {
        this._navigationService.navigation$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((navigation: Navigation) => {
                this.navigation = navigation;
            });
    }

    private addRouteChangeSubscription(activatedRoute: ActivatedRoute) {
        this.router.events
            .pipe(filter((e) => e instanceof NavigationEnd))
            .forEach((e) => {
                this.extractRouteData(activatedRoute);
            });
    }

    private extractRouteData(activatedRoute: ActivatedRoute) {
        while (activatedRoute.firstChild) {
            activatedRoute = activatedRoute.firstChild;
        }
        this.pageTitle = activatedRoute?.snapshot?.data['pageTitle'];
    }
}
function loadSnowPreset(engine: Engine) {
    throw new Error('Function not implemented.');
}

