import { Component, OnDestroy, OnInit, ViewChild,ElementRef, ViewEncapsulation, HostListener } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDeactivateComponent } from "@services/deactivate-service/decativate.guard";
import { ValidationConstants } from "../../../../core/constacts/constacts";
import { StaticData } from "../../../../core/constacts/static";
import { C, COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import {MonthValdation} from "../../../../core/utils/Validations";
import { map, startWith } from 'rxjs/operators';
import { CreateProjecteService } from '@services/create-projecte.service';
import { AuthService } from '@services/auth/auth.service';
import {SnackBar} from '../../../../core/utils/snackBar';
import { ErrorMessage } from 'app/core/constacts/constacts'
export class Technology {
  constructor( public id: number, public name: string) { }
}
export class Project {
  constructor( public id: number, public name: string) { }
}
@Component({
  selector: 'app-add-resources',
  templateUrl: './add-resources.component.html'
})
export class AddResourcesComponent implements OnInit, OnDestroy,IDeactivateComponent {
  @HostListener("window:beforeunload", ["$event"])
  public onPageUnload($event: BeforeUnloadEvent) {
    if (!this.canExit()) {
      $event.returnValue = true;
    }
  }
  formTypeAdd = true
  editFormId = 0
  pageTitle = ""
  submitInProcess: boolean = false;
  resourcesForm!: FormGroup;
  firstName = '';
  selectTeamList = StaticData.ROLE_LIST
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  initialLoading = false;
  createdAt: any
  userData: any;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  technology = new FormControl();
  filteredtechnologys: Observable<any[]> | undefined;
  technologys: any = [];
  alltechnologys: Technology[] = [];
  routeSubscribe: any;
  updateDeleteObj: any=[]

  @ViewChild('technologyInput')
  technologyInput!: ElementRef;
  project = new FormControl();
  filteredprojects: Observable<any[]> | undefined;
  projects: any = [];
  allprojects: Project[] = [];
  @ViewChild('projectInput')
  projectInput!: ElementRef;
  isShow = false;
  newExternalProjects: any=[]
  newExternalProjectsId: any=[]
  allNewExternalProjects: any=[]
  constructor(private _formBuilder: FormBuilder, private router: Router,
    private ProjectService:CreateProjecteService,
    private _authService: AuthService,
    private _route: ActivatedRoute,
    private snackBar: SnackBar
    ) {
  }

  get resourcesValidForm(): { [key: string]: AbstractControl } {
    return this.resourcesForm.controls;
  }

  getAvtarInit() {
    this.resourcesForm.value.firstName.charAt(0)
  }

  ngOnInit(): void {
    this.resourcesForm = this._formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(ValidationConstants.NAME_VALIDATION)]],
      lastName: ['', [Validators.required, Validators.pattern(ValidationConstants.NAME_VALIDATION)]],
      email: ['', [Validators.required, Validators.pattern(ValidationConstants.EMAIL_VALIDATION)]],
      team: ['', [Validators.required]],
      year: ['', [Validators.pattern(ValidationConstants.YEAR_VALIDATION)]],
      month: ['', [Validators.pattern(ValidationConstants.YEAR_VALIDATION)]],
      technology: [''],
      project: [''],
    },{
      validator: [
        MonthValdation("month"),
    ]
    });
    this.routeSubscribe = this._route.queryParams.subscribe(checkformtype => {
      if (checkformtype['id']) {
          this.fetchEditdata(checkformtype['id'])
          this.editFormId = checkformtype['id']
        this.pageTitle = "Edit Resource"
        this.formTypeAdd = false
      }else{
        this.pageTitle = "Add Resource"
        this.formTypeAdd = true
      }
    });
  
    this.getTechnology();
    this.getProjectList();
    this.userData = this._authService.getUser();
  }

  submit() {
    if (!this.resourcesForm.invalid) {
      if(this.technologys.length>0){
      let payload = {
        firstName: this.resourcesForm.value.firstName,
        lastName:this.resourcesForm.value.lastName,
        email: this.resourcesForm.value.email,
        year:  this.resourcesForm.value.year? this.resourcesForm.value.year: 0,
        team:this.resourcesForm.value.team,
        month:this.resourcesForm.value.month? this.resourcesForm.value.month: 0,
        technology: this.technologys,
        assignedProjects: this.projects? this.projects.filter((project: any) => !this.newExternalProjectsId.includes(project)):[],
        newExternalProjects: this.newExternalProjects
      };
      this.submitInProcess = true;
      this.ProjectService.addresources(payload).subscribe(
        (res: any) => {
          this.submitInProcess = false;
        if(res.tokenExpire == true){
          this.snackBar.errorSnackBar(ErrorMessage.ERROR_SOMETHING_WENT_WRONG);
          this._authService.updateAndReload(window.location);
          }
         if(res.error){
          this.snackBar.errorSnackBar(res.message);
        }else{
          this.snackBar.successSnackBar("Successfully Added")
          this.resourcesForm.reset();
          this.router.navigate(['/resources/resources-list'])
        }
        },
        error => {
          this.submitInProcess = false;
          this.snackBar.errorSnackBar( "Server error")
        }
      );
    }
      else{
        this.submitInProcess = false;
        this.snackBar.errorSnackBar( "Choose technology")
      }
    }
  }
  gotoBack() {
    this.router.navigate(['/resources/resources-list'])
  }
  getTechnology(){
    this.initialLoading = true;
    this.ProjectService.getTechnology().subscribe(
      (res: any) => {
        this.submitInProcess = false;
        this.alltechnologys = res.data
       this.filteredtechnologys = this.resourcesForm.get('technology')?.valueChanges
       .pipe(
         startWith(''),
         map((technology: any |null) => technology ?  this._filter(technology) : this._filterslice()));
         this.initialLoading = false;
         if(res.data.error){
          this._authService.updateToken().subscribe(
            (res: any) => {
              this._authService.setToken(res.data.accessToken);
            })
         }
      },
      error => {
        this.submitInProcess = false;
        this.snackBar.errorSnackBar("Server error")
      }
    );
  }
  _filter(value: any) {
    return this.alltechnologys.filter((alltechnologys: any) =>
    alltechnologys.name.toLowerCase().indexOf(value) === 0  && !this.technologys.includes(alltechnologys.id));
  }
  _filterslice() {
    return this.alltechnologys.filter(alltechnologys =>  !this.technologys.includes(alltechnologys.id))
  }
  _filterProject(value: any) {
    return this.allprojects.filter((allprojects: any) =>
    allprojects.name.toLowerCase().indexOf(value) === 0  && !this.projects.includes(allprojects.id));
  }
  _filtersliceProject() {
    return this.allprojects.filter(allprojects =>  !this.projects.includes(allprojects.id))
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our technology

    if (input) {
      input.value = '';
    }

    this.technology.setValue('');
    this.resourcesForm.get('technology')?.setValue('');
  }

  remove(technology: any, selectIndex: any): void {
    this.technologys.splice(selectIndex, 1);
    this.resourcesForm.get('technology')?.setValue('');
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.technologys.push(event.option.value);
    this.technologyInput.nativeElement.value = '';
    this.technology.setValue('');
    this.resourcesForm.get('technology')?.setValue('');
  }
  /**
   * Upload avatar
   *
   * @param fileList
   */
  uploadAvatar(): void {
    // Return if canceled
  }

  /**
   * Remove the avatar
   */
  removeAvatar(): void {

  }
  fetchEditdata(id: number){
    let payload={id: id}
    this.initialLoading = true;
    this.ProjectService.getresource(payload).subscribe(
      (res: any) => {
        this.initialLoading = false;
        this.updateDeleteObj.push(res.data)
        this.updateDeleteObj.forEach((item: any) => {
        this.resourcesForm.patchValue({
          firstName:item.firstName?item.firstName: "",
          lastName:item.lastName?item.lastName: "",
          email: item.email?item.email: "",
          team:item.team?item.team: "",
          year: item.year?item.year: 0,
          month: item.month?item.month: 0,
        });
        this.createdAt = item.createdAt
        this.firstName=item.firstName?item.firstName: ""
        this.technologys =item.technology
        this.filteredtechnologys = this.resourcesForm.get('technology')?.valueChanges
        .pipe(
          startWith(''),
          map((technology: any |null) => technology ?  this._filter(technology) : this._filterslice()));
        
      })
      if(res.tokenExpire == true){
        this._authService.updateAndReload(window.location);
        }
      },
      error => {
        this.initialLoading = false;
      }
    );
  }
  ngOnDestroy(): void{
    this.routeSubscribe.unsubscribe();
  }
  canExit(): boolean {
    if (!this.resourcesForm.pristine) {
      return false;
    }
    return true;
  }
  editresource(){
    if (!this.resourcesForm.invalid) {
      if(this.technologys.length>0){
      let payload = {
        id: this.editFormId,
        createdAt: this.createdAt,
        lastModifiedAt: null,
        isDeleted: false,
        firstName: this.resourcesForm.value.firstName,
        lastName:this.resourcesForm.value.lastName,
        email: this.resourcesForm.value.email,
        year:  this.resourcesForm.value.year? this.resourcesForm.value.year: 0,
        team:this.resourcesForm.value.team,
        month:this.resourcesForm.value.month? this.resourcesForm.value.month: 0,
        technology: this.technologys,
        assignedProjects: this.projects? this.projects.filter((project: any) => !this.newExternalProjectsId.includes(project)):[],
        newExternalProjects: this.newExternalProjects
      };
      this.submitInProcess = true;
      this.ProjectService.updateDeleteResource(payload).subscribe(
        (res: any) => {
          this.submitInProcess = false;
         if(res.error){
          this.snackBar.errorSnackBar(res.message);
        }else{
          this.snackBar.successSnackBar("Updated successfully");
          this.resourcesForm.reset();
          this.router.navigate(['/resources/resources-list'])
        }
        if(res.tokenExpire == true){
          this.snackBar.errorSnackBar(ErrorMessage.ERROR_SOMETHING_WENT_WRONG);
          this._authService.updateAndReload(window.location);
          }
        },
        error => {
          this.submitInProcess = false;
          this.snackBar.errorSnackBar("Server error");
        }
      );
    }
      else{
        this.submitInProcess = false;
        this.snackBar.errorSnackBar("Choose technology");
      }
    }
  }
  getProjectList(){
    this.initialLoading = true
    this.ProjectService.getExternalProjectList().subscribe((res:any)=>{
      this.allprojects = res.data
      this.filteredprojects = this.resourcesForm.get('project')?.valueChanges
      .pipe(
        startWith(''),
        map((project: any |null) => project ?  this._filterProject(project) : this._filtersliceProject()));
        this.initialLoading = false;
      if(res.tokenExpire == true){
        this._authService.updateAndReload(window.location);
        }
    })
  }
  addProject(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our project
    if(typeof event.value == "string"){
      this.newExternalProjects.push(event.value);
      let max = Math.max.apply(Math, this.allprojects.map(ele=>ele.id)) +1
      this.allprojects.push({id: max,
        name: event.value
      })
      this.projects.push(max)
      this.newExternalProjectsId.push(max)
      this.allNewExternalProjects.push({id: max,
        name: event.value
      })
    }

    if (input) {
      input.value = '';
    }

    this.project.setValue('');
    this.resourcesForm.get('project')?.setValue('');
  }

  removeProject(project: number, selectIndex: any): void {
    this.projects.splice(selectIndex, 1);
    const found = this.newExternalProjectsId.some((el: any) => el === project);
    if(found){
      this.newExternalProjectsId.splice(selectIndex, 1);
    let filteredExternalProject: any = this.allNewExternalProjects.filter( (item: any) => item.id === project )
    this.newExternalProjects.forEach((element: any,index: any)=>{
      if(element==filteredExternalProject[0].name) this.newExternalProjects.splice(index,1);
   });
    this.allprojects.forEach((element: any,index: any)=>{
      if(element.id==project) this.allprojects.splice(index,1);
    });
    this.allNewExternalProjects.forEach((element: any,index: any)=>{
      if(element.id==project) this.allNewExternalProjects.splice(index,1);
    });

    }
    this.resourcesForm.get('project')?.setValue('');
  }

  selectedProject(event: MatAutocompleteSelectedEvent): void {
    this.projects.push(event.option.value);
    this.projectInput.nativeElement.value = '';
    this.project.setValue('');
    this.resourcesForm.get('project')?.setValue('');
  }
}
