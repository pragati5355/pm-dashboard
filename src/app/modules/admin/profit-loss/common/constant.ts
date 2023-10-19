export class ProjectStatModel {
    resourceCost: StatModel[];
    projectDetails: ProjectDetailsModel;
    projectCost : ProjectCostModel;
}

export class ProjectDetailsModel {
    endDate : string;
    name : string;
    startDate:string;
}

export class ProjectCostModel {
    actualHoursOnProject : number;
    actualProjectCost : number;
    billedCostToClient : number;
    costVarience : number;
    flatRateForProject : number;   
}

export class StatModel {
    email: string;
    role : string;
    utilization : string;
    idealWorklogHrs: number;
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
