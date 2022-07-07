import { environment } from "../../../environments/environment";
const baseUrl = environment.baseUrl
const jiraBaseUrl = environment.jiraBaseUrl
// export class AppConstants {
//     private static AUTH_USER_API = baseUrl;
    
// }
export const AppConstants: ConstantsInterface = {
    BASE_URL: baseUrl,
    AUTH_USER_API: `${baseUrl}/signin`,
    UPDATE_ACCESS_TOKEN: `${baseUrl}/get-access-token`,
    CONNECT_PROJECT: `${jiraBaseUrl}/project`,
    JIRA_SYNC: `${jiraBaseUrl}/issue`,
    WORK_LOG: `${jiraBaseUrl}/work-log`,
  };
  export const ValidationConstants = {
    EMAIL_VALIDATION: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    NAME_VALIDATION: "^[a-zA-Z-',]+(s{0,1}[a-zA-Z-', ]){0,30}([a-zA-Z, ]){1,30}$",
  };
  export interface ConstantsInterface {
    [key: string]: string;
  }
  