import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';
import { CreateProjecteService } from '@services/create-projecte.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, ChangeDetectionStrategy, ElementRef, QueryList, Renderer2, ViewChildren, ViewEncapsulation } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { FuseCardComponent } from '@fuse/components/card';
import { StaticData } from "../../../../core/constacts/static";
import { SessionService } from "@services/auth/session.service";
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  encapsulation  : ViewEncapsulation.None,
})
export class ProjectListComponent implements OnInit {
  @ViewChildren(FuseCardComponent, { read: ElementRef })
  pageNo = 1;
  pagination = false;
  initialLoading = false;
  searchValue = "";
  projectList: any=[]
  count = 1;
  totalPageData = 2
  totalProject = 0;
  private _fuseCards!: QueryList<ElementRef>;
  constructor( private router: Router, private _authService: AuthService,
    private ProjectService:CreateProjecteService,
    private sessionService: SessionService,) { }
  cardList: boolean = true;
  ngOnInit() {
    console.log(this.count)
    let payload = {
      perPageData: this.count,
      totalPerPageData:this.totalPageData,
      projectKey:"",
      projectName:this.searchValue
    }
    this.getList(payload);
  }
   gotoAddProject(){
    this.router.navigate(['/projects/add-project']) 
   }
   getList(payload: any) {
    this.initialLoading = true;
    this.ProjectService.getProjectDetails(payload).subscribe(
       (res: any) => {
         this.initialLoading = false;
         console.log(res);
         this.projectList = res.data.projects;
         this.totalProject  = res.data.totalRecored
       },
       error => {
         this.initialLoading = false;
       }
     );
  }
   handleSearchInput(value: any) {
    if (this.searchValue !== value.trim()) {
      this.searchValue = value.trim();
      let payload = {
   
      };
      this.getList(payload);
    }
  }  
   handleScroll() {
     console.log('scrolled');
     let totalcount = this.count * this.totalPageData
     console.log("projectlength",this.projectList.length)
    if (!this.pagination && this.projectList.length < this.totalProject) {
      this.count = this.count + this.totalPageData; 
      console.log(this.count)
     let payload = {
        perPageData: this.count,
        totalPerPageData:this.totalPageData,
        projectKey:"",
        projectName:this.searchValue
      };
      this.pagination = true;
      this.ProjectService.getProjectDetails( payload)
        .subscribe(
          (res: any) => {
            this.pagination = false;
            if (res) {
              this.projectList = [...this.projectList, ...res.data.projects];
            }
          },
          (err: any) => {
            this.pagination = false;
          }
        );
    }
  }

}