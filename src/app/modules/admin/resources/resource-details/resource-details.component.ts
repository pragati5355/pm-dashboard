import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { AbstractControl,FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateProjecteService } from '@services/create-projecte.service';
import { AuthService } from '@services/auth/auth.service';
import {SnackBar} from '../../../../core/utils/snackBar';
import { ActivatedRoute, Router,NavigationStart, Event as NavigationEvent  } from '@angular/router';
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ResourcesListComponent } from '../resources-list/resources-list.component';
import { round } from 'lodash';
@Component({
  selector: 'app-resource-details',
  templateUrl: './resource-details.component.html',
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourceDetailsComponent implements OnInit {
  initialLoading=false
  resourceDetails: any = {}
  score:any =0
  outOfScore: any =10
  constructor(private _formBuilder: FormBuilder, private router: Router,
    private ProjectService:CreateProjecteService,
    private _authService: AuthService,
    private _route: ActivatedRoute,
    private snackBar: SnackBar,
    private activatedRoute: ActivatedRoute,
    private _resourcesListComponent: ResourcesListComponent,) { }

  ngOnInit(): void {
    this._resourcesListComponent.matDrawer.open();
    let path = this.activatedRoute.snapshot.url[0].path
    this.getResourceHappinessScore(path)
          this.fetchEditdata(path)
  }


  fetchEditdata(id: any){
    let payload={id: id}
    this.initialLoading = true;
    this.ProjectService.getresource(payload).subscribe(
      (res: any) => {
        this.initialLoading = false;
        this.resourceDetails= res.data
       
      if(res.tokenExpire == true){
        this._authService.updateAndReload(window.location);
        }
      },
      error => {
        this.initialLoading = false;
      }
    );
  }
  
  getResourceHappinessScore(id:any){
    let payload={resourceId: id}
    this.initialLoading = true;
    this.ProjectService.getResourceHappinessScore(payload).subscribe(
      (res: any) => {
       this.initialLoading = false; 
        console.log(res)
       if(res.data !==null){
        this.score = round(res.data.happinessScore)
        this.outOfScore = res.data.outOf
       }
      if(res.tokenExpire == true){
        this._authService.updateAndReload(window.location);
        }
      },
      error => {
        this.initialLoading = false;
      }
    );
  }
       /**
     * Close the drawer
     */
        closeDrawer(): Promise<MatDrawerToggleResult>
        {
            return this._resourcesListComponent.matDrawer.close();
        }

}