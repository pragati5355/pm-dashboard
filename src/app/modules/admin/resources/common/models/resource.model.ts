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
    integrations?: ResourceIntegrations[];
    certificates?: ResourceCertificates[];
}

export class ResourceTechnologyModel {
    id?: number;
    deleted?: boolean;
    technologyId?: string;
    name?: string;
    experienceYear?: number;
    experienceMonth?: number;
}

export class ResourceIntegrations {
    id?: number;
    name?: string;
    resourceId?: number;
    integrationsAndSkillsId?: number;
    IntegrationsAndSkillsId?: number;
    checked?: boolean;
}

export class ResourceCertificates {
    name? : string;
    link? : string;
}
