import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
} from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { SessionService } from '@services/auth/session.service';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { ErrorMessage } from '../../constacts/constacts';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
@Injectable({
    providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
    snackBarConfig = new MatSnackBarConfig();
    constructor(
        private authService: AuthService,
        private router: Router,
        private sessionService: SessionService,
        private _snackBar: MatSnackBar
    ) {
        // // material snackbar config
        this.snackBarConfig.duration = 5000;
        this.snackBarConfig.horizontalPosition = 'right';
        this.snackBarConfig.verticalPosition = 'bottom';
    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const isApiUrl = request.url.endsWith('signin');
        const isUpdateUrl = request.url.endsWith('get-access-token');
        if (!request.headers.get('skipToken')) {
            if (isUpdateUrl) {
                request = request.clone({
                    setHeaders: {
                        Authorization:
                            'Bearer ' + this.authService.getRefreshToken(),
                    },
                });
            } else {
                // if (!isApiUrl) {
                request = request.clone({
                    setHeaders: {
                        Authorization: 'Bearer ' + this.authService.getToken(),
                    },
                });
                // }
            }
        }

        return next.handle(request).pipe(
            tap((err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        this.sessionService.clearStorage();
                        this.snackBarConfig.panelClass = ['red-snackbar'];
                        this._snackBar.open(
                            'Token is invalid or expired.',
                            'x',
                            this.snackBarConfig
                        );
                        this.router.navigate(['/sign-in']);
                    } else if (err.status === 403) {
                        this.sessionService.clearStorage();
                        this.snackBarConfig.panelClass = ['red-snackbar'];
                        this._snackBar.open(
                            err.error.message,
                            'X',
                            this.snackBarConfig
                        );
                        this.router.navigate(['/sign-in']);
                    } else if (err.status === 400) {
                        this.sessionService.clearStorage();
                        this.snackBarConfig.panelClass = ['red-snackbar'];
                        this._snackBar.open(
                            err.error.message,
                            'X',
                            this.snackBarConfig
                        );
                        this.router.navigate(['/sign-in']);
                    } else if (err.status === 404) {
                        this.snackBarConfig.panelClass = ['red-snackbar'];
                        this._snackBar.open(
                            err.error.message,
                            'X',
                            this.snackBarConfig
                        );
                    } else if (err.status === 500) {
                        this.snackBarConfig.panelClass = ['red-snackbar'];
                        this._snackBar.open(
                            ErrorMessage['ERROR_FIVE_HUNDRED'],
                            'X',
                            this.snackBarConfig
                        );
                    } else if (err.status === 502) {
                        this.sessionService.clearStorage();
                        this.snackBarConfig.panelClass = ['red-snackbar'];
                        this._snackBar.open(
                            err.error.message,
                            'X',
                            this.snackBarConfig
                        );
                        this.router.navigate(['/sign-in']);
                    } else if (err.status === 503) {
                        this.snackBarConfig.panelClass = ['red-snackbar'];
                        this._snackBar.open(
                            err.error.message,
                            'X',
                            this.snackBarConfig
                        );
                    }
                }
            }),
            catchError((error: HttpErrorResponse) => {
                if (error?.status === 401) {
                    this.sessionService.clearStorage();
                    this.snackBarConfig.panelClass = ['red-snackbar'];
                    this._snackBar.open(
                        'Session expired, Please log back in again.',
                        'x',
                        this.snackBarConfig
                    );
                    this.router.navigate(['/sign-in']);
                }
                return throwError(error);
            })
        );
    }
}
