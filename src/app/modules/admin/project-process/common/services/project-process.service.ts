import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../../../../../core/constacts/constacts';
@Injectable({
    providedIn: 'root',
})
export class ProjectProcessService {
    constructor(private http: HttpClient) {}
    getProcessForm = AppConstants['PROJECT_API_URL'] + '/get-form-by-type';
    saveProcessForm = AppConstants['PROJECT_API_URL'] + '/checklist';
    updateProcessForm = AppConstants['PROJECT_API_URL'] + '/checklist-response';
    deleteProcessForm = AppConstants['PROJECT_API_URL'] + '/delete-checklist';
    submittedProcessForm =
        AppConstants['PROJECT_API_URL'] + '/checklist-response';
    find(obj:any) {
        return this.http.post(this.getProcessForm,obj);
    }
    submittedForm(obj: any) {
        return this.http.post(this.submittedProcessForm, obj);
    }
    create(obj: any) {
        return this.http.post(this.saveProcessForm, obj);
    }
    update(obj: any) {
        return this.http.put(this.updateProcessForm, obj);
    }
    delete(obj: any) {
        return this.http.post(this.deleteProcessForm, obj);
    }
}
