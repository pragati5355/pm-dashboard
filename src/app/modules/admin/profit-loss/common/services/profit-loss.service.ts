import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from 'app/core/constacts/constacts';

@Injectable({
  providedIn: 'root'
})
export class ProfitLossService {

  pNLProjectListUrl = AppConstants['GET_PROJECTS'];

  pNlStatListUrl = AppConstants['GET_PNL_STAT_LIST'];

  constructor(private http: HttpClient) { }

  getPNLProjectList(obj: any) {
    return this.http.post(this.pNLProjectListUrl, obj);
  }

  getPNLStatList(){
    return this.http.get(this.pNlStatListUrl);
  }
}
