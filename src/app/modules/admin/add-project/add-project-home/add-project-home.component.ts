import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation, HostListener } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationConstants } from "../../../../core/constacts/constacts";
import { StaticData } from "../../../../core/constacts/static";
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
export class TeamMember {
  constructor(public firstName: string, public lastName: string,  public id: string, public email: string, public team: string ) { }
}
export class ManagerList {
  constructor(public firstName: string, public lastName: string,  public id: string, public email: string, public team: string ) { }
}
export class JiraUser {
  constructor( public displayName: string, public accountType: string, public active: boolean, public avatarUrl: any, public accountId: string, public orgId:any) { }
}
export class JiraTeamUser {
  constructor( public displayName: string, public accountType: string, public active: boolean, public avatarUrl: any, public accountId: string, public orgId:any) { }
}
@Component({
  selector: 'app-add-project-home',
  templateUrl: './add-project-home.component.html',
  styleUrls: ['./add-project-home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {'window:beforeunload':'doSomething'},
})
export class AddProjectHomeComponent implements OnInit, OnDestroy,IDeactivateComponent {
  @HostListener("window:beforeunload", ["$event"])
  public onPageUnload($event: BeforeUnloadEvent) {
    if (!this.canExit()) {
      $event.returnValue = true;
    }
  }
  pageTitle ="Add"
  editProjectId = 0;
  project_manager = new FormControl();
  // team_member = new FormControl();
  @ViewChild("stepper", { static: false }) stepper!: MatStepper;
    @ViewChild('drawer') drawer!: MatDrawer;
    editProject = false
    selectJiraUser = ""
    selectManager= ""
    teamJiraUser=false
    isAddTeam = true
    selectedIndex = 0;
    showStep = 1
    initialLoading: boolean =false
    submitInProcess: boolean = false;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    projectDetials!: FormGroup;
    clientDetials!: FormGroup
    projectSetting!: FormGroup;
    projectTeam!: FormGroup;
    disableTextbox =  false;
    list: any = [
      { id: 1, name: 'Metrics', key:"MT"},
      { id: 2, name: 'ChatBiopsy', key:"CB"},
      { id: 2, name: 'BL', key:"BL"},
    ];
    settingProjectName = ""
    selection = [
    ];
    clientData: any = [];
    selectRoleList= StaticData.TEAM_MEMBER_ROLE
    teamMemberList: any = [];
    managerEditTeamLIst: any = [];
    editteamMemberList: any = []
    filteredTeamMembers!: Observable<any[]> | undefined;
    filteredManagerLists!: Observable<any[]> | undefined;
    filteredJiraUsers!: Observable<any[]> | undefined;
    filteredTeamJiraUsers!: Observable<any[]> | undefined;
     get projectDetailsForm(): { [key: string]: AbstractControl } {
      return this.projectDetials.controls;
    }
    get clientDetailForm(): { [key: string]: AbstractControl } {
      return this.clientDetials.controls;
    }
    get projectSettingsForm(): { [key: string]: AbstractControl } {
      return this.projectSetting.controls;
    }
    get projectTeamForm(): { [key: string]: AbstractControl } {
      return this.projectTeam.controls;
    }
    teamMembers: TeamMember[] =  [];
    managerLists: ManagerList[] =  [];
    selectedJiraUser: any =[]
    selectedTeamMember: any = []
    jiraUsers: JiraUser[] = []
    jiraTeamUsers: JiraTeamUser[] = []
    userData: any;
    clientDtailsList: any = []
    routeSubscribe: any;
    constructor(private _fuseMediaWatcherService: FuseMediaWatcherService,private _matStepperIntl: MatStepperIntl,
      private _formBuilder: FormBuilder,
      private _authService: AuthService,
      private dialog: MatDialog,
      private router: Router,
      private ProjectService:CreateProjecteService,
      private snackBar: SnackBar,
      private _route: ActivatedRoute,
      )
    {
    
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
      
      this.userData = this._authService.getUser();
      this.projectDetials = this._formBuilder.group({
      projectName: ['',[Validators.required]],
      projectDescription: ['',[Validators.required,
        TextRegexValidator(RegexConstants.Text_Area)]]
      },{
        validator: [
        noWhitespaceValidator("projectDescription"),
      ]
      });
      this.clientDetials = this._formBuilder.group({
        firstName: ['',[Validators.required,
          Validators.pattern(ValidationConstants.NAME_VALIDATION)]],
        lastName: ['',[Validators.required,
          Validators.pattern(ValidationConstants.NAME_VALIDATION)]],
          firstName2: ['',[
            Validators.pattern(ValidationConstants.NAME_VALIDATION)]],
          lastName2: ['',[
            Validators.pattern(ValidationConstants.NAME_VALIDATION)]],
            firstName3: ['',[
              Validators.pattern(ValidationConstants.NAME_VALIDATION)]],
            lastName3: ['',[
              Validators.pattern(ValidationConstants.NAME_VALIDATION)]],
        });
        this.projectSetting = this._formBuilder.group({
          url: ['',[Validators.required]],
          email: ['',[Validators.required,
            Validators.pattern(ValidationConstants.EMAIL_VALIDATION)]],
          token: ['',[Validators.required]],
          project: [''],
        });
        this.projectTeam = this._formBuilder.group({
          project_manager: ['',[Validators.required]],
            jira_user: ['',[Validators.required]],
          team_member: [''],
          select_role: [''],
          team_jira_user: [''],
          
        },{
          validator: [
            ObjectValidation("project_manager"),
            ObjectValidation("jira_user"),
            ObjectValidation("team_member"),
            ObjectValidation("team_jira_user")

        ]
        });
        this.routeSubscribe = this._route.queryParams.subscribe(projecteditId => {
          if (projecteditId['id']) {
            this.fetchEditproject(projecteditId['id'])
            this.editProjectId = projecteditId['id']
            this.pageTitle = "edit"
            this.editProject = true
          }else{
            this.pageTitle = "add"
            this.editProject = false
          }
        });
      
        // Subscribe to media changes
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
       this.filterFunctions();
    }
    filterFunctions(){
      this.filteredTeamMembers = this.projectTeam.get('team_member')?.valueChanges
      .pipe(
        startWith(''),
        map(teamMember => teamMember ? this.filterTeamMembers(teamMember) : this.filterTeamMemberSlice())
      );
      this.filteredManagerLists = this.projectTeam.get('project_manager')?.valueChanges
      .pipe(
        startWith(''),
        map(managerList => managerList ? this.filterManagerLists(managerList) : this.filterManagerListsSlice())
      );
      this.filteredJiraUsers = this.projectTeam.get('jira_user')?.valueChanges 
      .pipe(
        startWith(''),
        map(jiraUser => jiraUser ? this.filterJiraUsers(jiraUser) : this.filterJiraUsersSlice())
      );
      this.filteredTeamJiraUsers = this.projectTeam.get('team_jira_user')?.valueChanges
      .pipe(
        startWith(''),
        map(jiraTeamUser => jiraTeamUser ? this.filterTeamJiraUsers(jiraTeamUser) : this.filterTeamJiraUsersSlice())
      );
    }
    filterTeamMembers(value: any) {
      if(typeof(value) == "object"){
        return this.teamMembers.filter((teamMember: any) =>
        teamMember.firstName.toLowerCase().indexOf(value.firstName.toLowerCase()) === 0 && !this.selectedTeamMember.includes(teamMember.id) && ( teamMember.id )!== this.projectTeam.value.project_manager.id);
      }else{
      return this.teamMembers.filter((teamMember: any) =>
      teamMember.firstName.toLowerCase().indexOf(value.toLowerCase()) === 0 && !this.selectedTeamMember.includes(teamMember.id) && ( teamMember.id )!== this.projectTeam.value.project_manager.id);
      }
    }
    filterTeamMemberSlice() {
      return this.teamMembers.filter(TeamMember => !this.selectedTeamMember.includes (TeamMember.id) &&  (TeamMember.id)!== this.projectTeam.value.project_manager.id)
    }
    filterManagerLists(value: any) {
      if(typeof(value) == "object"){
      return this.managerLists.filter((ManagerList: any) =>
      ManagerList.firstName.toLowerCase().indexOf(value.firstName.toLowerCase()) === 0  && !this.selectedTeamMember.includes(ManagerList.id) &&  (ManagerList.id) !== this.projectTeam.value.project_manager.id);
      }else{
        return this.managerLists.filter((ManagerList: any) =>
      ManagerList.firstName.toLowerCase().indexOf(value.toLowerCase()) === 0  && !this.selectedTeamMember.includes(ManagerList.id) &&  (ManagerList.id) !== this.projectTeam.value.project_manager.id);
      }
    }
    filterManagerListsSlice() {
      return this.managerLists.filter(ManagerList => !this.selectedTeamMember.includes(ManagerList.id) && !this.selectedTeamMember.includes(ManagerList.id) && ( ManagerList.id) !== this.projectTeam.value.project_manager.id)
    }
    filterJiraUsers(value: any) {
      if(typeof(value) == "object"){
      return this.jiraUsers.filter((JiraUser: any) =>
        JiraUser.displayName.toLowerCase().indexOf(value.displayName.toLowerCase()) === 0 && !this.selectedJiraUser.includes(JiraUser.displayName));
      }else{
        return this.jiraUsers.filter((JiraUser: any) =>
        JiraUser.displayName.toLowerCase().indexOf(value.toLowerCase()) === 0 && !this.selectedJiraUser.includes(JiraUser.displayName));
      }
    }
    filterJiraUsersSlice() {
      return this.jiraUsers.filter(JiraUser => !this.selectedJiraUser.includes(JiraUser.displayName) && !this.selectedJiraUser.includes(JiraUser.displayName))
    }
    filterTeamJiraUsers(value: any) {
      if(typeof(value) == "object"){
      return this.jiraTeamUsers.filter((JiraTeamUser: any) =>
        JiraTeamUser.displayName.toLowerCase().indexOf(value.displayName.toLowerCase()) === 0 && !this.selectedJiraUser.includes(JiraTeamUser.displayName) &&  JiraTeamUser.displayName !== this.projectTeam.value.jira_user.displayName);
      }else{
        return this.jiraTeamUsers.filter((JiraTeamUser: any) =>
        JiraTeamUser.displayName.toLowerCase().indexOf(value.toLowerCase()) === 0 && !this.selectedJiraUser.includes(JiraTeamUser.displayName) &&  JiraTeamUser.displayName !== this.projectTeam.value.jira_user.displayName);
      }
    }
    filterTeamJiraUsersSlice() {
      return this.jiraTeamUsers.filter(JiraTeamUser => !this.selectedJiraUser.includes(JiraTeamUser.displayName) && !this.selectedJiraUser.includes(JiraTeamUser.displayName) &&  JiraTeamUser.displayName !== this.projectTeam.value.jira_user.displayName)
    }
    /*
    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

    }
    toggle(){
      this.drawerOpened = !this.drawerOpened;
    }
    goBack(stepper: any) {
      // stepper.previous();
      this.selectedIndex = stepper
      if(this.selectedIndex== 0){
        this.showStep = 1
      }else if(this.selectedIndex == 1){
        this.showStep = 2
      }else if(this.selectedIndex == 2){
        this.showStep = 3
      }else if(this.selectedIndex == 3){
        this.getTeamMember()
        this.showStep = 4
      }
    }
    public selectionChange($event: any): void {
      if($event.selectedIndex == 0){
          this.showStep = 1
        }else if($event.selectedIndex == 1){
          this.showStep = 2
        }else if($event.selectedIndex == 2){
          this.showStep = 3
        }else if($event.selectedIndex == 3){
          this.getTeamMember()
          this.showStep = 4
        }
      this.selectedIndex = $event.selectedIndex;
    }
    public goto(index: number): void {
      if (index == 0) return; // First step is not selected anymore -ok
      
      this.selectedIndex = index;
    }
    send(): void
    { 
      
      if (!this.projectSetting.invalid) {
      let payload ={
        url:"https://"+ this.projectSetting.value.url+".atlassian.net",
        email: this.projectSetting.value.email,
        password: this.projectSetting.value.token     
      }
      this.submitInProcess = true;
      this._authService.connectJira(payload).subscribe(
        (res:any)=>{
        if(res.data.length>0){
          if(this.editProject == false){
          const dialogRef = this.dialog.open(ConnectJiraPopupComponent, {
            disableClose: true,
            panelClass:"warn-dialog-content",
            autoFocus: false,
            data: {
              projectList: res.data,
              settingProjectName: this.projectSetting.value.project
            }
          });
          dialogRef.afterClosed().subscribe((result: any) => {
            if (result && result.project) {
              this.settingProjectName =  result.project;
              this.projectSetting.patchValue({
                project: result.project
              });
            }
          });
           }
          this.ProjectService.getJiraUser(payload).subscribe(
            (res:any)=>{
              this.submitInProcess = false;
              if(res.data.length>0){
               this.jiraUsers = res.data
                this.jiraTeamUsers = res.data
                if(this.editProject == true){
                let projectManagerdata = this.jiraUsers.filter((JiraUsers: any) => JiraUsers.displayName == this.managerEditTeamLIst[0].jiraUser )
                this.projectTeam.patchValue({
                 jira_user: projectManagerdata[0]?projectManagerdata[0]:null
                })
              }
            }else{
              this.submitInProcess = false;
              if(res.data.error){
                this.snackBar.errorSnackBar(res.data.error)
              }
             else{
              this.snackBar.errorSnackBar("Jira user not found")
             }
            }
              
            }, 
            error => {
              this.submitInProcess = false;
            }
          )
        }else{
          this.submitInProcess = false;
          if(res.data.error){
            this.snackBar.errorSnackBar("server error")
          }
         else{
          this.snackBar.errorSnackBar("Jira user not found")
         }
        }
          
        }, 
        error => {
          this.submitInProcess = false;
        }
      )

      }

    }
    addTeamMember() {
      // this.projectTeam.get('project_manager')?.clearValidators()
      // this.projectTeam.controls["project_manager"].clearValidators();
      // this.projectTeam.controls['project_manager'].updateValueAndValidity();
      // this.projectTeam.get('team_member')?.clearValidators()
      if (!this.projectTeam.controls['team_member'].invalid && !this.projectTeam.controls['team_jira_user'].invalid) {
      if (
        !this.projectTeam.value.team_jira_user
      ) {

        this.teamJiraUser =true
      }
      if (
        this.projectTeam.value.team_member &&
        this.projectTeam.value.select_role &&
        this.projectTeam.value.team_jira_user
      ) {
        this.teamMemberList = [
          ...this.teamMemberList,
          {
            // name: this.projectTeam.value
            //   .team_member,
              teamMemberId:this.projectTeam.value
              .team_member.id,
            role: this.projectTeam.value.select_role,
            jiraUser: this.projectTeam.value.team_jira_user.displayName,
            isManager: false
          }
        ];
        this.selectedJiraUser = [  ...this.selectedJiraUser, this.projectTeam.value.team_jira_user.displayName]
        this.selectedTeamMember = [  ...this.selectedTeamMember, this.projectTeam.value.team_member.id]
        this.projectTeam.controls["team_member"].reset();
        this.projectTeam.controls["select_role"].reset();
        this.projectTeam.controls["team_jira_user"].reset();
      }
    }
    }
    deleteTeamMember(index: any,teamMemberId: any,jiraUser: any) {
      this.teamMemberList.splice(index, 1);
      this.projectTeam.controls["team_member"].reset();
      this.projectTeam.controls["select_role"].reset();
      this.projectTeam.controls["team_jira_user"].reset();
      this.selectedJiraUser = [ this.selectJiraUser.indexOf(jiraUser)]
      this.selectedTeamMember = [ this.selectedTeamMember.indexOf(teamMemberId)]
      this.filterFunctions();
    }
    submitProjectDetails(){
      if (!this.projectDetials.invalid) {
               this.selectedIndex = 1
      }
    }
    submitProjectClientDetails(){
      if (!this.clientDetials.invalid) {
               this.selectedIndex = 2
               this.clientDtailsList  = [
                {
                  firstName: this.clientDetials.value.firstName,
                  lastName: this.clientDetials.value.lastName
                },
                {
                  firstName: this.clientDetials.value.firstName2,
                  lastName: this.clientDetials.value.lastName2
                },
                {
                  firstName: this.clientDetials.value.firstName3,
                  lastName: this.clientDetials.value.lastName3
                }
              ]
              this.clientDtailsList = this.clientDtailsList.filter((item: any) => (item.firstName !== '' || item.lastName !== '') && (item.firstName !== null || item.lastName !== null) )
      }
    }
    submitProjectSetting(){
      if (!this.projectSetting.invalid) {
              this.selectedIndex = 3
              // this.getTeamMember()
      }
    }
    createProject(){

      if (!this.projectTeam.invalid) {
        if(this.teamMemberList.length > 0){
          this.teamMemberList = [
            ...this.teamMemberList,
            {
              // name: this.projectTeam.value.project_manager ,
              teamMemberId: this.projectTeam.value.project_manager.id,
              role: "Manager",
              jiraUser: this.projectTeam.value.jira_user.displayName,
              isManager: true
            }
          ];
          let payload = 
          {
            projectDetails: {
              name: this.projectDetials.value.projectName,
              description: this.projectDetials.value.projectDescription,
              key: this.projectSetting.value.project,
              entityId: null,
              uuid: null,
              orgId: null,
              private: false,
              id: "10000"
            },
            clientDetails: this.clientDtailsList,
            baseUrl: "https://"+ this.projectSetting.value.url+".atlassian.net",
            apiKey:  this.projectSetting.value.token,
            adminEmail: this.projectSetting.value.email,
            orgId: 1,
            addedBy: this.userData.userId,
            jiraProjectKey: this.projectSetting.value.project,
            teamDetails: this.teamMemberList
          }
          console.log(payload)
          this.submitInProcess = true;
          this.ProjectService.createProject(payload).subscribe(
            (res:any)=>{
              this.submitInProcess = false;
              if(res.data.error == false){
                this.snackBar.successSnackBar("Project created successFully");
              }else{
                this.snackBar.errorSnackBar(res.data.Message)
              }
            
            }, 
            error => {
              this.submitInProcess = false;

              this.snackBar.errorSnackBar("server error")
            }
          )
        this.projectDetials.reset();
        this.clientDetials.reset();
        this.projectSetting.reset();
        this.projectTeam.reset();
        this.teamMemberList = []
        this.settingProjectName = ""
        this.router.navigate(['/projects/project-list']) 
        }
        else{
          this.isAddTeam = false
          this.snackBar.errorSnackBar("Add team member and role")
        }
      }
    }   
    goToList(){
      this.router.navigate(['/projects/project-list']) 
    }
    getTeamMember(){
      let payload = {
        "technology": null,
        "experience":null,
        "perPageData":0,
        "totalPerPageData":0,
        "name": ""
      } 
        this.submitInProcess = true;
            this.ProjectService.getTeamMember(payload).subscribe(
              (res:any)=>{
                this.submitInProcess = false;
                this.teamMembers = res.data.teamMember
                this.managerLists = res.data.teamMember
                this.filterFunctions();
                if(this.editProject == true){
                 let projectManagerdata = this.managerLists.filter((ManagerList: any) => ManagerList.id == this.managerEditTeamLIst[0].teamMemberId )
                 this.projectTeam.patchValue({
                  project_manager: projectManagerdata[0]?projectManagerdata[0]:null
                })
              }
              }, 
              error => {
                this.submitInProcess = false;
                this.snackBar.errorSnackBar("Server error")
              }
            )
    }
    
selectedJiraUserOption(event: any) {
  const selectedValue = event.option.value;
      this.filteredTeamJiraUsers = this.projectTeam.get('team_jira_user')?.valueChanges
      .pipe(
        startWith(''),
        map(jiraTeamUser => jiraTeamUser ? this.filterTeamJiraUsers(jiraTeamUser) : this.filterTeamJiraUsersSlice())
      );
   }
   selectedManagerOption(event: any){
     const selectedValue = event.option.value;
     this.filteredTeamMembers = this.projectTeam.get('team_member')?.valueChanges
     .pipe(
       startWith(''),
       map(teamMember => teamMember ? this.filterTeamMembers(teamMember) : this.filterTeamMemberSlice())
     );
     this.filteredManagerLists = this.projectTeam.get('project_manager')?.valueChanges
     .pipe(
       startWith(''), 
       map(managerList => managerList ? this.filterManagerLists(managerList) : this.filterManagerListsSlice())
     );
   }
   canExit(): boolean {
    if (!this.projectDetials.pristine) {
      return false;
    }
    return true;
  }
  isEmptyStr(val: any) {
    return val === undefined || val === null || val === "+" || val.length <= 0 || val.trim().length === 0
      ? null
      : val.trim();
  }
  displayFn(user?: ManagerList): string | any {
    return user ? user.firstName+" "+user.lastName : null;
  }
  displayFnTeam(user?: TeamMember): string | any {
    return user ? user.firstName+" "+user.lastName : null;
  }
  displayFnJiraManager(user?: JiraTeamUser): string | any {
    return user ? user.displayName : null;
  }
  displayFnJiraTeam(user?: JiraUser): string | any {
    return user ? user.displayName : null;
  }
  fetchEditproject(id: number){
    // let res = StaticData.PROJECT_DETAILS
    let payload ={
      id: id
    }
    this.initialLoading = true;
    this.ProjectService.getOneProjectDetails(payload).subscribe(
      (res: any) => {
        this.initialLoading = false;
        let pojectdata = [res.data.project]
        this.clientData.push(res.data.clientModels)
        let projectsetting = [] ;
        projectsetting.push(res.data.authUser) 
        let projectTeam = res.data.teamModel
        pojectdata.forEach((item: any) => {
          this.projectDetials.patchValue({
            projectName: item.name?item.name:"",
            projectDescription: item.description?item.description:"",
          });
          this.settingProjectName =item.key?item.key:""
        })
        this.clientData.forEach((item: any)=>{
          this.clientDetials.patchValue({
            firstName:item.length > 0 ? (item[0].firstName?item[0].firstName:""):null ,
            lastName: item.length > 0 ?(item[0].lastName?item[0].lastName:""):null,
            firstName2: item.length > 1 ?(item[1].firstName?item[1].firstName:""):null,
            lastName2: item.length > 1 ?(item[1].lastName?item[1].lastName:""):null,
            firstName3:  item.length > 2 ?(item[2].firstName?item[2].firstName:""):null,
            lastName3: item.length > 2 ?(item[2].lastName?item[2].lastName:""):null,
          })
        })
        projectsetting.forEach((item:any)=>{
          this.projectSetting.patchValue({
            url:item.baseUrl?(item.baseUrl.slice(8)).slice(0,-14):null,
            email:item.email?item.email:"",
            token:item.apiKey?item.apiKey:"",
            project: this.settingProjectName
          })
        })
        projectTeam.forEach((item: any)=>{
          this.teamMemberList = [
            ...this.teamMemberList,
            {
              teamMemberId: item.teamMemberId,
              role: item.role,
              jiraUser: item.jiraUser,
              isManager: item.isManager
            }
          ];
        })
        this.managerEditTeamLIst = this.teamMemberList.filter((item: any) => item.role == "Manager" )
        this.teamMemberList = this.teamMemberList.filter((item: any) => item.role !== "Manager" )
        this.editteamMemberList = projectTeam.filter((item: any) => item.role !== "Manager" )
        this.teamMemberList.forEach((element:any) => {
          this.selectedJiraUser = [  ...this.selectedJiraUser, element.jiraUser]
        });
        this.teamMemberList.forEach((element:any) => {
          this.selectedTeamMember = [  ...this.selectedTeamMember, element.teamMemberId]
        });
       this.getTeamMember()
       this.send();
      }, error => {
        this.initialLoading = false;
      });
  
  }
  updateProject(){
    this.clientDtailsList.forEach((clientItem:any,i: any)=>{
    this.clientData[0].forEach((item: any,index: any)=>{
        if(i===index){
          item.firstName = clientItem.firstName,
          item.lastName = clientItem.lastName
        
        }
      })
      if(this.clientData[0].length < this.clientDtailsList.length){
        this.clientData[0].push(clientItem)
      }
    })

    console.log(this.editteamMemberList)
    console.log(this.teamMemberList)
    if (!this.projectTeam.invalid) {
      if(this.teamMemberList.length > 0){
        //update feature changes
        // this.teamMemberList = [
        //   ...this.teamMemberList,
        //   {
        //     // name: this.projectTeam.value.project_manager ,
        //     teamMemberId: this.projectTeam.value.project_manager.id,
        //     role: "Manager",
        //     jiraUser: this.projectTeam.value.jira_user.displayName,
        //     isManager: true
        //   }
        // ];
        let payload = 
        {
          projectDetails: {
            name: this.projectDetials.value.projectName,
            description: this.projectDetials.value.projectDescription,
            key: this.projectSetting.value.project,
            entityId: null,
            uuid: null,
            orgId: null,
            private: false,
            id: this.editProjectId,
            createdAt: 1659001283034,
            lastModifiedAt: 1659001283034,
            isDeleted: false,
            projectId: "10000",
            isPrivate: false,
            userId: 3,
          },
          clientDetails: this.clientDtailsList,
          baseUrl: "https://"+ this.projectSetting.value.url+".atlassian.net",
          apiKey:  this.projectSetting.value.token,
          adminEmail: this.projectSetting.value.email,
          orgId: 1,
          addedBy: this.userData.userId,
          jiraProjectKey: this.projectSetting.value.project,
          teamDetails: this.teamMemberList
        }
        console.log(payload)
        //update feature changes
        // this.submitInProcess = true;
        // this.ProjectService.updateProject(payload).subscribe(
        //   (res:any)=>{
        //     this.submitInProcess = false;
        //     if(res.data.error == false){
        //       this.snackBar.successSnackBar("Project created successFully");
        //     }else{
        //       this.snackBar.errorSnackBar(res.data.message)
        //     }
          
        //   }, 
        //   error => {
        //     this.submitInProcess = false;

        //     this.snackBar.errorSnackBar("server error")
        //   }
        // )
      this.projectDetials.reset();
      this.clientDetials.reset();
      this.projectSetting.reset();
      this.projectTeam.reset();
      this.teamMemberList = []
      this.settingProjectName = ""
      this.router.navigate(['/projects/project-list']) 
      }
      else{
        this.isAddTeam = false
        this.snackBar.errorSnackBar("Add team member and role")
      }
    }
  } 
}
