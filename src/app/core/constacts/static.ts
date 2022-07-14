
  export const StaticData = {
    ROLE_LIST: [
        {value: 'Frontend Dev', viewValue: 'Frontend Dev'},
        {value: 'Backend Dev', viewValue: 'Backend Dev'},
        {value: 'DevOps', viewValue: 'DevOps'},
        {value: 'Designer', viewValue: 'Designer'}
      ],

      RESOURCES_lIST:[
        {
          name: "Sanskriti Gupta",
          email: "sanskriti.gupta@mindbowser.com",
          team: "develop",
          experience: "1 Year",
          technology: "angular",
          image: 'assets/images/avatars/female-02.jpg'
        },
        {
          name: "Suraj",
          email: "suraj@mindbowser.com",
          team: "develop",
          experience: "2 Year",
          technology: "java",
          image: 'assets/images/avatars/male-07.jpg'
        },
        {
          name: "sans",
          email: "sans@mindbowser.com",
          team: "develop",
          experience: "1 Year",
          technology: "java",
          image: 'assets/images/avatars/female-04.jpg'
        }
      ]
  };
  

  export interface StaticInterface {
    [key: string]: string;
  }
  