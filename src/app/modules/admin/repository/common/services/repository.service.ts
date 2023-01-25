import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BitbucketMemberModel } from '../models/bitbucket-member.model';
import { BitbucketProjectDeveloperModel } from '../models/bitbucket-project-developer.model';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../../../../../core/constacts/constacts';
@Injectable({
    providedIn: 'root',
})
export class RepositoryService {
    constructor(private http: HttpClient) {}

    create(obj: any) {
        return this.http.post(AppConstants['CREATE_BITBUCKET_REPOSITORY'], obj)
    }

    find(id: string) {}

    findAllDeveloperEmails() {
        return this.http.get(AppConstants['GET_EMAILS']);
    }

    findAllMembers() {
        return this.http.get(AppConstants['GET_BITBUCKET_MEMBER']);
    }
}
