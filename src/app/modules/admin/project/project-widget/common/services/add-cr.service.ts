import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from 'app/core/constacts/constacts';

@Injectable({
    providedIn: 'root',
})
export class AddCrService {
    getEmailsUrl = AppConstants['PROJECT_API_URL'] + '/emails';
    projectDetailsByIdUrl =
        AppConstants['PROJECT_API_URL'] + '/get-project-by-id';
    mapResourceUrl = AppConstants['PROJECT_API_URL'] + '/map-resource';
    constructor(private http: HttpClient) {}
    addCrUrl = AppConstants['PROJECT_API_URL'] + '/change-request';

    findAllDeveloperEmails() {
        return this.http.get(this.getEmailsUrl);
    }

    getProjectDetailsById(obj: any) {
        return this.http.post(this.projectDetailsByIdUrl, obj);
    }

    mapResource(obj: any) {
        return this.http.post(this.mapResourceUrl, obj);
    }

    changeRequest(obj: any) {
        return this.http.post(this.addCrUrl, obj);
    }
}