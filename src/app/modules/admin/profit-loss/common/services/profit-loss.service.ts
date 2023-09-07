import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from 'app/core/constacts/constacts';

@Injectable({
  providedIn: 'root'
})
export class ProfitLossService {

  pNLProjectListUrl = AppConstants['PROJECT_API_URL'] + '';

  constructor(private http: HttpClient) { }

  getPNLProjectList(obj: any) {
    return this.http.post(this.pNLProjectListUrl, obj);
  }
}
