import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from "angular-web-storage";
import { API_LIST, AppConstants } from '../constacts/constacts';
@Injectable({
  providedIn: 'root'
})
export class AddFormService {

  constructor(private http: HttpClient, private storage: LocalStorageService) {
  }
  addForm(obj: any) {
    return this.http.post(AppConstants['ADD_FORM'], obj);
  }
  updateForm(obj: any) {
    return this.http.post(AppConstants['UPDATE_FORM'], obj);
  }
  getFormList(obj: any) {
    return this.http.post(AppConstants['GET_FORM_LIST_PAGINATION'], obj);
  }
  deleteForm(obj: any) {
    return this.http.post(AppConstants['DELETE_FORM'], obj);
  }
  getFormDetails(obj: any) {
    return this.http.post(AppConstants['GET_FORM_DETAILS'], obj);
  }
  copyForm(obj: any) {
    return this.http.post(AppConstants['COPY_FORM'], obj);
  }
  getFormListWithoutPagination() {
    return this.http.get(AppConstants['GET_FORM_LIST']);
  }
  feedbackFrom(obj: any) {
    return this.http.post(AppConstants['FEEDBACK_FORM'], obj);
  }
  getFeedbackForm(obj: any) {
    return this.http.post(AppConstants['GET_FEEDBACK_FORM'], obj);
  }
  saveFeedbackForm(obj: any) {
    return this.http.post(AppConstants['SAVE_FEEDBACK_FORM'], obj);
  }
  getFeedbackFormBySprint(obj: any) {
    return this.http.post(AppConstants['GET_FEEDBACK_FORM_BY_SPRINT'], obj);
  }
  getFeedbackFormEamilList(obj: any) {
    return this.http.post(AppConstants['GET_FEEDBACK_FORM_EMAIL_LIST'], obj);
  }
  getFeedbackFormByEmail(obj: any) {
    return this.http.post(AppConstants['GET_FEEDBACK_FORM_BY_EMAIL'], obj);
  }

  sendProjectFeedbackForm(obj : any){
    return this.http.post(API_LIST.PROJECT_SPRING_BOOT_URL + '/external/send-feedback-form', obj);
  }

  getProjectFeedbackFormList(obj : any){
    return this.http.post(API_LIST.SPRING_BOOT_URL + '' , obj);
  }
}
