import { Injectable } from '@angular/core';
import { HttpClient   } from '@angular/common/http';
import { LocalStorageService } from "angular-web-storage";
import { AppConstants } from '../constacts/constacts';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CreateProjecteService {

  constructor(private http: HttpClient,private storage: LocalStorageService) { }
  syncJira(obj: any) {
    return this.http.post('https://3znje7eqrk.execute-api.ap-south-1.amazonaws.com/issue', obj);
   }
   workLog(obj: any) {
    return this.http.post('https://3znje7eqrk.execute-api.ap-south-1.amazonaws.com/work-log', obj);
   }
}
