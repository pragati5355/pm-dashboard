import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from "angular-web-storage";
import { AppConstants } from '../constacts/constacts';
@Injectable({
  providedIn: 'root'
})
export class AddFormService {

  constructor(private http: HttpClient, private storage: LocalStorageService) {
  }
addForm(obj: any) {
  return this.http.post(AppConstants['ADD_FORM'], obj);
}
}
