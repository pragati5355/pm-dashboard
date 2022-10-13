import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from "angular-web-storage";
import { AppConstants } from '../constacts/constacts';

@Injectable({
  providedIn: 'root'
})
export class CreateProjecteService {

  constructor(private http: HttpClient, private storage: LocalStorageService) {
  }

  createProject(obj: any) {
    return this.http.post(AppConstants['CREATE_PROJECT'], obj);
  }
  syncJira(obj: any) {
    return this.http.post(AppConstants['SYNC_JIRA'], obj);
  }
  getJiraUser(obj: any) {
    return this.http.post(AppConstants['GET_JIRA_USER'], obj);
   }
  getTeamMember(obj: any) {
    return this.http.post(AppConstants['GET_TEAM_MEMBER_LIST'], obj);
   }
  getProjectDetails(obj: any) {
    return this.http.post(AppConstants['GET_PROJECTS'], obj);
  }
  getOneProjectDetails(obj: any) {
    return this.http.post(AppConstants['GET_PROJECT_DETAILS'], obj);
  }
  getResourceMember(obj: any) {
    return this.http.post(AppConstants['GET_RESOURCE_LIST'], obj);
  }
  addresources(obj: any){
    return this.http.post(AppConstants['ADD_RESOURCE_LIST'], obj);
  }
  getTechnology() {
    return this.http.get(AppConstants['GET_TECHNOLOGY']);
   }
   getresource(obj: any) {
    return this.http.post(AppConstants['GET_RESOURCE'],obj);
   }
   updateDeleteResource(obj: any) {
    return this.http.post(AppConstants['UPDATE_DELETE_RESOURCE'],obj);
   }

   getSprintList(obj: any) {
    return this.http.post(AppConstants['GET_SPRINT_LIST'],obj);
   }
 getTeamMemberList(obj: any) {
  return this.http.post(AppConstants['GET_PROJECT_TEAM_LIST'],obj);
 }
 updateProject(obj: any) {
  return this.http.post(AppConstants['UPDATE_PROJECT'], obj);
}
burndownChart(obj: any) {
  return this.http.post(AppConstants['BURNDOWN_CHART'], obj);
}
getSprintIssueList(obj: any) {
  return this.http.post(AppConstants['GET_SPRINT_ISSUES'], obj);
}
getSprintIssueTypeCount(obj: any) {
  return this.http.post(AppConstants['GET_SPRINT_ISSUES_TYPE_COUNT'], obj);
}
getProjectListWithoutPagination(){
  return this.http.get(AppConstants['GET_PROJECTS_LIST_WITHOUTPAGINATION']);
}
}
