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
        return this.http.post(API_LIST.SPRING_BOOT_URL, obj);
    }
}
