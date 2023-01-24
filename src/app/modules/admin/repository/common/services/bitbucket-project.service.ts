import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from 'app/core/constacts/constacts';
import { map, Observable, of } from 'rxjs';
import { BitbucketMemberModel } from '../models/bitbucket-member.model';
import { BitbucketProjectDeveloperModel } from '../models/bitbucket-project-developer.model';
import { BitbucketProjectModel } from '../models/bitbucket-project.model';

@Injectable({
    providedIn: 'root',
})
export class BitbucketProjectService {
    bitBucketProjectUrl = AppConstants['PROJECT_API_URL'] + '/bitbucket-projects';

    constructor(private http : HttpClient) {}

    findAll(): Observable<BitbucketProjectModel[]> {
        return this.http.get<BitbucketProjectModel[]>(this.bitBucketProjectUrl).pipe(map(res => res['data']));
    }

    findAllDeveloperEmails(): Observable<BitbucketProjectDeveloperModel[]> {
        return of([]);
    }

    findAllMembers(): Observable<BitbucketMemberModel[]> {
        return of([]);
    }
}
