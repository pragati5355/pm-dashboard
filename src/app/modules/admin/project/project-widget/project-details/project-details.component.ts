import {Component, ElementRef, Input, OnInit, QueryList, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SnackBar} from '../../../../../core/utils/snackBar'
import {CreateProjecteService} from '@services/create-projecte.service';
import {AuthService} from '@services/auth/auth.service';
@Component({
    selector: 'app-project-details',
    templateUrl: './project-details.component.html',
    styleUrls: ['./project-details.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ProjectDetailsComponent implements OnInit {
    project_name = "This is a Project name";
    project_status = "On Track";
    project_progres = 0;
    members = true;
    sprints = true;
    routeSubscribe: any;
    projectId = 0
    initialLoading = false
    @Input() dataId: any;
    private _fuseCards!: QueryList<ElementRef>;

    constructor(private router: Router,private _authService: AuthService, private _route: ActivatedRoute, private ProjectService: CreateProjecteService, private snackBar: SnackBar) {
    }

    ngOnInit(): void {
        this.routeSubscribe = this._route.queryParams.subscribe(projectId => {
            if (projectId['id']) {
                this.projectId = projectId['id']
            }
        });
        let projectData= this._authService.getProjectDetails()
        this.project_name = projectData.name
        if(projectData !== 'NaN'){
            this.project_progres = projectData.progress
        }
    }

    editProject() {
        this.router.navigate(
            [`/projects/edit-project`],
            {queryParams: {id: this.projectId}}
        );
    }
    gotoProject(){
        this.router.navigate(
            [`/projects/project-list`]
        );
    }
    createRepository(){
        this.router.navigate(
            [`/projects/repository/add-repository`]
        );
    }
}
