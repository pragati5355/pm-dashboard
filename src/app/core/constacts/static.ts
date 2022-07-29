export const StaticData = {
  ROLE_LIST: [
    { value: 'Android', viewValue: 'Android' },
    { value: 'Backend Dev', viewValue: 'Backend Dev' },
    { value: 'Data Science', viewValue: 'Data Science' },
    { value: 'Designer', viewValue: 'Designer' },
    { value: 'DevOps', viewValue: 'DevOps' },
    { value: 'Dot Net', viewValue: 'Dot Net' },
    { value: 'Frontend Dev', viewValue: 'Frontend Dev' },
    { value: 'Full Stack (Java + Angular)', viewValue: 'Full Stack (Java + Angular)' },
    { value: 'Full Stack (Java + React)', viewValue: 'Full Stack (Java + React)' },
    { value: 'Full Stack (Python + React)', viewValue: 'Full Stack (Python + React)' },
    { value: 'Full Stack (Python + Angular)', viewValue: 'Full Stack (Python + Angular)' },
    { value: 'iOS', viewValue: 'iOS' },
    { value: 'Java', viewValue: 'Java' },
    { value: 'MEAN', viewValue: 'MEAN' },
    { value: 'MERN', viewValue: 'MERN' },
    { value: 'PM', viewValue: 'PM' },
    { value: 'Python', viewValue: 'Python' },
    { value: 'React Native', viewValue: 'React Native' },
    { value: 'UI/UX', viewValue: 'UI/UX' },
    { value: 'QA', viewValue: 'QA' }
  ],
  TEAM_MEMBER_ROLE: [
    {value: 'Frontend Dev', viewValue: 'Frontend Dev'},
    {value: 'Backend Dev', viewValue: 'Backend Dev'},
    {value: 'DevOps', viewValue: 'DevOps'},
    {value: 'Designer', viewValue: 'Designer'}
  ],

  TEAM_MEMBER_LIST: [
    {image: 'assets/images/avatars/male-01.jpg', name: 'Naynesh Rathod', start_date: 'Jan 21,2021', email: 'nayneshrathod@gmail.com', role: 'Developer'},
    {image: 'assets/images/avatars/male-02.jpg', name: 'Khumesh Lohar', start_date: 'Feb 22,2021', email: 'khumeshlohar@gmail.com', role: 'WEB Designer'},
    {image: 'assets/images/avatars/male-03.jpg', name: 'John Wicks', start_date: 'May 25,2021', email: 'johnwicks@gmail.com', role: 'Tester'},
  ],
  PER_PAGE_DATA: 10,
  PROJECT_DETAILS: {
    "message": "Success",
    "data": {
        "clientModelsTotalRecored": 2,
        "clientModels": [
            {
                "id": 523,
                "createdAt": 1658898118420,
                "lastModifiedAt": 1658898118420,
                "isDeleted": false,
                "firstName": "AbcClient",
                "lastName": "AbcClient",
                "userId": 4,
                "proectId": 52
            },
            {
                "id": 524,
                "createdAt": 1658898118426,
                "lastModifiedAt": 1658898118426,
                "isDeleted": false,
                "firstName": "adf",
                "lastName": "asdf",
                "userId": 4,
                "proectId": 52
            }
        ],
        "project": {
            "id": 52,
            "createdAt": 1658898118189,
            "lastModifiedAt": 1658898118189,
            "isDeleted": false,
            "projectId": "10000",
            "key": "MT",
            "description": "Metrcs",
            "name": "Metrics",
            "isPrivate": false,
            "entityId": null,
            "uuid": null,
            "orgId": null,
            "userId": 4,
            "private": false
        },
        "teamModelTotalRecored": 3,
        "teamModel": [
            {
                "id": 258,
                "createdAt": 1658898118398,
                "lastModifiedAt": 1658898118398,
                "isDeleted": false,
                "name": null,
                "role": "Frontend Dev",
                "jiraUser": "Microsoft Teams for Jira Cloud",
                "isManager": false,
                "userId": 4,
                "projectId": 52,
                "email": null,
                "teamMemberId": 91
            },
            {
                "id": 259,
                "createdAt": 1658898118404,
                "lastModifiedAt": 1658898118404,
                "isDeleted": false,
                "name": null,
                "role": "Backend Dev",
                "jiraUser": "Slack",
                "isManager": false,
                "userId": 4,
                "projectId": 52,
                "email": null,
                "teamMemberId": 84
            },
            {
                "id": 260,
                "createdAt": 1658898118410,
                "lastModifiedAt": 1658898118410,
                "isDeleted": false,
                "name": null,
                "role": "MANAGER",
                "jiraUser": "Atlassian Assist",
                "isManager": true,
                "userId": 4,
                "projectId": 52,
                "email": null,
                "teamMemberId": 62
            }
        ],
        "authUser": {
            "id": 1,
            "createdAt": null,
            "lastModifiedAt": 1658898051264,
            "isDeleted": false,
            "email": "suraj.jaiswal@mindbowser.com",
            "apiKey": "qXAmmUTZEG7TBee6JoebB512",
            "baseUrl": "https://mindbowser-pm.atlassian.net",
            "userId": 4
        }
    },
    "error": false
}
};

export interface StaticInterface {
  [key: string]: string;
}
