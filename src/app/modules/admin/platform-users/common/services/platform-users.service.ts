import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from 'app/core/constacts/constacts';
import { createUser } from '../../models';
@Injectable({
    providedIn: 'root',
})
export class PlatformUsersService {
    constructor(private http: HttpClient) {}

    create(obj: createUser) {
        return this.http.post(AppConstants['CREATE_PLATFORM_USER'], obj);
    }
}
