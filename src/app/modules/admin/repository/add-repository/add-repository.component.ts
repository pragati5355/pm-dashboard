import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation, HostListener } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationConstants } from "../../../../core/constacts/constacts";
import { StaticData } from "../../../../core/constacts/static";
import {validateChips} from "../../../../core/utils/Validations";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import {MatStepper} from '@angular/material/stepper';
import {MatStepperIntl} from '@angular/material/stepper';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import {Observable} from 'rxjs';
import {startWith} from 'rxjs';
import {map} from 'rxjs';
import { IDeactivateComponent } from "@services/deactivate-service/decativate.guard";
import {TextRegexValidator, RegexConstants,noWhitespaceValidator } from "../../../../core/utils/Validations";
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@services/auth/auth.service';
import { CreateProjecteService } from '@services/create-projecte.service';
import {SnackBar} from '../../../../core/utils/snackBar'
import {ObjectValidation} from "../../../../core/utils/Validations";
import { ConnectJiraPopupComponent } from '@modules/admin/project/connect-jira-popup/connect-jira-popup.component';
import { ErrorMessage } from 'app/core/constacts/constacts';
import {FuseConfirmationService} from '@fuse/services/confirmation';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from '@angular/material/autocomplete';
export class Developer {
  constructor( public id: number, public email: string) { }
}
export interface BitbucketProject {
  id: number;
  uuid: any;
  projectName: string;
  bitbucketProjectName: string;
  key: string;
  createdAt: string;
  createdBy: string;
  bitbucketUrl: string;
  jenkinsUrl: any;
  status: string;
}
@Component({
  selector: 'app-add-repository',
  templateUrl: './add-repository.component.html',
  styleUrls: ['./add-repository.component.scss']
})
export class AddRepositoryComponent implements OnInit {
  pageTitle ="add" 
  @ViewChild("stepper", { static: false }) stepper!: MatStepper;
  @ViewChild('drawer') drawer!: MatDrawer;
  selectedIndex = 0;
  showStep = 1
  initialLoading: boolean =false
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  project_name = ""
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  routeSubscribe: any;
  userData: any;
  createBitbucketProjectFrom!: FormGroup;
  angularForm!: FormGroup;
  emailInvalid= false
  // allRepositories: any =["kjhk","kjhkjh"]
  formType: any = "sans"
  // selectTeamList = StaticData.ROLE_LIST
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  //  repository filter value
  addOnBlurRepository = false;
  filteredRepositories!: Observable<any[]> | undefined;
  repositories: any = [];
  allRepositories: any = [];

  @ViewChild('repositoryInput')
  repositoryInput!: ElementRef;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete | any;
  //branch filter value
  addOnBlurBranch = false
  filteredBranches: Observable<any[]> | undefined;
  branches: any = ['master', 'staging', 'development'];
  allBranches: any = ['master', 'staging', 'development', 'testing'];

  @ViewChild('branchInput')
  branchInput!: ElementRef;
  // developer filter value
  developer = new FormControl();
  filteredDevelopers: Observable<any[]> | undefined;
  developers: any = [];
  allDevelopers: Developer[] = [];
  @ViewChild('developerInput')
  developerInput!: ElementRef;
  newExternalDeveloper: any=[]
  allNewExternalDevelopers: any = []
  newExternalDevelopersEmail: any=[]
  // code reviewer filter value
  codeReviewerCtrl = new FormControl();
  filteredCodeReviewers: Observable<any[]> | undefined;
  codeReviewers: any = [];
  allCodeReviewers: any = [];

  @ViewChild('codeReviewerInput')
  codeReviewerInput!: ElementRef;

  // bitbucket project field
  bitbucketProjectName = "";
  myControl = new FormControl();
  options: BitbucketProject[] = [
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
      id: 8,
      uuid: '{16188316-4812-4f06-bd2d-36e7709d3dc0}',
      projectName: 'indbowser',
      bitbucketProjectName: 'ginger14',
      key: 'GINGER14',
      createdAt: '2021-11-18T08:18:50.437',
      createdBy: 'Pranita',
      bitbucketUrl: 'GINGER14',
      jenkinsUrl: null,
      status: 'success',
    },
    {
      id: 9,
      uuid: '{a6f34c18-d055-40e4-93d3-5f44ee4a503b}',
      projectName: 'workspace',
      bitbucketProjectName: 'workspace',
      key: 'WORKSPACE',
      createdAt: '2021-11-19T05:21:08.571',
      createdBy: 'Pranita',
      bitbucketUrl: 'WORKSPACE',
      jenkinsUrl: null,
      status: 'success',
    },
    {
      id: 10,
      uuid: '{56948dae-16fc-4f2d-8b93-872632012803}',
      projectName: 'portalnametest',
      bitbucketProjectName: 'portalnametest',
      key: 'PORTALNAMETEST',
      createdAt: '2021-11-19T05:54:19.78',
      createdBy: 'Pranita',
      bitbucketUrl: 'PORTALNAMETEST',
      jenkinsUrl: null,
      status: 'success',
    },
    {
      id: 11,
      uuid: '{10f57342-db0f-417b-98c1-a74b9488b17b}',
      projectName: 'indbowser',
      bitbucketProjectName: 'taj13',
      key: 'TAJ13',
      createdAt: '2021-11-22T05:02:34.922',
      createdBy: 'Pranita',
      bitbucketUrl: 'TAJ13',
      jenkinsUrl: null,
      status: 'success',
    },
    {
      id: 12,
      uuid: '{b30faa72-fa43-4302-887d-0e001b293655}',
      projectName: 'indbowser',
      bitbucketProjectName: 'taj14',
      key: 'TAJ14',
      createdAt: '2021-11-22T05:04:55.55',
      createdBy: 'Pranita',
      bitbucketUrl: 'TAJ14',
      jenkinsUrl: null,
      status: 'success',
    },
    {
      id: 13,
      uuid: '{60586983-36dc-47ba-bf3e-9e4b219359a9}',
      projectName: 'indbowser',
      bitbucketProjectName: 'taj8',
      key: 'TAJ8',
      createdAt: '2021-11-22T05:16:10.616',
      createdBy: 'Pranita',
      bitbucketUrl: 'TAJ8',
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
  ];
  filteredOptions: Observable<BitbucketProject[]>| any;
  get createBitbucketProject(): { [key: string]: AbstractControl } {
    // console.log(key)
    return this.createBitbucketProjectFrom.controls;
  }
  constructor(private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _matStepperIntl: MatStepperIntl,
    private _fuseConfirmationService: FuseConfirmationService,
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private ProjectService:CreateProjecteService,
    private snackBar: SnackBar,
    private _route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.userData = this._authService.getUser();
        // Subscribe to media changes
        let projectData= this._authService.getProjectDetails()
        this.project_name = projectData.name
    this._fuseMediaWatcherService.onMediaChange$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(({matchingAliases}) => {

        // Set the drawerMode and drawerOpened if the given breakpoint is active
        if ( matchingAliases.includes('md') )
        {
            this.drawerMode = 'side';
            this.drawerOpened = true;
        }
        else
        {
            this.drawerMode = 'side';
            this.drawerOpened = false;
        }
    });

    this.createBitbucketProjectFrom = this._formBuilder.group({
      bitbucketProjectName: ['',[Validators.required]],
      projectName: ['',[Validators.required]],
      repositoryName: [[],[Validators.required]],
      developer:[[],this.validateDevelopers],
      codeReviewerAndPm: [[],this.validateCodeReviewer],
      branchOrPattern: ['',[Validators.required]],
      },
      );
      this.getDeveloper();
      this.getCodeReviewer();
      this.getBitbucketProjectName();
      this.filteredBranches = this.createBitbucketProjectFrom.get('branchOrPattern')?.valueChanges.pipe(
        startWith(''),
        map((branch: any | null) =>
          branch ? this._filterBranch(branch) : this._filterBranchSlice()
        )
      );
  }
  toggle(){
    this.drawerOpened = !this.drawerOpened;
  }
  goBack(stepper: any) {
    // stepper.previous();
    this.selectedIndex = stepper
    if(this.selectedIndex== 0){
      // this.projectDetails.reset( this.projectDetails.value);
      this.showStep = 1
    }else if(this.selectedIndex == 1){
      // this.clientDetials.reset( this.clientDetials.value);
      this.showStep = 2
    }else if(this.selectedIndex == 2){
      this.showStep = 3
      // this.projectSetting.reset( this.projectSetting.value);
    }else if(this.selectedIndex == 3){
      // this.getTeamMember()
      this.showStep = 4
      // this.projectTeam.reset( this.projectTeam.value);
    }
  }
  public selectionChange($event: any): void {
    if($event.selectedIndex == 0){
        this.showStep = 1
        // this.projectDetails.reset( this.projectDetails.value);
      }else if($event.selectedIndex == 1){
        this.showStep = 2
        // this.clientDetials.reset( this.clientDetials.value);
      }else if($event.selectedIndex == 2){
        this.showStep = 3
        // this.projectSetting.reset( this.projectSetting.value);
      }else if($event.selectedIndex == 3){
        // this.getTeamMember()
        this.showStep = 4
        // this.projectTeam.reset( this.projectTeam.value);
      }
    this.selectedIndex = $event.selectedIndex;
  }
  public goto(index: number): void {
    if (index == 0) return; // First step is not selected anymore -ok
    
    this.selectedIndex = index;
  }
  getTechnology(name:any){
    this.selectedIndex = 1
    this.showStep = 2
    this.formType = name
    if(this.formType == ("angular"||"react-js")){
      this.createBitbucketProjectFrom.addControl('portalName', new FormControl('', Validators.required));
    }
    if(this.formType == "django" || "java"){
      this.createBitbucketProjectFrom.addControl('microserviceName', new FormControl('', Validators.required));
    }

  }
  //developer filter function start
  _filterDevelopers(value: any) {
    console.log(value)
    console.log(this.allDevelopers)
    console.log("Hello")
    const filterValue = value.toLowerCase();
    return this.allDevelopers.filter(
      (developer: any) =>
        developer.email.toLowerCase().indexOf(filterValue) === 0 &&
        !this.developers.includes(developer.email)
    );
    // return this.developers.filter((allDevelopers: any) =>
    // allDevelopers.email.toLowerCase().indexOf(value.toLowerCase()) === 0  && !this.developers.includes(allDevelopers.email));
  }
  _filterDevelopersSlice() {
    this.emailInvalid = false
    return this.allDevelopers.filter(allDevelopers =>  !this.developers.includes(allDevelopers.email))
  }
  addDeveloper(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our developer
    this.emailInvalid = false
    if(typeof value == "string"){
      if (this.validateEmail(value)) {
      this.newExternalDeveloper.push(value);
      let max = Math.max.apply(Math, this.allDevelopers.map(ele=>ele.id)) +1
      this.allDevelopers.push({id: max,
        email: event.value
      })
      this.developers.push(value)
      this.allNewExternalDevelopers.push({id: max,
        email: event.value
      })
      this.emailInvalid = false
      if (input) {
        input.value = '';
      }
  
      this.developer.setValue('');
      this.createBitbucketProjectFrom.get('developer')?.setValue('');
      console.log(this.emailInvalid)
      }else{
        this.emailInvalid = true
        console.log(this.emailInvalid)
      }
    }
   
  }

  removeDeveloper(developer: any, selectIndex: any): void {
    this.developers.splice(selectIndex, 1);
    const found = this.newExternalDeveloper.some((el: any) => el === developer);
    if(found){
    this.newExternalDeveloper.splice(selectIndex, 1);
    let filteredExternalProject: any = this.allNewExternalDevelopers.filter( (item: any) => item.email === developer )
    this.newExternalDeveloper.forEach((element: any,index: any)=>{
      if(element==filteredExternalProject[0].name) this.newExternalDeveloper.splice(index,1);
   });
    this.allDevelopers.forEach((element: any,index: any)=>{
      if(element.email==developer) this.allDevelopers.splice(index,1);
    });
    this.newExternalDeveloper.forEach((element: any,index: any)=>{
      if(element.email==developer) this.newExternalDeveloper.splice(index,1);
    });
     console.log("newExternalDeveloper",this.newExternalDeveloper)
     console.log("allDevelopers",this.allDevelopers)
    }
    console.log(this.developers)
    this.createBitbucketProjectFrom.get('developer')?.setValue('');
  }

  selectedDeveloper(event: MatAutocompleteSelectedEvent): void {
    this.emailInvalid = false
    this.developers.push(event.option.value);
    this.developerInput.nativeElement.value = '';
    console.log(this.developers)
    this.developer.setValue('');
    this.createBitbucketProjectFrom.get('developer')?.setValue('');
  }
  getDeveloper(){
    this.initialLoading = true;
    // this.ProjectService.getTechnology().subscribe(
    //   (res: any) => {
        // this.submitInProcess = false;
        this.allDevelopers =[{"id":14,"email":"pranita.jadhav@mindbowser.com"},{"id":15,"email":"ashwin.kawade@mindbowser.com"},{"id":23,"email":"sanskriti/gupta@mindbower.com"}]
       this.filteredDevelopers = this.createBitbucketProjectFrom.get('developer')?.valueChanges
       .pipe(
         startWith(''),
         map((developer: any |null) => developer ?  this._filterDevelopers(developer) : this._filterDevelopersSlice()));
         this.initialLoading = false;
        //  if(res.data.error){
        //   this._authService.updateToken().subscribe(
        //     (res: any) => {
        //       this._authService.setToken(res.data.accessToken);
        //     })
        //  }
      // },
      // error => {
      //   this.submitInProcess = false;
      //   this.snackBar.errorSnackBar("Server error")
      // }
    // );
  }
  //developer filter function end
  // repository filter function start
  changeProject(event: any){
    console.log(this.createBitbucketProjectFrom.value.projectName)
    let projectName = this.createBitbucketProjectFrom.value.projectName+"-"+this.formType
    this.allRepositories =[projectName,projectName+"-config"]
    this.filteredRepositories = this.createBitbucketProjectFrom.get('repositoryName')?.valueChanges.pipe(
      startWith(''),
      map((repository: string | null) =>
        repository
          ? this._filterRepository(repository)
          : this._filterRepositoriesSlice()
      )
    );
    
  }
  addRepository(event: MatChipInputEvent): void {
    // Add repository only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    // if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our repository
      if ((value || '').trim()) {
        // this.repositories.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }
      this.createBitbucketProjectFrom.get('repositoryName')?.setValue('');
    // }
  }

  removeRepository(repository: string): void {
    const index = this.repositories.indexOf(repository);
    console.log(repository)
    if (index >= 0) {
      this.repositories.splice(index, 1);
    }
  }

  selectedRepository(event: MatAutocompleteSelectedEvent): void {
    this.repositories.push(event.option.viewValue);
    this.repositoryInput.nativeElement.value = '';
    this.createBitbucketProjectFrom.get('repositoryName')?.setValue('');
  }

  private _filterRepository(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allRepositories.filter(
      (repository: any) =>
        repository.toLowerCase().indexOf(filterValue) === 0 &&
        !this.repositories.includes(repository)
    );
  }
  _filterRepositoriesSlice() {
    return this.allRepositories.filter(
      (allRepositories: any) => !this.repositories.includes(allRepositories)
    );
  }
  // repository filter function end

  // branch filter function start
  addBranch(event: MatChipInputEvent): void {
      const input = event.input;
      const value = event.value;
      if ((value || '').trim()) {
      }
      if (input) {
        input.value = '';
      }
      this.createBitbucketProjectFrom.get('branchOrPattern')?.setValue('');
  }

  removeBranch(branch: string): void {
    const index = this.branches.indexOf(branch);
    console.log( this.branches.indexOf(branch))
    if (index >= 0) {
      this.branches.splice(index, 1);
    }
    this.createBitbucketProjectFrom.get('branchOrPattern')?.setValue('');
    console.log(this.branches)
  }

  selectedBranch(event: MatAutocompleteSelectedEvent): void {
    this.branches.push(event.option.viewValue);
    this.branchInput.nativeElement.value = '';
    this.createBitbucketProjectFrom.get('branchOrPattern')?.setValue('');
  }

  private _filterBranch(value: string) {
    const filterValue = value.toLowerCase();
    return this.allBranches.filter(
      (branch: any) =>
        branch.toLowerCase().indexOf(filterValue) === 0 &&
        !this.branches.includes(branch)
    );
  }
  _filterBranchSlice() {
    return this.allBranches.filter(
      (allBranches:any) => !this.branches.includes(allBranches)
    );
  }
  // branch filter functions end 

  // code reviewer filter function start
  getCodeReviewer(){
    this.allCodeReviewers = [
      {
        display_name: 'Pranita Ananda Jadhav',
        uuid: '{d74946e9-b60e-451f-9636-543de534bcee}',
      },
      {
        display_name: 'Ashwin kawade',
        uuid: '{c528f949-55ec-401a-aefe-82f7f6783800}',
      },
      {
        display_name: 'Pranita Jadhav',
        uuid: '{d0844247-1730-4d78-9bb5-aef57613d5af}',
      },
      {
        display_name: 'Bshwin kawade',
        uuid: '{c528f949-55ec-401a-aefe-82f7f6783800}',
      },
    ]
    this.filteredCodeReviewers = this.createBitbucketProjectFrom.get('codeReviewerAndPm')?.valueChanges.pipe(
      startWith(null),
      map((codeReviewer: string | null) =>
        codeReviewer ? this._filterCodeReviewer(codeReviewer) : this._filterCodeReviewerSlice()
      )
    );
  }
  addCodeReviewer(event: MatChipInputEvent): void {
    debugger;
    const input = event.input;
    const value = event.value;
    // Add our codeReviewer
    if ((value || '').trim()) {
    }
    console.log('codeReviewers', this.codeReviewers);
    // Reset the input value
    if (input) {
      input.value = '';
    }

    // this.codeReviewerCtrl.setValue(null);
    this.createBitbucketProjectFrom.get('codeReviewerAndPm')?.setValue('');
  }

  removeCodeReviewer(codeReviewer: any, indx: any) {
    this.codeReviewers.splice(indx, 1);
    this.createBitbucketProjectFrom.get('codeReviewerAndPm')?.setValue('');
  }

  selectedCodeReviewer(event: MatAutocompleteSelectedEvent): void {
    this.codeReviewers.push(event.option.value);
    this.codeReviewerInput.nativeElement.value = '';
    // this.codeReviewerCtrl.setValue(null);
    this.createBitbucketProjectFrom.get('codeReviewerAndPm')?.setValue('');
    console.log('codeReviewers', this.codeReviewers);
  }

  private _filterCodeReviewer(value: any) {
    console.log(value);
    // return this.allCodeReviewers.filter((codeReviewer) =>
    //   codeReviewer.display_name.toLowerCase().includes(value.toLowerCase())
    // );
    if (typeof value == 'object') {
      console.log('helldd');
      return this.allCodeReviewers.filter((codeReviewer: any) =>
        codeReviewer.display_name
          .toLowerCase()
          .includes(
            value.display_name.toLowerCase() &&
              !this.codeReviewers.includes(codeReviewer)
          )
      );
    } else {
      console.log('hellddhjhhj');
      return this.allCodeReviewers.filter(
        (codeReviewer: any) =>
          codeReviewer.display_name
            .toLowerCase()
            .includes(value.toLowerCase()) &&
          !this.codeReviewers.includes(codeReviewer)
      );
    }
  }
  _filterCodeReviewerSlice() {
    return this.allCodeReviewers.filter(
      (allCodeReviewers: any) => !this.codeReviewers.includes(allCodeReviewers)
    );
  }
  private validateCodeReviewer(codeReviewers: FormControl) {
    if (codeReviewers.value && codeReviewers.value.length === 0) {
      console.log("codeReviewers",codeReviewers.value)
      return {
        validateCodeReviewersArray: { valid: false }
      };
    }

    return true;
  }
  // code reviewer filter function end

  //bitbucket project filter function start
  getBitbucketProjectName(){
    this.filteredOptions = this.createBitbucketProjectFrom.get('bitbucketProjectName')?.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.projectName)),
      map((projectName) =>
        projectName ? this._filter(projectName) : this.options.slice()
      )
    );
  }
  displayFn(bitbucketProject: any) {
    console.log('kz;lksd;f', bitbucketProject);
    // console.log("this.myControl",this.myControl.value)
    if (typeof bitbucketProject == 'object') {
      return bitbucketProject ? bitbucketProject.projectName : undefined;
    }
    // return this.myControl.value
  }
  returnFn(bitbucketProject?: any) {
    console.log('bitbucketProject');
    if (typeof bitbucketProject == 'object') {
      return bitbucketProject ? bitbucketProject.projectName : undefined;
    }
  }

  private _filter(projectName: string): BitbucketProject[] {
    console.log(projectName);
    const filterValue = projectName.toLowerCase();

    return this.options.filter(
      (option) => option.projectName.toLowerCase().indexOf(filterValue) === 0
    );
  }
  //bitbucket project filter function end
  selectChangeProject(event: any){}
  submit(){
    console.log(this.createBitbucketProjectFrom)
    if (!this.createBitbucketProjectFrom.invalid){
      this.showStep = 3
    }
  }
  private validateEmail(email: any) {
    var re = ValidationConstants.EMAIL_VALIDATION;
    return re.test(String(email).toLowerCase());
  }
  private validateDevelopers(developers: FormControl) {
    // console.log(this.developers)
    // console.log("developers",developers.value.length)
    if (developers.value && developers.value.length === 0 ) {
      return {
        validateDevelopersArray: { valid: false }
      };
    }

    return null;
  }
}
