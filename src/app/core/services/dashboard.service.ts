import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../constacts/constacts';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    constructor(private http: HttpClient) {}

    getDashboardStatsCount() {
        return this.http.get(AppConstants['GET_STATISTICS_COUNT']);
    }
}
