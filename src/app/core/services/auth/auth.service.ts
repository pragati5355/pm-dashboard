import { Injectable } from '@angular/core';
import { HttpClient   } from '@angular/common/http';
import { LocalStorageService } from "angular-web-storage";
import { AppConstants } from '../../constacts/constacts';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private isLoggedIn: boolean = false;
  constructor(private http: HttpClient,private storage: LocalStorageService) {

   }

  login(loginObject: any) {
   return this.http.post(AppConstants['AUTH_USER_API'], loginObject);
  }
  connectJira(obj: any) {
    return this.http.post(AppConstants['CONNECT_PROJECT'], obj);
   }

  setToken(accessToken: any) {
    this.storage.set("accessToken", accessToken);
  }
  setUser(user: any) {
    this.storage.set("user", user);
  }
  setProjectDetails(project: any) {
    this.storage.set("project", project);
  }
  setRefreshToken(refreshToken: any) {
    this.storage.set("refreshToken", refreshToken);
  }

  getRefreshToken() {
    return this.storage.get("refreshToken");
  }

  deleteToken() {
    this.storage.remove("accessToken");
    this.storage.remove("refreshToken");
  }

  getToken(): any {
    return this.storage.get("accessToken");
  }
  getUser() {
    return this.storage.get("user");
  }
  getProjectDetails(){
    return this.storage.get("project");
  }
  setAuthenticated(isLoggedIn: boolean) {
    this.storage.set("isLoggedIn", isLoggedIn);
  }
  updateToken(){
    return this.http.get(AppConstants['UPDATE_ACCESS_TOKEN']);
  }
}




