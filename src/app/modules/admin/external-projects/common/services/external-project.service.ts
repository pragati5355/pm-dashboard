import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_LIST, AppConstants } from 'app/core/constacts/constacts';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ExternalProjectService {
    createExternalProjectUrl =  API_LIST.PROJECT_SPRING_BOOT_URL + '/external';

    sendRemindersUrl =
        AppConstants['PROJECT_API_URL'] + '/save-project-setting';

    constructor(private http: HttpClient) {}

    create(externalProjectInDto: any): Observable<any> {
        return this.http.post(
            this.createExternalProjectUrl,
            externalProjectInDto
        );
    }

    getTechnologies() {
        return this.http.get(AppConstants['PROJECT_API_URL'] + '/technology');
    }

    sendReminder(obj: any) {
        return this.http.post(this.sendRemindersUrl, obj);
    }

    saveSettings(obj: any) {
        return this.http.post(
            API_LIST.SPRING_BOOT_URL + '/project/setting/save',
            obj
        );
    }
}
