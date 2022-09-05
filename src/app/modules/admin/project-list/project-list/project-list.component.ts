import {Component, ElementRef, OnInit, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core';
import {AuthService} from '@services/auth/auth.service';
import {CreateProjecteService} from '@services/create-projecte.service';
import {Router} from '@angular/router';
import {FuseCardComponent} from '@fuse/components/card';
import {SessionService} from "@services/auth/session.service";
import {SnackBar} from '../../../../core/utils/snackBar'
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectListComponent implements OnInit {
  @ViewChildren(FuseCardComponent, {read: ElementRef})
  pageNo = 1;
  pagination = false;
  initialLoading = false;
  searchValue = "";
  projectList: any = []
  count = 1;
  totalPageData = 10
  totalProject = 0;
  cardList: boolean = true;
  submitInProcess: boolean = false;
  private _fuseCards!: QueryList<ElementRef>;

  constructor(private router: Router, private _authService: AuthService,
              private ProjectService: CreateProjecteService,
              private sessionService: SessionService,
              private snackBar: SnackBar) {
  }

  ngOnInit() {
    let payload = {
      perPageData: this.count,
      totalPerPageData: this.totalPageData,
      projectKey: "",
      projectName: this.searchValue
    }
    this.getList(payload);
  }

  gotoAddProject() {
    this.router.navigate(['/projects/add-project'])
  }

  getList(payload: any) {
    this.initialLoading = true;
    this.ProjectService.getProjectDetails(payload).subscribe(
      (res: any) => {
        this.initialLoading = false;
       if(res.data){
        this.projectList = res.data.projects;
        this.totalProject = res.data.totalRecored
       }else{
        this.totalProject = 0
       }
       if(res.error == true){
        this._authService.updateToken().subscribe(
          (res: any) => {
            this._authService.setToken(res.data.accessToken);
          })
          window.location.reload() 
        }
      }, error => {
        this.initialLoading = false;
      });
  }

  handleSearchInput(event: any) {
    this.count = 1;
    if (this.searchValue !== event.target.value.trim()) {
      this.searchValue = event.target.value.trim();
      this.pagination = false;
      let payload = {
        perPageData: this.count,
        totalPerPageData: this.totalPageData,
        projectName: this.searchValue
      };
      this.getList(payload);
    }
  }

  handleScroll() {
    let totalcount = this.count * this.totalPageData
    if (!this.pagination && this.projectList.length < this.totalProject) {
      this.count = this.count + this.totalPageData;
      let payload = {
        perPageData: this.count,
        totalPerPageData: this.totalPageData,
        projectName: this.searchValue
      };
      this.pagination = true;
      this.ProjectService.getProjectDetails(payload).subscribe(
        (res: any) => {
          this.pagination = false;
          if (res) {
            this.projectList = [...this.projectList, ...res.data.projects];
          }
        }, (err: any) => {
          this.pagination = false;
        });
    }
  }
  goToProject(id: number, name: any, progress: any) {
    this.router.navigate(
      [`/projects/project/project-details`],
      {queryParams: {id: id}}
    );
    let payload = {
      id : id,
      name: name,
      progress: progress
    }
    this._authService.setProjectDetails(payload)
  }
  snycproject(event:any,id: any){
    event.preventDefault();
    let payload ={
      id: id
    }
    this.submitInProcess = true;
    this.ProjectService.syncJira(payload).subscribe(
      (res:any)=>{
        this.submitInProcess = false;
        if(res.data.error){
          this.snackBar.errorSnackBar(res.data.Message);
        }
        if(res.data){
          this.snackBar.successSnackBar(res.data);
          let payload = {
            perPageData: this.count,
            totalPerPageData: this.totalPageData,
            projectKey: "",
            projectName: this.searchValue
          }
          this.getList(payload);
        }

      },
      error => {
        this.submitInProcess = false;

        this.snackBar.errorSnackBar("server error")
      }
    )
  }
}
