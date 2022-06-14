import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from "@angular/common/http";
import { AuthServiceService } from "../AuthService/AuthService.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
// import { LocalStorageService } from "angular-web-storage";
import { TokenStorageService } from "@services/AuthService/TokenStorage.service";
@Injectable({
  providedIn: "root"
})
export class InterceptorService implements HttpInterceptor {
  constructor(
    private authServiceService: AuthServiceService,
    private TokenStorage: TokenStorageService,
    private router: Router,
  ) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: "Bearer " + this.TokenStorage.getToken()
      }
    });
    return next.handle(request).pipe(
      tap(
        () => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            console.log(err);
          }
        }
      )
    );
  }
}
