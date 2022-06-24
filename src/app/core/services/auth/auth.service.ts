import { Injectable } from '@angular/core';
import { HttpClient   } from '@angular/common/http';
import { LocalStorageService } from "angular-web-storage";
import { AppConstants } from '../../constacts/constacts';
@Injectable({
  providedIn: 'root'
})
export class AuthService{

  constructor(private http: HttpClient,private storage: LocalStorageService) {

   }

  login(loginObject: any) {
return this.http.post(AppConstants['AUTH_USER_API'], loginObject);
  }

  setToken(accessToken: any) {
    this.storage.set("accessToken", accessToken);
  }
  setUser(user: any) {
    this.storage.set("user", user);
  }

  setRefreshToken(refreshToken: any) {
    this.storage.set("refreshToken", refreshToken);
  }

  getRefreshToken() {
    this.storage.get("refreshToken");
  }

  deleteToken() {
    this.storage.remove("accessToken");
    this.storage.remove("refreshToken");
  }

  getToken() {
    return this.storage.get("accessToken");
  }
  getUser() {
    return this.storage.get("user");
  }

}




