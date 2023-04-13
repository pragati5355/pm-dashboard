export const StaticData = {
    ROLE_LIST: [
        { value: 'Android', viewValue: 'Android' },
        { value: 'Backend Dev', viewValue: 'Backend Dev' },
        { value: 'Data Science', viewValue: 'Data Science' },
        { value: 'Designer', viewValue: 'Designer' },
        { value: 'DevOps', viewValue: 'DevOps' },
        { value: 'Dot Net', viewValue: 'Dot Net' },
        { value: 'Frontend Dev', viewValue: 'Frontend Dev' },
        {
            value: 'Full Stack (Java + Angular)',
            viewValue: 'Full Stack (Java + Angular)',
        },
        {
            value: 'Full Stack (Java + React)',
            viewValue: 'Full Stack (Java + React)',
        },
        {
            value: 'Full Stack (Python + React)',
            viewValue: 'Full Stack (Python + React)',
        },
        {
            value: 'Full Stack (Python + Angular)',
            viewValue: 'Full Stack (Python + Angular)',
        },
        { value: 'iOS', viewValue: 'iOS' },
        { value: 'Java', viewValue: 'Java' },
        { value: 'MEAN', viewValue: 'MEAN' },
        { value: 'MERN', viewValue: 'MERN' },
        { value: 'PM', viewValue: 'PM' },
        { value: 'Python', viewValue: 'Python' },
        { value: 'React Native', viewValue: 'React Native' },
        { value: 'UI/UX', viewValue: 'UI/UX' },
        { value: 'QA', viewValue: 'QA' },
    ],
    TEAM_MEMBER_ROLE: [
        { value: 'Frontend Dev', viewValue: 'Frontend Dev' },
        { value: 'Backend Dev', viewValue: 'Backend Dev' },
        { value: 'DevOps', viewValue: 'DevOps' },
        { value: 'Designer', viewValue: 'Designer' },
    ],
    FORM_NAME: [
        { value: 'Metics form', viewValue: 'Metics form' },
        { value: 'Demo form', viewValue: 'Demo form' },
        { value: 'Test form', viewValue: 'Test form' },
    ],
    TEAM_MEMBER_LIST: [
        {
            image: 'assets/images/avatars/male-01.jpg',
            name: 'Naynesh Rathod',
            start_date: 'Jan 21,2021',
            email: 'nayneshrathod@gmail.com',
            role: 'Developer',
        },
        {
            image: 'assets/images/avatars/male-02.jpg',
            name: 'Khumesh Lohar',
            start_date: 'Feb 22,2021',
            email: 'khumeshlohar@gmail.com',
            role: 'WEB Designer',
        },
        {
            image: 'assets/images/avatars/male-03.jpg',
            name: 'John Wicks',
            start_date: 'May 25,2021',
            email: 'johnwicks@gmail.com',
            role: 'Tester',
        },
    ],
    PER_PAGE_DATA: 10,
    FORM_TYPE: [
        { value: 'CHECKLIST', viewValue: 'Check List' },
        { value: 'PROJECT_FEEDBACK', viewValue: 'Project Feedback' },
    ],
};

export interface StaticInterface {
    [key: string]: string;
}
