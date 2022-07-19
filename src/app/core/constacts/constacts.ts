import { environment } from "../../../environments/environment";

const baseUrl = environment.baseUrl
const jiraBaseUrl = environment.jiraBaseUrl
const projectBaseUrl = environment.projectBaseUrl
// export class AppConstants {
//     private static AUTH_USER_API = baseUrl;

// }
export const AppConstants: ConstantsInterface = {
  BASE_URL: baseUrl,
  AUTH_USER_API: `${baseUrl}/signin`,
  UPDATE_ACCESS_TOKEN: `${baseUrl}/get-access-token`,
  CONNECT_PROJECT: `${jiraBaseUrl}/jira-project`,
  JIRA_SYNC: `${jiraBaseUrl}/connect-jira`,
  WORK_LOG: `${jiraBaseUrl}/work-log`,
  GET_JIRA_USER: `${jiraBaseUrl}/jira-user`,
  GET_TEAM_MEMBER_LIST: `${projectBaseUrl}/get-team-member`,
  GET_RESOURCE_LIST: `${projectBaseUrl}/get-team-member`,
  ADD_RESOURCE_LIST: `${projectBaseUrl}/team-member`,
  GET_PROJECTS: `${projectBaseUrl}/project`,
  GET_TECHNOLOGY: `${projectBaseUrl}/technology`,
};
export const ValidationConstants = {
  EMAIL_VALIDATION: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  NAME_VALIDATION: "^[a-zA-Z-',]+(s{0,1}[a-zA-Z-', ]){0,30}([a-zA-Z, ]){1,30}$",
  YEAR_VALIDATION: "^[0-9]{1,2}$",
};
export const ErrorMessage = {
  ERROR_FIVE_HUNDRED: "Internal Server Error"
};


export interface ConstantsInterface {
  [key: string]: string;
}
