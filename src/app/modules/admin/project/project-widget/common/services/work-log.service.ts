import { Injectable } from '@angular/core';
import { AppConstants } from 'app/core/constacts/constacts';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class WorkLogService {
    getWorklogsUrl = AppConstants['PROJECT_API_URL'] + '/worklog-list';
    saveWorklogsUrl = AppConstants['PROJECT_API_URL'] + '/save-worklog-portal';
    downloadWorkLogUrl = AppConstants['PROJECT_API_URL'] + '/create-worklog-sheet';

    constructor(private http: HttpClient) {}

    getWorkLogs(obj: any) {
        return this.http.post(this.getWorklogsUrl, obj);
    }

    saveWorkLogs(obj: any) {
        return this.http.post(this.saveWorklogsUrl, obj);
    }

    downloadWorklog(obj :any){
        return this.http.post(this.downloadWorkLogUrl, obj);
    }
}
