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
    return this.http.post(AppConstants['JIRA_SYNC'], obj);
   }
   workLog(obj: any) {
    return this.http.post(AppConstants['WORK_LOG'], obj);
   }
   getJiraUser(obj: any) {
    return this.http.post(AppConstants['GET_JIRA_USER'], obj);
   }
   getTeamMember() {
    return this.http.get(AppConstants['GET_TEAM_MEMBER_LIST']);
   }
   getProjectDetails() {
    return this.http.get(AppConstants['GET_PROJECTS']);
   }
}
