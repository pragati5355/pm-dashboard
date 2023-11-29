import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '@services/auth/auth.service';
import { LoggedInUserService } from '@modules/admin/common/services/logged-in-user.service';
import { SnackBar } from 'app/core/utils/snackBar';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private router: Router,
        private _authService: AuthService,
        private loggedInUserService: LoggedInUserService,
        private snackBar: SnackBar
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean {
        if (this._authService.getToken()) {
            return this.loggedInUserService.getLoggedInUser().pipe(
                map((user) => {
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
