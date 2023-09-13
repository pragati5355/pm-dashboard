import { Injectable } from '@angular/core';
import { API_LIST, AppConstants } from 'app/core/constacts/constacts';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class WorkLogService {
    saveWorklogsUrl = AppConstants['PROJECT_API_URL'] + '/save-worklog-portal';
    downloadWorkLogUrl =
        AppConstants['PROJECT_API_URL'] + '/create-worklog-sheet';
    getResourceUrl = AppConstants['PROJECT_API_URL'] + '/project-team';
    constructor(private http: HttpClient) {}

    getWorkLogs(obj: any) {
        return this.http.post(API_LIST.GET_WORK_LOG_LIST, obj);
    }

    getShareLink(id: number) {
        return this.http.get(API_LIST.GET_SHARE_WORKLOG + id);
    }

    saveShareLink(obj: any) {
        return this.http.post(API_LIST.SAVE_SHARE_WORKLOG, obj);
    }

    getProjectResource(obj: any) {
        return this.http.post(this.getResourceUrl, obj);
    }

    saveWorkLogs(obj: any) {
        return this.http.post(this.saveWorklogsUrl, obj);
    }

    downloadWorklog(obj: any) {
        return this.http.post(this.downloadWorkLogUrl, obj);
    }
}
