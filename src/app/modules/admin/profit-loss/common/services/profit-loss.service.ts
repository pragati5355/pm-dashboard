import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_LIST, AppConstants } from 'app/core/constacts/constacts';

@Injectable({
  providedIn: 'root'
})
export class ProfitLossService {

  pNLProjectListUrl = API_LIST.PROJECT_SPRING_BOOT_URL;

  constructor(private http: HttpClient) { }

  getPNLProjectList() {
    return this.http.get(this.pNLProjectListUrl + `/list`);
  }

  getPNLStatList(id:number){
    return this.http.get(API_LIST.SPRING_BOOT_URL + `/project/get-project-stats/${id}`)
  }
}
