import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from 'app/core/constacts/constacts';

@Injectable({
    providedIn: 'root',
})
export class ExternalProjectsApiService {
    getEmails = AppConstants['PROJECT_API_URL'] + '/emails';
    mapResourceUrl = AppConstants['PROJECT_API_URL'] + '/map-resource';
    externalProjectsListUrl =
        AppConstants['PROJECT_API_URL'] + '/get-external-project';
    constructor(private http: HttpClient) {}

    findAllDeveloperEmails() {
        return this.http.get(this.getEmails);
    }

    mapResource(obj: any) {
        return this.http.post(this.mapResourceUrl, obj);
    }

    getExternalProjectsList() {
        return this.http.get(this.externalProjectsListUrl);
    }
}
