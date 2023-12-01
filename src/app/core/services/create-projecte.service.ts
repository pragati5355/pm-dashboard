import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'angular-web-storage';
import { API_LIST, AppConstants } from '../constacts/constacts';

@Injectable({
    providedIn: 'root',
})
export class CreateProjecteService {
    constructor(
        private http: HttpClient,
        private storage: LocalStorageService
    ) {}

    getResourceEmails() {
        return this.http.get(AppConstants['PROJECT_API_URL'] + '/emails');
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
    getExternalProjectList() {
        return this.http.get(AppConstants['GET_EXTERNAL_PROJECTS']);
    }
    addExternalProject(obj: any) {
        return this.http.post(AppConstants['ADD_EXTERNAL_PROJECTS'], obj);
    }
    getOneProjectDetails(obj: any) {
        return this.http.post(AppConstants['GET_PROJECT_DETAILS'], obj);
    }
    getProjectById(id: number) {
        return this.http.get(
            API_LIST.SPRING_BOOT_URL + '/project/get-project-by-id/' + id
        );
    }
    getResourceMember(obj: any) {
        return this.http.post(AppConstants['GET_RESOURCE_LIST'], obj);
    }
    addresources(obj: any) {
        return this.http.post(AppConstants['ADD_RESOURCE_LIST'], obj);
    }
    getResourceHappinessScore(obj: any) {
        return this.http.post(
            AppConstants['GET_RESOURCE_HAPPINESS_SCORE'],
            obj
        );
    }
    getTechnology() {
        return this.http.get(AppConstants['GET_TECHNOLOGY']);
    }
    getresource(obj: any) {
        return this.http.post(AppConstants['GET_RESOURCE'], obj);
    }
    updateDeleteResource(obj: any) {
        return this.http.post(
            API_LIST.RESOURCE_SPRING_BOOT_URL + '/update-delete',
            obj
        );
    }

    getSprintList(obj: any) {
        return this.http.post(AppConstants['GET_SPRINT_LIST'], obj);
    }
    getTeamMemberList(obj: any) {
        return this.http.get(
            `${API_LIST.SPRING_BOOT_URL}/project/resource/id/${obj?.id}`
        );
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
        return this.http.post(
            AppConstants['GET_SPRINT_ISSUES_TYPE_COUNT'],
            obj
        );
    }
    getProjectListWithoutPagination() {
        return this.http.get(
            AppConstants['GET_PROJECTS_LIST_WITHOUTPAGINATION']
        );
    }
    getSprintProgress(obj: any) {
        return this.http.post(AppConstants['SPRINT_PROGRESS'], obj);
    }
    getHappinessScoreBySprint(obj: any) {
        return this.http.post(
            AppConstants['GET_HAPPINESS_SCORE_BY_SPRINT'],
            obj
        );
    }
    getHappinessScoreByProject(obj: any) {
        return this.http.post(
            AppConstants['GET_HAPPINESS_SCORE_BY_PROJECT'],
            obj
        );
    }
}
