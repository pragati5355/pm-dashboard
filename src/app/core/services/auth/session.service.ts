import { Injectable } from '@angular/core';
import { HttpClient   } from '@angular/common/http';
import { LocalStorageService } from "angular-web-storage";
import { AppConstants } from '../../constacts/constacts';
@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient,private storage: LocalStorageService) { }
  clearStorage() {
    this.storage.clear();
  }
}
