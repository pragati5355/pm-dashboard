import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BitbucketProjectModel } from '../models/bitbucket-project.model';
import { AppConstants } from 'app/core/constacts/constacts';
import { map, Observable, of } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class BitbucketProjectService {
    bitBucketProjectUrl = AppConstants['PROJECT_API_URL'] + '/bitbucket-projects';
    assignProjectUrl = AppConstants['PROJECT_API_URL'] + '/assign-project';

    constructor(private http : HttpClient) {}

    findAll(): Observable<BitbucketProjectModel[]> {
        return this.http.get<BitbucketProjectModel[]>(this.bitBucketProjectUrl).pipe(map(res => res['data']));
    }

    assign(payload: any): Observable<any>{
        return this.http.post(this.assignProjectUrl, payload);
    }

 
}
