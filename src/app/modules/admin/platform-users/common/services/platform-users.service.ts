import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from 'app/core/constacts/constacts';
import { createUser } from '../../models';
@Injectable({
    providedIn: 'root',
})
export class PlatformUsersService {
    createOrUpdateUser = AppConstants['PROJECT_API_URL'] + '/platform-user';
    getAllUsers = AppConstants['PROJECT_API_URL'] + '/user-list';
    changeStatusUrl = AppConstants['PROJECT_API_URL'] + '/platform-user';
    constructor(private http: HttpClient) {}

    create(obj: createUser) {
        return this.http.post(this.createOrUpdateUser, obj);
    }

    getUsers() {
        return this.http.get(this.getAllUsers);
    }

    changeStatus(obj: any) {
        return this.http.put(this.changeStatusUrl, obj);
    }
}
