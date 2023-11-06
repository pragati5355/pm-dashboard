import { Injectable } from '@angular/core';
import { API_LIST, AppConstants } from 'app/core/constacts/constacts';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class WorkLogService {
    saveWorklogsUrl = API_LIST.SPRING_BOOT_URL + '/worklog';
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

    getProjectResource(id: any) {
        return this.http.get(
            API_LIST.PROJECT_SPRING_BOOT_URL + `/resource/id/${id}`
        );
    }

    saveWorkLogs(obj: any) {
        return this.http.post(this.saveWorklogsUrl, obj);
    }

    downloadWorklog(obj: any) {
        return this.http.post(API_LIST.DOWNLOAD_WORKLOG_EXTERNAl_SHEET, obj);
    }
}
