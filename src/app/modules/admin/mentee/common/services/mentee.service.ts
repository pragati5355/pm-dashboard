import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_LIST, AppConstants } from 'app/core/constacts/constacts';

@Injectable({
    providedIn: 'root',
})
export class MenteeService {
    constructor(private http: HttpClient) {}

    getMenteeDetailsById(obj: any) {
        return this.http.post(AppConstants['GET_RESOURCE'], obj);
    }
    saveOneToOneForm(obj: any) {
        return this.http.post(
            API_LIST.SPRING_BOOT_URL + '/resource/one-to-one-form',
            obj
        );
    }
    getMenteeList(id: number) {
        return this.http.get(API_LIST.SPRING_BOOT_URL + `/mentee/list/${id}`);
    }
    getFormByType(obj: any) {
        return this.http.post(
            AppConstants['PROJECT_API_URL'] + '/get-form-by-type',
            obj
        );
    }
    getMenteeFormList(id: number) {
        return this.http.get(
            API_LIST.SPRING_BOOT_URL + `/resource/one-to-one-form/${id}`
        );
    }
}
