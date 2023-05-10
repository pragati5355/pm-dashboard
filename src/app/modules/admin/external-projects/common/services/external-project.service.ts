import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from 'app/core/constacts/constacts';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ExternalProjectService {
    createExternalProjectUrl =
        AppConstants['PROJECT_API_URL'] + '/external-project';

    constructor(private http: HttpClient) {}

    create(externalProjectInDto: any): Observable<any> {
        return this.http.post(
            this.createExternalProjectUrl,
            externalProjectInDto
        );
    }
}
