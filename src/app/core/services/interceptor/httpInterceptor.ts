import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import {SessionService} from "@services/auth/session.service"
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { ErrorMessage } from '../../constacts/constacts';
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { LocalStorageService } from "angular-web-storage";
@Injectable({
  providedIn: "root"
})
export class InterceptorService implements HttpInterceptor {
  snackBarConfig = new MatSnackBarConfig();
  constructor(
    private authService: AuthService,
    private router: Router,
    private storage: LocalStorageService,
    private sessionService: SessionService,
    private _snackBar: MatSnackBar
  ) {
        // // material snackbar config
        this.snackBarConfig.duration = 5000;
        this.snackBarConfig.horizontalPosition = "right";
        this.snackBarConfig.verticalPosition = "bottom";
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isApiUrl = request.url.endsWith('signin')
    const isupdateUrl = request.url.endsWith('get-access-token')
    if(isupdateUrl){
      request = request.clone({
        setHeaders: {
          Authorization: "Bearer " + this.authService.getRefreshToken()
        }
      });
    }else{
    // if (!isApiUrl) {
    request = request.clone({
      setHeaders: {
        Authorization: "Bearer " + this.authService.getToken()
      }
    });
  // }
    }
    return next.handle(request).pipe(
      tap(
        (res: any) => {
          if (res.status === 200) {
            // future changes
                // console.log(res);
              // this.authService.updateToken().subscribe(
              //   (res: any) => {
              //     this.authService.setToken(res.data.accessToken);
              //   })
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            console.log(err);
            if (err.status === 401) {
              this.sessionService.clearStorage();
              this.snackBarConfig.panelClass = ["red-snackbar"];
              this._snackBar.open(
                "Token is invalid or expired.",
                "x",
                this.snackBarConfig
              );
              this.router.navigate(['/sign-in']) 
            } else if (err.status === 403) {
              this.sessionService.clearStorage();
              this.snackBarConfig.panelClass = ["red-snackbar"];
              this._snackBar.open(
                err.error.message,
                "X",
                this.snackBarConfig
              );
              this.router.navigate(['/sign-in']) 
            }else if( err.status === 400){
              this.sessionService.clearStorage();
              this.snackBarConfig.panelClass = ["red-snackbar"];
              this._snackBar.open(
                err.error.message,
                "X",
                this.snackBarConfig
              );
              this.router.navigate(['/sign-in']) 
            }else if(err.status === 404){
              this.snackBarConfig.panelClass = ["red-snackbar"];
              this._snackBar.open(
                err.error.message,
                "X",
                this.snackBarConfig
              );
            }else if(err.status === 500){
              this.snackBarConfig.panelClass = ["red-snackbar"];
              this._snackBar.open(
                ErrorMessage['ERROR_FIVE_HUNDRED'],
                "X",
                this.snackBarConfig
              );
            }else if(err.status === 502){
              this.sessionService.clearStorage();
              this.snackBarConfig.panelClass = ["red-snackbar"];
              this._snackBar.open(
                err.error.message,
                "X",
                this.snackBarConfig
              );
              this.router.navigate(['/sign-in']) 
            }else if(err.status === 503){
              this.snackBarConfig.panelClass = ["red-snackbar"];
              this._snackBar.open(
                err.error.message,
                "X",
                this.snackBarConfig
              );
            }
          }
        }
      )
    );
  }
}
