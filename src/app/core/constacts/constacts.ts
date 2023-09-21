import { environment } from '../../../environments/environment';

const baseUrl = environment.baseUrl;
const jiraBaseUrl = environment.jiraBaseUrl;
const projectBaseUrl = environment.projectBaseUrl;
const springBootUrl = environment.springBootUrl;
const bitbucketSource = environment.bitbucketSource;
export const AppConstants = {
    BASE_URL: baseUrl,
    CSV_TEMPLATE_URL: environment.csvTemplateUrl,
    bitbucketSource: bitbucketSource,
    PROJECT_API_URL: projectBaseUrl,
    REPO_API_URL: springBootUrl,
    S3_BUCKET_NAME: environment.bucketName,
    AUTH_USER_API: `${springBootUrl}/user/sign-in`,
    UPDATE_ACCESS_TOKEN: `${baseUrl}/get-access-token`,
    CONNECT_PROJECT: `${jiraBaseUrl}/jira-project`,
    CREATE_PROJECT: `${jiraBaseUrl}/connect-jira`,
    GET_JIRA_USER: `${jiraBaseUrl}/jira-user`,
    SYNC_JIRA: `${springBootUrl}/sync-project`,
    GET_TEAM_MEMBER_LIST: `${projectBaseUrl}/get-team-member`,
    GET_RESOURCE_LIST: `${projectBaseUrl}/get-team-member`,
    ADD_RESOURCE_LIST: `${projectBaseUrl}/team-member`,
    GET_PROJECTS: `${projectBaseUrl}/project`,
    GET_EXTERNAL_PROJECTS: `${projectBaseUrl}/get-external-project`,
    ADD_EXTERNAL_PROJECTS: `${projectBaseUrl}/external-project`,
    GET_PROJECTS_LIST_WITHOUTPAGINATION: `${projectBaseUrl}/get-project`,
    GET_PROJECT_DETAILS: `${projectBaseUrl}/get-project-by-id  `,
    GET_TECHNOLOGY: `${projectBaseUrl}/technology`,
    GET_RESOURCE: `${projectBaseUrl}/get-resource-by-id`,
    GET_RESOURCE_HAPPINESS_SCORE: `${projectBaseUrl}/resource-score`,
    SPRINT_PROGRESS: `${projectBaseUrl}/sprint-progress`,
    UPDATE_DELETE_RESOURCE: `${projectBaseUrl}/update-delete`,
    GET_SPRINT_LIST: `${projectBaseUrl}/sprint`,
    GET_SPRINT_BY_ID: `${projectBaseUrl}/sprint-by-id`,
    UPDATE_SPRINT_STATUS: `${projectBaseUrl}/sprint-completion`,
    GET_PROJECT_TEAM_LIST: `${projectBaseUrl}/project-team`,
    GET_SPRINT_ISSUES: `${projectBaseUrl}/get-sprint-issue`,
    GET_SPRINT_ISSUES_TYPE_COUNT: `${projectBaseUrl}/issue-type-count`,
    UPDATE_PROJECT: `${projectBaseUrl}/update-project`,
    BURNDOWN_CHART: `${jiraBaseUrl}/burndown-chart`,
    ADD_FORM: `${projectBaseUrl}/add-form`,
    GET_FORM_LIST_PAGINATION: `${projectBaseUrl}/formname`,
    UPDATE_FORM: `${projectBaseUrl}/update-form`,
    DELETE_FORM: `${projectBaseUrl}/delete-form`,
    GET_FORM_DETAILS: `${projectBaseUrl}/formdata`,
    COPY_FORM: `${projectBaseUrl}/copy-form`,
    GET_FORM_LIST: `${projectBaseUrl}/get-formname`,
    FEEDBACK_FORM: `${projectBaseUrl}/send-email`,
    GET_FEEDBACK_FORM: `${projectBaseUrl}/form-by-project`,
    SAVE_FEEDBACK_FORM: `${projectBaseUrl}/form`,
    GET_FEEDBACK_FORM_BY_SPRINT: `${projectBaseUrl}/feedback-form-by-sprint`,
    GET_FEEDBACK_FORM_EMAIL_LIST: `${projectBaseUrl}/get-response-emails`,
    GET_FEEDBACK_FORM_BY_EMAIL: `${projectBaseUrl}/get-response-by-email`,
    GET_HAPPINESS_SCORE_BY_SPRINT: `${projectBaseUrl}/happiness-score-by-sprint`,
    GET_HAPPINESS_SCORE_BY_PROJECT: `${projectBaseUrl}/happiness-score-by-project`,
    GET_BITBUCKET_MEMBER: `${projectBaseUrl}/bitbucket-members`,
    GET_BITBUCKET_PROJECT_NAME: `${projectBaseUrl}/search-project`,
    GET_STATISTICS_COUNT: `${projectBaseUrl}/dashboard-stats`,
    CREATE_PLATFORM_USER: `${projectBaseUrl}/`,
    GET_PLATFORM_USERs: `${projectBaseUrl}/`,
};
export const ValidationConstants = {
    EMAIL_VALIDATION:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    NAME_VALIDATION:
        "^[a-zA-Z-',]+(s{0,1}[a-zA-Z-', ]){0,30}([a-zA-Z, ]){1,30}$",
    YEAR_VALIDATION: '^[0-9]{1,2}$',
    SALARY_VALIDATION: '^[0-9]{1,10}$',
    WHITESPACE_VALIDATION: '^[a-zA-Z0-9-]*$$',
};
export const ErrorMessage = {
    ERROR_FIVE_HUNDRED: 'Internal Server Error',
    ERROR_SOMETHING_WENT_WRONG: 'Something went wrong',
};

export const ROLE_LIST = [
    'FRONTEND',
    'BACKEND',
    'FULLSTACK',
    'PM',
    'DEVOPS',
    'QA',
    'UI/UX',
    'DATA SCIENCE',
];

export const API_LIST = {
    LOGGED_IN_USER: springBootUrl + '/user',
    GET_WORK_LOG_LIST: springBootUrl + '/worklog/list',
    GET_SHARE_WORKLOG: springBootUrl + '/worklog/setting/',
    SAVE_SHARE_WORKLOG: springBootUrl + '/worklog/setting',
    GET_RESOURCE_PUBLIC: springBootUrl + '/project/resource/',
    GET_RESOURCE_WORKLOG_PUBLIC: springBootUrl + '/worklog/list-by-key',
    DOWNLOAD_WORKLOG_SHEET : springBootUrl + '/worklog/download-sheet',
    GET_PNL_STAT_LIST : springBootUrl + '/project/get-project-stats',
};

export const UTILIZATION_VALUES = [0.25, 0.5, 1];
