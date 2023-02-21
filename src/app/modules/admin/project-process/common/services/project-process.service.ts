import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../../../../../core/constacts/constacts';
@Injectable({
    providedIn: 'root',
})
export class ProjectProcessService {
    constructor(private http: HttpClient) {}
    getProcessForm = AppConstants['PROJECT_API_URL'] + '/checklist-form';
    saveProcessForm = AppConstants['PROJECT_API_URL'] + '/checklist';
    submittedProcessForm =
        AppConstants['PROJECT_API_URL'] + '/checklist-response';
    find() {
        return this.http.get(this.getProcessForm);
    }
    create(obj: any) {
        return this.http.post(this.saveProcessForm, obj);
    }
    submittedForm(obj: any) {
        return this.http.post(this.submittedProcessForm, obj);
    }
}
