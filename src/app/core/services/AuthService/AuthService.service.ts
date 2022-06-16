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

  constructor(private http: HttpClient) {

   }

  login(loginObject: any) {
return this.http.post("https://11vi8vyl44.execute-api.ap-south-1.amazonaws.com/signin", loginObject);
  }
}




