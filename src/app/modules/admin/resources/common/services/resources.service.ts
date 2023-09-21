import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_LIST, AppConstants } from 'app/core/constacts/constacts';

@Injectable({
    providedIn: 'root',
})
export class ResourcesService {
    csvDownloadTempletUrl = AppConstants['CSV_TEMPLATE_URL'];
    getEmails = AppConstants['PROJECT_API_URL'] + '/emails';
    uploadCsvUrl = AppConstants['PROJECT_API_URL'];
    csvPreSignedUrl = AppConstants['PROJECT_API_URL'] + '/upload-resources-csv';
    csvBulkUploadUrl =
        AppConstants['PROJECT_API_URL'] + '/bulk-upload-resource';

    getRegisteredResourceUrl =
        AppConstants['PROJECT_API_URL'] + '/get-registered-resource';
    acceptOnboardResource = AppConstants['PROJECT_API_URL'] + '/add-resource';

    constructor(private http: HttpClient) {}

    findAllDeveloperEmails() {
        return this.http.get(this.getEmails);
    }

    csvBulkUpload(obj: any) {
        return this.http.post(this.csvBulkUploadUrl, obj);
    }

    getCsvPreSignedUrl(obj: any) {
        return this.http.post(this.csvPreSignedUrl, obj);
    }

    uploadCsvFileToS3(url: string, file: any) {
        return this.http.put(url, file, {
            headers: { skipToken: 'true', 'Content-Type': 'text/csv' },
        });
    }

    getRegisteredResource(obj: any) {
        return this.http.post(this.getRegisteredResourceUrl, obj);
    }

    saveOnboardedResource(obj: any) {
        return this.http.post(
            API_LIST.SPRING_BOOT_URL + '/resource/accept',
            obj
        );
    }
}
