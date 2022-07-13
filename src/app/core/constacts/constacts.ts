import { environment } from "../../../environments/environment";
const baseUrl = environment.baseUrl
const jiraBaseUrl = environment.jiraBaseUrl
const jircloudBaseUrl = environment.cloudBaseUrl
const projectBaseUrl = environment.projectBaseUrl
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
    GET_JIRA_USER: `${jiraBaseUrl}/jira-user`,
    GET_TEAM_MEMBER_LIST: `${jircloudBaseUrl}/get-team-member`,
    GET_PROJECTS: `${projectBaseUrl}/project`,
  };
  export const ValidationConstants = {
    EMAIL_VALIDATION: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    NAME_VALIDATION: "^[a-zA-Z-',]+(s{0,1}[a-zA-Z-', ]){0,30}([a-zA-Z, ]){1,30}$",
  };
  export const ErrorMessage = {
    ERROR_FIVE_HUNDRED: "Internal Server Error"
  };
  

  export interface ConstantsInterface {
    [key: string]: string;
  }
  