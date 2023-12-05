import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_LIST, AppConstants } from 'app/core/constacts/constacts';
import { NominateModel } from '../../nominate-form/nominate-form.component';
@Injectable({
    providedIn: 'root',
})
export class DashboardApiService {
    downloadExcelUrl =
        AppConstants['PROJECT_API_URL'] + '/resource-utilization-report';

    downloadExcelAvailabilityUrl =
        AppConstants['PROJECT_API_URL'] + '/resource-report ';

    downloadExcelGenericUrl =
        AppConstants['PROJECT_API_URL'] + '/resource-generic-report';

    constructor(private http: HttpClient) {}

    getUtilisationExcelReport() {
        return this.http.get(
            API_LIST.SPRING_BOOT_URL + '/resource/utilization-report'
        );
    }

    getGenericExcelReport() {
        return this.http.get(this.downloadExcelGenericUrl);
    }

    getAvailabilityExcelReport() {
        return this.http.get(
            API_LIST.SPRING_BOOT_URL + '/resource/availability-report'
        );
    }

    saveNominee(obj: NominateModel) {
        return this.http.post(API_LIST.SPRING_BOOT_URL + '/nominee/save', obj);
    }

    getNomineeList(obj: any) {
        return this.http.post(API_LIST.SPRING_BOOT_URL + '/nominee/list', obj);
    }
}
