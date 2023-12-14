import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../constacts/constacts';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    getEmails = AppConstants['PROJECT_API_URL'] + '/emails';
    constructor(private http: HttpClient) {}

    findAllDeveloperEmails() {
        return this.http.get(this.getEmails);
    }

    getDashboardStatsCount() {
        return this.http.get(AppConstants['GET_STATISTICS_COUNT']);
    }
}
