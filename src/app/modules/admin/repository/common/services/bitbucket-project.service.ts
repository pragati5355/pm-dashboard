import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BitbucketProjectModel } from '../models/bitbucket-project.model';

@Injectable({
    providedIn: 'root',
})
export class BitbucketProjectService {
    constructor() {}

    findAll(): Observable<BitbucketProjectModel[]> {
        return of([
            {
                id: 1,
                uuid: '{c154166c-69a3-4384-9696-ed1de7b548b2}',
                projectName: 'ginger10',
                bitbucketProjectName: 'ginger10',
                key: 'GINGER10',
                createdAt: '2021-11-18T10:42:44.376',
                createdBy: 'Pranita',
                bitbucketUrl: 'GINGER10',
                jenkinsUrl: null,
                status: 'success',
            },
            {
                id: 2,
                uuid: '{261831a9-e754-4f42-b5a7-52e1595407e9}',
                projectName: 'taj',
                bitbucketProjectName: 'taj',
                key: 'TAJ',
                createdAt: '2021-11-18T10:44:57.509',
                createdBy: 'Pranita',
                bitbucketUrl: 'TAJ',
                jenkinsUrl: null,
                status: 'success',
            },
            {
                id: 3,
                uuid: '{b56f57d9-721e-442c-96dd-220a6d54f38d}',
                projectName: 'taj1',
                bitbucketProjectName: 'taj1',
                key: 'TAJ1',
                createdAt: '2021-11-18T10:48:52.709',
                createdBy: 'Pranita',
                bitbucketUrl: 'TAJ1',
                jenkinsUrl: null,
                status: 'success',
            },
            {
                id: 4,
                uuid: '{b1e598a2-d90f-420c-bd74-263acc483039}',
                projectName: 'taj10',
                bitbucketProjectName: 'taj10',
                key: 'TAJ10',
                createdAt: '2021-11-18T11:00:40.938',
                createdBy: 'Pranita',
                bitbucketUrl: 'TAJ10',
                jenkinsUrl: null,
                status: 'success',
            },
            {
                id: 5,
                uuid: '{05bd2fc4-70d8-485a-acab-98ce768f396b}',
                projectName: 'taj12',
                bitbucketProjectName: 'taj12',
                key: 'TAJ12',
                createdAt: '2021-11-18T06:00:01.716',
                createdBy: 'Pranita',
                bitbucketUrl: 'TAJ12',
                jenkinsUrl: null,
                status: 'success',
            },
            {
                id: 6,
                uuid: '{4d04d960-4708-4814-ae2c-e99827fddf23}',
                projectName: 'js',
                bitbucketProjectName: 'js',
                key: 'JS',
                createdAt: '2021-11-18T12:11:54.772',
                createdBy: 'Pranita',
                bitbucketUrl: 'JS',
                jenkinsUrl: null,
                status: 'success',
            },
            {
                id: 7,
                uuid: '{5837d2d2-3276-45cd-b458-5f17170e541c}',
                projectName: 'indbowser',
                bitbucketProjectName: 'ginger13',
                key: 'GINGER13',
                createdAt: '2021-11-18T08:18:12.92',
                createdBy: 'Pranita',
                bitbucketUrl: 'GINGER13',
                jenkinsUrl: null,
                status: 'success',
            },
            {
                id: 14,
                uuid: '{2442423b-7eb6-4840-a43b-2ae1df0026d5}',
                projectName: 'bitbucketProject app',
                bitbucketProjectName: 'Test28',
                key: 'TEST28',
                createdAt: '2022-12-28T07:34:35.057',
                createdBy: 'Pranita',
                bitbucketUrl: 'TEST28',
                jenkinsUrl: null,
                status: 'success',
            },
            {
                id: 15,
                uuid: '{22478f83-d3a6-4c3d-95cf-cb5683d5bb57}',
                projectName: 'fgfgd',
                bitbucketProjectName: 'fgf',
                key: 'FGF',
                createdAt: '2023-01-05T09:49:09.289',
                createdBy: 'Pranita',
                bitbucketUrl: 'FGF',
                jenkinsUrl: null,
                status: 'success',
            },
        ]);
    }

 
}
