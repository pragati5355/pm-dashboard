import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'angular-web-storage';
import { AppConstants } from '../../constacts/constacts';
import { Router } from '@angular/router';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private isLoggedIn: boolean = false;
    constructor(
        private http: HttpClient,
        private storage: LocalStorageService,
        private router: Router
    ) {}

    login(loginObject: any) {
        return this.http.post(AppConstants['AUTH_USER_API'], loginObject);
    }
    connectJira(obj: any) {
        return this.http.post(AppConstants['CONNECT_PROJECT'], obj);
    }

    setToken(accessToken: any) {
        this.storage.set('accessToken', accessToken);
    }
    setUser(user: any) {
        this.storage.set('user', user);
    }
    setUserPhoto(photoUrl: any) {
        this.storage.set('photoUrl', photoUrl);
    }
    setProjectDetails(project: any) {
        this.storage.set('project', project);
    }
    setRefreshToken(refreshToken: any) {
        this.storage.set('refreshToken', refreshToken);
    }

    setRepositoryDraft(draft: any) {
        this.storage.set('repositoryDraft', draft);
    }
    getRepositoryDraft() {
        return this.storage.get('repositoryDraft');
    }
    getRefreshToken() {
        return this.storage.get('refreshToken');
    }
    getUserPhoto() {
        return this.storage.get('photoUrl');
    }
    deleteToken() {
        this.storage.remove('accessToken');
        this.storage.remove('refreshToken');
    }

    getToken(): any {
        return this.storage.get('accessToken');
    }
    getUser() {
        return this.storage.get('user');
    }
    getProjectDetails() {
        return this.storage.get('project');
    }
    setAuthenticated(isLoggedIn: boolean) {
        this.storage.set('isLoggedIn', isLoggedIn);
    }
    updateToken() {
        return this.http.get(AppConstants['UPDATE_ACCESS_TOKEN']);
    }
    updateAndReload(pageUrl: any) {
        this.updateToken().subscribe((res: any) => {
            if (res) {
                this.setToken(res.data.accessToken);
                window.location.reload();
            } else {
                this.router.navigate(['/sign-in']);
            }
        });
    }
}
