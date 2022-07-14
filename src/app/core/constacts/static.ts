export const StaticData = {
  ROLE_LIST: [
    {value: 'Android', viewValue: 'Android'},
    {value: 'Backend Dev', viewValue: 'Backend Dev'},
    {value: 'Data Science', viewValue: 'Data Science'},
    {value: 'Designer', viewValue: 'Designer'},
    {value: 'DevOps', viewValue: 'DevOps'},
    {value: 'Dot Net', viewValue: 'Dot Net'},
    {value: 'Frontend Dev', viewValue: 'Frontend Dev'},
    {value: 'Full Stack (Java + Angular)', viewValue: 'Full Stack (Java + Angular)'},
    {value: 'Full Stack (Java + React)', viewValue: 'Full Stack (Java + React)'},
    {value: 'Full Stack (Python + React)', viewValue: 'Full Stack (Python + React)'},
    {value: 'Full Stack (Python + Angular)', viewValue: 'Full Stack (Python + Angular)'},
    {value: 'iOS', viewValue: 'iOS'},
    {value: 'Java', viewValue: 'Java'},
    {value: 'MEAN', viewValue: 'MEAN'},
    {value: 'MERN', viewValue: 'MERN'},
    {value: 'PM', viewValue: 'PM'},
    {value: 'Python', viewValue: 'Python'},
    {value: 'React Native', viewValue: 'React Native'},
    {value: 'UI/UX', viewValue: 'UI/UX'},
    {value: 'QA', viewValue: 'QA'}
  ],

  RESOURCES_lIST: [
    {
      "id": 1,
      "firstName": "Naynesh",
      "lastName": "Rathod",
      "email": "naynesh.rathod@mindbowser.com",
      "team": "front end",
      "month": "9",
      "year": "1",
      "addedBy": 3,
      "technologyCtrl": ["Angular", "Node js", "Express", "Python"],
    },
    {
      "id": 3,
      "firstName": "Ravi",
      "lastName": "patel",
      "email": "Ravi@gmail.com",
      "team": "front end",
      "month": "1",
      "year": "5",
      "addedBy": 3,
      "technologyCtrl": ["python", "java"],
      "image": 'assets/images/avatars/female-02.jpg'
    },
    {
      "id": 3,
      "firstName": "Ravi",
      "lastName": "patel",
      "email": "Ravi@gmail.com",
      "team": "front end",
      "month": "1",
      "year": "5",
      "addedBy": 3,
      "technologyCtrl": ["python", "java"],
      "image": 'assets/images/avatars/female-02.jpg'
    },
    {
      "id": 4,
      "firstName": "suraj",
      "lastName": "jaiswal",
      "email": "suraj@gmail.com",
      "team": "Java developer",
      "month": "6",
      "year": "1",
      "addedBy": 3,
      "technologyCtrl": ["spring boot", "java", "microservices"],
      "image": 'assets/images/avatars/male-07.jpg'
    },
  ]
};


export interface StaticInterface {
  [key: string]: string;
}
