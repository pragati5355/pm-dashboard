import { Injectable } from '@angular/core';
import { HttpClient   } from '@angular/common/http';
import { LocalStorageService } from "angular-web-storage";
// import { HttpHeaders                   } from '@angular/common/http';
import { AppConstants } from '../../constacts/constacts';
// import { map, Observable, observable, tap } from 'rxjs';
// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json',
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Methods': 'POST, GET, DELETE, PUT',
//   'Access-Control-Allow-Headers': 'Origin, Authorization, Accept', 
// })
// };
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient,private storage: LocalStorageService) {

   }

  login(loginObject: any) {
return this.http.post(AppConstants['AUTH_USER_API'], loginObject);
  }

  setToken(accessToken: any) {
    this.storage.set("accessToken", accessToken);
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

  clearStorage() {
    this.storage.clear();
  }
}




