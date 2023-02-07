import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
declare var AWS: any;
import { AppConstants } from '../../../../../core/constacts/constacts';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
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
        const formData = new FormData();
        formData.append('file', file);
        return this.http.put(preSignedURL, formData, {
            headers: { skipToken: 'true' },
        });
    }
}
