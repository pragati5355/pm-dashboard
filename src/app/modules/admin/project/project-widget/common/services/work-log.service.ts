import { Injectable } from '@angular/core';
import { AppConstants } from 'app/core/constacts/constacts';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class WorkLogService {
    getWorklogsUrl = AppConstants['PROJECT_API_URL'] + '/save-worklog-portal';
    constructor(private http: HttpClient) {}

    getWorkLogs() {
        return this.http.get(this.getWorklogsUrl);
    }
}
