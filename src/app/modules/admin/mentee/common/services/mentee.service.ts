import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from 'app/core/constacts/constacts';

@Injectable({
    providedIn: 'root',
})
export class MenteeService {
    constructor(private http: HttpClient) {}

    getMenteeDetailsById(obj: any) {
        return this.http.post(AppConstants['GET_RESOURCE'], obj);
    }
}
