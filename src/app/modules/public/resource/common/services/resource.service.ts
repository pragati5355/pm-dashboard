import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from 'app/core/constacts/constacts';

@Injectable({
    providedIn: 'root',
})
export class ResourceService {
    saveResourceUrl = AppConstants['PROJECT_API_URL'] + '/resource-register';
    preSignedUrl = AppConstants['PROJECT_API_URL'] + '/upload-resource-resume';
    getEmailsUrl = AppConstants['PROJECT_API_URL'] + '/emails';
    constructor(private http: HttpClient) {}

    saveResource(obj: any) {
        return this.http.post(this.saveResourceUrl, obj);
    }

    getPreSignedUrl(obj: any) {
        return this.http.post(this.preSignedUrl, obj);
    }

    uploadFileToS3(url: string, file: any) {
        return this.http.put(url, file, {
            headers: { skipToken: 'true' },
        });
    }

    getEmails() {
        return this.http.get(this.getEmailsUrl);
    }
}
