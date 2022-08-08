import {Component, ElementRef, Input, OnInit, QueryList, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SnackBar} from '../../../../../core/utils/snackBar'
import {CreateProjecteService} from '@services/create-projecte.service';

@Component({
    selector: 'app-project-details',
    templateUrl: './project-details.component.html',
    styleUrls: ['./project-details.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ProjectDetailsComponent implements OnInit {
    project_name = "This is a Project name";
    project_status = "On Track";
    project_progres = 45;
    members = true;
    sprints = true;
    routeSubscribe: any;
    projectId = 0
    initialLoading = false
    @Input() dataId: any;
    private _fuseCards!: QueryList<ElementRef>;

    constructor(private router: Router, private _route: ActivatedRoute, private ProjectService: CreateProjecteService, private snackBar: SnackBar) {
    }

    ngOnInit(): void {
        console.log('app-project-details')
        this.routeSubscribe = this._route.queryParams.subscribe(projectId => {
            if (projectId['id']) {
                this.projectId = projectId['id']
            }
        });
        this.getProjectDetails()
    }

    editProject() {
        this.router.navigate(
            [`/projects/edit-project`],
            {queryParams: {id: this.projectId}}
        );
    }

    getProjectDetails() {
        let payload = {
            id: this.projectId
        }
        this.initialLoading = true;
        this.ProjectService.getOneProjectDetails(payload).subscribe(
            (res: any) => {
                this.initialLoading = false;
                console.log(res)
                this.project_name = res.data.project.name

            }, (error: any) => {
                this.initialLoading = false;
            });

    }
}
