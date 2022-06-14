import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthServiceService } from './AuthService.service';
import { TokenStorageService } from './TokenStorage.service';
@Injectable({
  providedIn: 'root'
})
export class IsUserAuthenticated implements CanActivate {
  constructor(
    private router: Router,
    private userAuthService: TokenStorageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.userAuthService.getToken()) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
