import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from 'app/core/constacts/constacts';

@Injectable({
    providedIn: 'root',
})
export class WeeklyStatusService {
    getWeeklyStatusFormUrl = AppConstants['PROJECT_API_URL'] + '/get-form-by-type';

    saveWeeklyFormUrl = AppConstants['PROJECT_API_URL'] + '/weekly-form';

    getWeeklyStatusListUrl =  AppConstants['PROJECT_API_URL'] + '/weekly-form-by-project-id';
    constructor(private http: HttpClient) {}

    getWeeklyStatusFormComponent() {
        return this.http.post(this.getWeeklyStatusFormUrl, {
            formType: 'WEEKLY_FEEDBACK',
        });
    }

    saveWeeklyStatusForm(obj: any) {
        return this.http.post(this.saveWeeklyFormUrl, obj);
    }

    getWeeklyStatusList(id:any){
        return this.http.post(this.getWeeklyStatusListUrl,id);             
    }
}
