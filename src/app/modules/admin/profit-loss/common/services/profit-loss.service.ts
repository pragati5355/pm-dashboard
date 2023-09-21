import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from 'app/core/constacts/constacts';

@Injectable({
  providedIn: 'root'
})
export class ProfitLossService {

  pNLProjectListUrl = AppConstants['GET_PROJECTS'];

  constructor(private http: HttpClient) { }

  getPNLProjectList(obj: any) {
    return this.http.post(this.pNLProjectListUrl, obj);
  }

  getPNLStatList(id:number){
    return this.http.get(`https://dev-api.metrics.mindbowser.com/api/v1/project/get-project-stats/${id}`);
  }
}
