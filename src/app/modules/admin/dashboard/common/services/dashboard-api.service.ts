import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from 'app/core/constacts/constacts';
@Injectable({
    providedIn: 'root',
})
export class DashboardApiService {
    downloadExcelUrl =
        AppConstants['PROJECT_API_URL'] + '/resource-utilization-report';

    downloadExcelAvailabilityUrl = 
        AppConstants['PROJECT_API_URL'] + '/resource-report';

    constructor(private http: HttpClient) {}

    getUtilisationExcelReport() {
        return this.http.get(this.downloadExcelUrl);
    }

    getAvailabilityExcelReport(){
        return this.http.get(this.downloadExcelAvailabilityUrl);
    }
}
