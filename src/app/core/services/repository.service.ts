import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from "angular-web-storage";
import { AppConstants } from '../constacts/constacts';
@Injectable({
  providedIn: 'root'
})
export class RepositoryService {


  constructor(private http: HttpClient, private storage: LocalStorageService) {
  }

  getBitbucketMember(){
    return this.http.get(AppConstants['GET_BITBUCKET_MEMBER']);
  }
  getBitbucketProjectName(obj: any){
    return this.http.post(AppConstants['GET_BITBUCKET_PROJECT_NAME'], obj);
  }
}
