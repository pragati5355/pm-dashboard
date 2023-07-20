import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from 'app/core/constacts/constacts';

@Injectable({
    providedIn: 'root',
})
export class WorkLogsService {
    workLogsUrl = AppConstants['PROJECT_API_URL'] + '/save-worklog';
    constructor(private http: HttpClient) {}

    saveAndGetWorkLogsData(obj: any) {
        return this.http.post(this.workLogsUrl, obj);
    }
}
