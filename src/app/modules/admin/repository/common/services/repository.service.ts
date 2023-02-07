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
    createBitbucketRepository =
        AppConstants['PROJECT_API_URL'] + '/create-project';
    getEmails = AppConstants['PROJECT_API_URL'] + '/emails';
    getBitbucketMember = AppConstants['PROJECT_API_URL'] + '/bitbucket-members';
    sendFile = AppConstants['PROJECT_API_URL'] + '/send-file';
    create(obj: any) {
        return this.http.post(this.createBitbucketRepository, obj);
    }

    find(id: string) {}

    findAllDeveloperEmails() {
        return this.http.get(this.getEmails);
    }

    findAllMembers() {
        return this.http.get(this.getBitbucketMember);
    }

    sendFileEmail(obj: any) {
        return this.http.post(this.sendFile, obj);
    }
}
