import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_LIST, AppConstants } from 'app/core/constacts/constacts';

@Injectable({
    providedIn: 'root',
})
export class WorkLogsService {
    workLogsUrl = AppConstants['PROJECT_API_URL'] + '/save-worklog';
    downloadWorkLogUrl = AppConstants['REPO_API_URL']+ '/worklog/download-sheet';

    constructor(private http: HttpClient) {}

    saveAndGetWorkLogsData(obj: any) {
        return this.http.post(this.workLogsUrl, obj);
    }

    getResourcesPublic(key: any) {
        return this.http.get(API_LIST.GET_RESOURCE_PUBLIC + key);
    }

    getResourceWorkLogPublic(obj: any) {
        return this.http.post(API_LIST.GET_RESOURCE_WORKLOG_PUBLIC, obj);
    }

    downloadWorklog(obj: any) {
        return this.http.post(this.downloadWorkLogUrl, obj);
    }
}
