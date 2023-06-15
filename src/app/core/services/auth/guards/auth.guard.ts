import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    CanLoad,
    Route,
    Router,
    RouterStateSnapshot,
    UrlSegment,
    UrlTree,
} from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';
import { AuthService } from '@services/auth/auth.service';
import { LoggedInUserService } from '@modules/admin/common/services/logged-in-user.service';
import { A } from '@angular/cdk/keycodes';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private router: Router,
        private _authService: AuthService,
        private loggedInUserService: LoggedInUserService
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean {
        if (this._authService.getToken()) {
            return this.loggedInUserService.getLoggedInUser().pipe(
                map((user) => {
                    console.log('user----', user);
                    console.log(route.data);
                    const allowedRoles = route.data['allowedRoles'];

                    if (user?.role && allowedRoles?.includes(user?.role)) {
                        return true;
                    } else if (!allowedRoles || allowedRoles?.length === 0) {
                        return true;
                    }

                    this.router.navigate(['/projects']);
                    return false;
                })
            );
        } else {
            this.router.navigate(['/sign-in']);
            return false;
        }
    }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | boolean
        | UrlTree
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> {
        return this.canActivate(childRoute, state);
    }
}
