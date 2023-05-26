import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from 'app/core/constacts/constacts';

@Injectable({
    providedIn: 'root',
})
export class ResourcesService {
    csvDownloadTempletUrl = AppConstants['CSV_TEMPLATE_URL'];
    getEmails = AppConstants['PROJECT_API_URL'] + '/emails';
    uploadCsvUrl = AppConstants['PROJECT_API_URL'];
    csvPreSignedUrl = AppConstants['PROJECT_API_URL'];

    constructor(private http: HttpClient) {}

    findAllDeveloperEmails() {
        return this.http.get(this.getEmails);
    }

    uploadCsv(preSignedURL: string, file: File) {
        return this.http.post(preSignedURL, file);
    }

    getCsvPreSignedUrl(obj: any) {
        return this.http.post(this.csvPreSignedUrl, obj);
    }
}
