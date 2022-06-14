import { Injectable } from '@angular/core';
import { HttpClient   } from '@angular/common/http';
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
  private authorizeEndPoint  = '/oauth2/authorization/google'
  private tokenEndPoint = '/login/oauth2/code/google'
  private baseUrl = "https://90ab-103-127-166-119.in.ngrok.io/"
   private tokenKey = 'token';

  constructor(private http: HttpClient) {

   }

  login(loginObject: any) {
return this.http.post("https://463b-2402-8100-384b-f6fa-b0ab-7be7-8661-2ecd.in.ngrok.io/user", loginObject);
  }
}




