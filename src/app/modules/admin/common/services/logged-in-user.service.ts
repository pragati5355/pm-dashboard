import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoggedInUserService {
    private loggedInUser: BehaviorSubject<any> = new BehaviorSubject(null);
    private userData: any = null;

    constructor(private http: HttpClient) {}

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
        this.userData = {
            userId: 14,
            email: 'rahul.dudhane@mindbowser.com',
            firstName: 'Rahul',
            lastName: 'Dudhane',
            role: 'PM',
            photoUrl:
                'https://lh3.googleusercontent.com/a/AAcHTteRuPnlLsGhimr-_l3-ErfSrSyqX1uW3Dbl9Qi1=s96-c',
            provider: null,
            id: '116252424213133229008',
        };
        this.loggedInUser.next(this.userData);
        return of(this.userData);
    }
}
