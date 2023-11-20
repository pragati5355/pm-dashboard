import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_LIST, AppConstants } from 'app/core/constacts/constacts';

@Injectable({
    providedIn: 'root',
})
export class ExternalProjectsApiService {
    getEmails = AppConstants['PROJECT_API_URL'] + '/emails';
    mapResourceUrl =  API_LIST.PROJECT_SPRING_BOOT_URL + '/resource/map-resource';
    externalProjectsListUrl =
        AppConstants['PROJECT_API_URL'] + '/get-external-project';


    constructor(private http: HttpClient) {}

    findAllDeveloperEmails() {
        return this.http.get(this.getEmails);
    }

    mapResource(obj: any) {
        return this.http.post(this.mapResourceUrl, obj);
    }

    getTechnologies() {
        return this.http.get(AppConstants['PROJECT_API_URL'] + '/technology');
    }

    getExternalProjectsList() {
        return this.http.get(this.externalProjectsListUrl);
    }

    getAllowEditWorklog(obj:any){
        return this.http.post(API_LIST.PROJECT_SPRING_BOOT_URL + `/resource/allow-edit` , obj);
    }
}
