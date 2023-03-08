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

@Component({
    selector: 'classy-layout',
    templateUrl: './classy.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ClassyLayoutComponent implements OnInit, OnDestroy {
    isScreenSmall: boolean | undefined;
    navigation!: Navigation;
    user!: User;
    userData: any;
    pageTitle: string;
    userPhoto: any = '';
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
        private authService: AuthService
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
