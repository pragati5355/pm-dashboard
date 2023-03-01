import { Injectable, Type } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
declare var AWS: any;
import { AppConstants } from '../../../../../core/constacts/constacts';
import * as moment from 'moment';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Content } from '@angular/compiler/src/render3/r3_ast';
@Injectable({
    providedIn: 'root',
})
export class UploadServiceService {
    bucketName = AppConstants['S3_BUCKET_NAME'];
    preSignedURL = AppConstants['PROJECT_API_URL'] + '/url-to-upload';
    constructor(private http: HttpClient) {}

    getPreSignedURL(obj: any) {
        return this.http.post(this.preSignedURL, obj);
    }

    upload(preSignedURL: string, file: File): Observable<any> {
        return this.http.put(preSignedURL, file, {
            headers: { skipToken: 'true', 'Content-Type': 'text/yaml' },
        });
    }
}
