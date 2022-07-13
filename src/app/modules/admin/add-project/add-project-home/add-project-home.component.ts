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
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@services/auth/auth.service';
import { CreateProjecteService } from '@services/create-projecte.service';
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { ConnectJiraPopupComponent } from '@modules/admin/project/connect-jira-popup/connect-jira-popup.component';
export class TeamMember {
  constructor(public firstName: string, public lastName: string,  public id: string, public email: string, public team: string ) { }
}
export class ManagerList {
  constructor(public firstName: string, public lastName: string,  public id: string, public email: string, public team: string ) { }
}
export class JiraUser {
  constructor( public accountId: string, public accountType: string, public active: boolean, public avatarUrl: any, public displayName: string, public orgId:any) { }
}
export class JiraTeamUser {
  constructor( public accountId: string, public accountType: string, public active: boolean, public avatarUrl: any, public displayName: string, public orgId:any) { }
}
@Component({
  selector: 'app-add-project-home',
  templateUrl: './add-project-home.component.html',
  styleUrls: ['./add-project-home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {'window:beforeunload':'doSomething'}
})
export class AddProjectHomeComponent implements OnInit, OnDestroy {

  snackBarConfig = new MatSnackBarConfig();
  @ViewChild("stepper", { static: false }) stepper!: MatStepper;
    @ViewChild('drawer') drawer!: MatDrawer;
    selectJiraUser = ""
    selectManager= ""
    teamJiraUser=false
    isAddTeam = true
    selectedIndex = 0;
    showStep = 1
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
    selectRoleList= StaticData.ROLE_LIST
    teamMemberList: any = [];
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
    constructor(private _fuseMediaWatcherService: FuseMediaWatcherService,private _matStepperIntl: MatStepperIntl,
      private _formBuilder: FormBuilder,
      private _authService: AuthService,
      private dialog: MatDialog,
      private _snackBar: MatSnackBar,
      private router: Router,
      private ProjectService:CreateProjecteService
      
      )
    {
        // // material snackbar config
        this.snackBarConfig.duration = 5000;
        this.snackBarConfig.horizontalPosition = "right";
        this.snackBarConfig.verticalPosition = "bottom";
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
      this.getTeamMember()
      this.userData = this._authService.getUser();
      this.projectDetials = this._formBuilder.group({
      projectName: ['',[Validators.required,
        Validators.pattern(ValidationConstants.NAME_VALIDATION)]],
      projectDescription: ['',[Validators.required]]
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
          project_manager: ['',[Validators.required,
            Validators.pattern(ValidationConstants.NAME_VALIDATION)]],
            jira_user: ['',[Validators.required,
              Validators.pattern(ValidationConstants.NAME_VALIDATION)]],
          team_member: ['',[
            Validators.pattern(ValidationConstants.NAME_VALIDATION)]],
          select_role: [''],
          team_jira_user: ['',[
            Validators.pattern(ValidationConstants.NAME_VALIDATION)]],
          
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
    filterTeamMembers(firstName: string) {
      return this.teamMembers.filter((teamMember: any) =>
      teamMember.firstName.toLowerCase().indexOf(firstName.toLowerCase()) === 0 && !this.selectedTeamMember.includes(teamMember.firstName) &&  teamMember.firstName !== this.projectTeam.value.project_manager);
    }
    filterTeamMemberSlice() {
      console.log(this.teamMembers.filter(TeamMember => !this.selectedTeamMember.includes(TeamMember.firstName)  &&  TeamMember.firstName !== this.projectTeam.value.project_manager))
      return this.teamMembers.filter(TeamMember => !this.selectedTeamMember.includes(TeamMember.firstName)  &&  TeamMember.firstName !== this.projectTeam.value.project_manager)
    }
    filterManagerLists(firstName: string) {
      return this.managerLists.filter((ManagerList: any) =>
      ManagerList.firstName.toLowerCase().indexOf(firstName.toLowerCase()) === 0  && !this.selectedTeamMember.includes(ManagerList.firstName) &&  ManagerList.firstName !== this.projectTeam.value.project_manager);
    }
    filterManagerListsSlice() {
      console.log(this.managerLists.filter(ManagerList => !this.selectedTeamMember.includes(ManagerList.firstName) && !this.selectedTeamMember.includes(ManagerList.firstName) &&  ManagerList.firstName !== this.projectTeam.value.project_manager))
      return this.managerLists.filter(ManagerList => !this.selectedTeamMember.includes(ManagerList.firstName) && !this.selectedTeamMember.includes(ManagerList.firstName) &&  ManagerList.firstName !== this.projectTeam.value.project_manager)
    }
    filterJiraUsers(displayName: string) {
      return this.jiraUsers.filter((JiraUser: any) =>
        JiraUser.displayName.toLowerCase().indexOf(displayName.toLowerCase()) === 0 && !this.selectedJiraUser.includes(JiraUser.displayName));
    }
    filterJiraUsersSlice() {
      return this.jiraUsers.filter(JiraUser => !this.selectedJiraUser.includes(JiraUser.displayName) && !this.selectedJiraUser.includes(JiraUser.displayName))
    }
    filterTeamJiraUsers(displayName: string) {

      return this.jiraTeamUsers.filter((JiraTeamUser: any) =>
        JiraTeamUser.displayName.toLowerCase().indexOf(displayName.toLowerCase()) === 0 && !this.selectedJiraUser.includes(JiraTeamUser.displayName) &&  JiraTeamUser.displayName !== this.projectTeam.value.jira_user);
    }
    filterTeamJiraUsersSlice() {
      return this.jiraTeamUsers.filter(JiraTeamUser => !this.selectedJiraUser.includes(JiraTeamUser.displayName) && !this.selectedJiraUser.includes(JiraTeamUser.displayName) &&  JiraTeamUser.displayName !== this.projectTeam.value.jira_user)
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
      console.log(payload)
      
      this._authService.connectJira(payload).subscribe(
        (res:any)=>{
          // this.submitInProcess = false;
          console.log(res);
        if(res.data.length>0){
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
          this.ProjectService.getJiraUser(payload).subscribe(
            (res:any)=>{
              this.submitInProcess = false;
              if(res.data.length>0){
               this.jiraUsers = res.data
                this.jiraTeamUsers = res.data
            }else{
              this.submitInProcess = false;
              if(res.data.error){
                this.snackBarConfig.panelClass = ["red-snackbar"];
                this._snackBar.open(
                  res.data.error,
                  "x",
                  this.snackBarConfig
                );
              }
             else{
              this.snackBarConfig.panelClass = ["red-snackbar"];
              this._snackBar.open(
                "Jira user not found",
                "x",
                this.snackBarConfig
              );
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
            this.snackBarConfig.panelClass = ["red-snackbar"];
            this._snackBar.open(
              res.data.error,
              "x",
              this.snackBarConfig
            );
          }
         else{
          this.snackBarConfig.panelClass = ["red-snackbar"];
          this._snackBar.open(
            "Jira user not found",
            "x",
            this.snackBarConfig
          );
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
      console.log( this.projectTeam.value.team_member)
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
            name: this.projectTeam.value
              .team_member,
            role: this.projectTeam.value.select_role,
            jiraUser: this.projectTeam.value.team_jira_user,
            isManager: false
          }
        ];
        this.selectedJiraUser = [  ...this.selectedJiraUser, this.projectTeam.value.team_jira_user]
        this.selectedTeamMember = [  ...this.selectedTeamMember, this.projectTeam.value.team_member]
        console.log(this.selectedTeamMember)
        this.projectTeam.controls["team_member"].reset();
        this.projectTeam.controls["select_role"].reset();
        this.projectTeam.controls["team_jira_user"].reset();
        console.log(this.teamMemberList)
      }
    }
    deleteTeamMember(index: any) {
      this.teamMemberList.splice(index, 1);
      this.projectTeam.controls["team_member"].reset();
      this.projectTeam.controls["select_role"].reset();
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
              this.clientDtailsList = this.clientDtailsList.filter((item: any) => item.firstName !== '' || item.lastName !== '' )
      }
    }
    submitProjectSetting(){
      if (!this.projectSetting.invalid) {
              this.selectedIndex = 3
      }
      console.log(this.projectSetting.value.project)
    }
    createProject(){
      this.teamMemberList = [
        ...this.teamMemberList,
        {
          name: this.projectTeam.value.project_manager ,
          role: "MANAGER",
          jiraUser: this.projectTeam.value.jira_user,
          isManager: true
        }
      ];
      console.log(this.teamMemberList);
      if (!this.projectTeam.invalid) {
        if(this.teamMemberList.length > 0){
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
          this.ProjectService.syncJira(payload).subscribe(
            (res:any)=>{
              this.submitInProcess = false;
              console.log(res);  
              this.snackBarConfig.panelClass = ["success-snackbar"];  
              this._snackBar.open(
                "Jira sync successfully",
                "x",
                this.snackBarConfig
              );    
            }, 
            error => {
              this.submitInProcess = false;
              this.snackBarConfig.panelClass = ["red-snackbar"];
              this._snackBar.open(
                "server error",
                "x",
                this.snackBarConfig
              );
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
          console.log(this.isAddTeam)
          this.snackBarConfig.panelClass = ["red-snackbar"];
          this._snackBar.open(
            "Add team member and role",
            "x",
            this.snackBarConfig
          );
          
        }
      }
    }   
    goToList(){
      this.router.navigate(['/projects/project-list']) 
    }
    getTeamMember(){
            this.ProjectService.getTeamMember().subscribe(
              (res:any)=>{
                this.submitInProcess = false;
                console.log("teamMember",res);
                this.teamMembers = res.data
                this.managerLists = res.data
                
              }, 
              error => {
                this.submitInProcess = false;
                this.snackBarConfig.panelClass = ["red-snackbar"];
                this._snackBar.open(
                  "Server error",
                  "x",
                  this.snackBarConfig
                );
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
     console.log("hello")
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
}
