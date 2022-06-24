import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
// import { LocalStorageService } from "angular-web-storage";
@Injectable({
  providedIn: "root"
})
export class InterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: "Bearer " + this.authService.getToken()
      }
    });
    return next.handle(request).pipe(
      tap(
        () => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 403) {
             
            } else if (err.status === 401) {
             
            }
            else
            {

            }
          }
        }
      )
    );
  }
}
