export class TeamMember {
    constructor(
        public firstname: string,
        public lastname: string,
        public id: string,
        public email: string,
        public team: string
    ) {}
}
export class ManagerList {
    constructor(
        public firstname: string,
        public lastname: string,
        public id: string,
        public email: string,
        public team: string
    ) {}
}
export class JiraUser {
    constructor(
        public displayName: string,
        public accountType: string,
        public active: boolean,
        public avatarUrl: any,
        public accountId: string,
        public orgId: any
    ) {}
}
export class JiraTeamUser {
    constructor(
        public displayName: string,
        public accountType: string,
        public active: boolean,
        public avatarUrl: any,
        public accountId: string,
        public orgId: any
    ) {}
}