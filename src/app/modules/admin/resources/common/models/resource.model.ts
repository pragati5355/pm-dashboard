export class ResourceModel {
    id?: number;
    deleted?: boolean;
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: string;
    salary?: string;
    pmMentorEmail?: string;
    dateOfJoining?: string;
    technologies?: ResourceTechnologyModel[];
    month?: number;
    year?: number;
}

export class ResourceTechnologyModel {
    id?: number;
    deleted?: boolean;
    technologyId?: string;
    name?: string;
    experienceYear?: number;
    experienceMonth?: number;
}
