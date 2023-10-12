export class ProjectStatModel {
    stats: StatModel[];
    projectDetails: ProjectDetailsModel;
}

export class ProjectDetailsModel {
    endDate : string;
    name : string;
    startDate:string;
}

export class StatModel {
    email: string;
    role : string;
    utilization : string;
    totalIdealWorklogHrs: number;
    totalActualWorklogHrs: number;
    hourlyCost: number;
    costAsPerProjectPlan: number;
    actualCostOnProject: number;
    costDiff: number;
    firstName: string;
    lastName: string;
    projectCostType: string;
    projectName: string;
    projectEndDate: string;
    projectStartDate: string;
    worklogHrsAsPerProjectPlan : number;
}
