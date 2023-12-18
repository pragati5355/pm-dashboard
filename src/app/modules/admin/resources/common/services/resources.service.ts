import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_LIST, AppConstants } from 'app/core/constacts/constacts';

@Injectable({
    providedIn: 'root',
})
export class ResourcesService {
    csvDownloadTempletUrl = AppConstants['CSV_TEMPLATE_URL'];
    getEmails = API_LIST.RESOURCE_SPRING_BOOT_URL + '/emails';
    uploadCsvUrl = AppConstants['PROJECT_API_URL'];
    csvPreSignedUrl = AppConstants['PROJECT_API_URL'] + '/upload-resources-csv';
    csvBulkUploadUrl =
        AppConstants['PROJECT_API_URL'] + '/bulk-upload-resource';

    getRegisteredResourceUrl =
        AppConstants['PROJECT_API_URL'] + '/get-registered-resource';
    acceptOnboardResource = AppConstants['PROJECT_API_URL'] + '/add-resource';
    inviteResourceUrl = API_LIST.SPRING_BOOT_URL + '/user/invite';
    invitedResourceListUrl = API_LIST.SPRING_BOOT_URL + '/user/invited';

    constructor(private http: HttpClient) {}

    findAllDeveloperEmails() {
        return this.http.get(this.getEmails);
    }

    getMenteeFormList(id: number) {
        return this.http.get(
            API_LIST.SPRING_BOOT_URL + `/resource/one-to-one-form/${id}`
        );
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

    getRegisteredResource() {
        return this.http.get(API_LIST.SPRING_BOOT_URL + '/resource/registerd');
    }

    getResourceBySearch(searchKey: string) {
        return this.http.get(
            API_LIST.SPRING_BOOT_URL + '/resource/registerd/' + searchKey
        );
    }

    saveOnboardedResource(obj: any) {
        return this.http.post(
            API_LIST.SPRING_BOOT_URL + '/resource/accept',
            obj
        );
    }

    inviteResource(obj: any) {
        return this.http.post(this.inviteResourceUrl, obj);
    }

    getResourcesList() {
        return this.http.get(this.invitedResourceListUrl);
    }
}
