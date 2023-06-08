import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from 'app/core/constacts/constacts';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  getSprintByIdUrl = AppConstants['PROJECT_API_URL'] + '/';

  constructor(private http: HttpClient) { }

  getSprintById(payload: any) {
    return this.http.post(this.getSprintByIdUrl, payload);
}
}
