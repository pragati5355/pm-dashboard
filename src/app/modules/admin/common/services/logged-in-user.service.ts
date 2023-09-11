import { I } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';
import { API_LIST } from 'app/core/constacts/constacts';
import { BehaviorSubject, map, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoggedInUserService {
    private loggedInUser: BehaviorSubject<any> = new BehaviorSubject({
        id: 3,
        email: 'rohan.kadam@mindbowser.com',
        firstName: 'Rohan',
        lastName: 'Kadam',
        status: 'ACTIVATED',
        role: 'ADMIN',
        resourceId: 1,
        deleted: false,
    });
    private userData: any = null;

    constructor(private http: HttpClient, private authService: AuthService) {}

    setUser(userData: any) {
        this.userData = userData;
        this.loggedInUser.next(userData);
    }

    getLoggedInUser(): Observable<any> {
        if (this.userData) {
            return this.loggedInUser.asObservable();
        } else {
            return this.findUser();
        }
    }

    private findUser() {
        return this.http.get(API_LIST.LOGGED_IN_USER).pipe(
            map((response: any) => {
                if (response && response['data']) {
                    this.setUser({
                        id: 3,
                        email: 'rohan.kadam@mindbowser.com',
                        firstName: 'Rohan',
                        lastName: 'Kadam',
                        status: 'ACTIVATED',
                        role: 'ADMIN',
                        resourceId: 1,
                        deleted: false,
                    });
                    return response['data'];
                }
                return null;
            })
        );
    }
}
