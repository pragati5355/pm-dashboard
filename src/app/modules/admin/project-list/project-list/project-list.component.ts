import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';
import { CreateProjecteService } from '@services/create-projecte.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, ChangeDetectionStrategy, ElementRef, QueryList, Renderer2, ViewChildren, ViewEncapsulation } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { FuseCardComponent } from '@fuse/components/card';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {
  @ViewChildren(FuseCardComponent, { read: ElementRef })
  initialLoading = false;
  private _fuseCards!: QueryList<ElementRef>;
  constructor( private router: Router, private _authService: AuthService,
    private ProjectService:CreateProjecteService) { }
  cardList: boolean = true;
  ngOnInit(
    
  ): void {
    this.getProject()
  }
   gotoAddProject(){
    this.router.navigate(['/projects/add-project']) 
   }
   getProject(){
    this.initialLoading = true;
    this.ProjectService.getProjectDetails().subscribe(
      (res:any)=>{
        this.initialLoading = false;
        console.log(res);

      }, 
      error => {
        this.initialLoading = false;
        // this.snackBarConfig.panelClass = ["red-snackbar"];
        // this._snackBar.open(
        //   "Server error",
        //   "x",
        //   this.snackBarConfig
        // );
      }
    )
   }


}
