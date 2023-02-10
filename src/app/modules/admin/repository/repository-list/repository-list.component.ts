import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
    selector: 'app-repository-list',
    templateUrl: './repository-list.component.html',
    styleUrls: ['./repository-list.component.scss'],
})
export class RepositoryListComponent implements OnInit {
    initialLoading = false;
    totalRecored = 1;
    repository: any = [];
    constructor(private router: Router) {}

    ngOnInit(): void {
        this.repository = [
            {
                bitbucketProjectName: 'demo',
                projectName: 'mindbowser',
                key: 'GINGER14',
                bitbucketUrl: 'GINGER14',
                createdAt: '2021-11-18',
                createdBy: 'sanskriti',
                jenkinsUrl: 'kj',
                status: 'success',
                console: 'console',
            },
            {
                bitbucketProjectName: 'demo',
                projectName: 'mindbowser',
                key: 'GINGER14',
                bitbucketUrl: 'GINGER14',
                createdAt: '2021-11-18',
                createdBy: 'sanskriti',
                jenkinsUrl: 'kj',
                status: 'success',
                console: 'console',
            },
        ];
    }
    createRepository() {
        this.router.navigate(['/projects/repository/repository-list']);
    }
}
