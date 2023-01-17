import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BitbucketMemberModel } from '../models/bitbucket-member.model';
import { BitbucketProjectDeveloperModel } from '../models/bitbucket-project-developer.model';
import { BitbucketProjectModel } from '../models/bitbucket-project.model';

@Injectable({
    providedIn: 'root',
})
export class BitbucketProjectService {
    constructor() {}

    findAll(): Observable<BitbucketProjectModel[]> {
        return of([]);
    }

    findAllDeveloperEmails(): Observable<BitbucketProjectDeveloperModel[]> {
        return of([]);
    }

    findAllMembers(): Observable<BitbucketMemberModel[]> {
        return of([]);
    }
}
