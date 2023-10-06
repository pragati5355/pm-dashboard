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
    totalIdealWorklogHrs: number;
    totalActualWorklogHrs: number;
    hourlyCost: number;
    idealResourceCost: number;
    idealProjectCost: number;
    costOnProject: number;
    actualCost: number;
    diff: number;
    firstName: string;
    lastName: string;
    projectCostType: string;
    projectName: string;
    projectEndDate: string;
    projectStartDate: string;
}
