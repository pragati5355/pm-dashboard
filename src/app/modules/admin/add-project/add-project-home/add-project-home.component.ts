import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation, HostListener } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationConstants } from "../../../../core/constacts/constacts";
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
  constructor(public name: string, public id: string) { }
}
export class JiraUser {
  constructor(public name: string, public id: string) { }
}
@Component({
  selector: 'app-add-project-home',
  templateUrl: './add-project-home.component.html',
  styleUrls: ['./add-project-home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddProjectHomeComponent implements OnInit, OnDestroy {
  // @HostListener("window:beforeunload", ["$event"])
  // public onPageUnload($event: BeforeUnloadEvent) {
  //   if (!this.canExit()) {
  //     $event.returnValue = true;
  //   }
  // }
  
  snackBarConfig = new MatSnackBarConfig();
  @ViewChild("stepper", { static: false }) stepper!: MatStepper;
    @ViewChild('drawer') drawer!: MatDrawer;
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
    teamMemberList: any = [];
    filteredTeamMembers!: Observable<any[]> | undefined;
    filteredJiraUsers!: Observable<any[]> | undefined;
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
    teamMembers: TeamMember[] =  [
      {
        name: 'Sanskriti',
        id: '2',
    
      },
      {
        name: 'Suraj',
        id: '39',
       
      },
      {
        name: 'Vishvajit',
        id: '20',
       
      },
      {
        name: 'Rushikesh',
        id: '27',
        
      }
    ];
    jiraUsers: JiraUser[] =  [
      {
        name: 'Sanskriti',
        id: '2',
    
      },
      {
        name: 'Suraj',
        id: '39',
       
      },
      {
        name: 'Vishvajit',
        id: '20',
       
      },
      {
        name: 'Rushikesh',
        id: '27',
        
      }
    ];
    userData: any;
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
          team_member: ['',[
            Validators.pattern(ValidationConstants.NAME_VALIDATION)]],
          select_role: [''],
          jira_user: ['',[Validators.required,
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
        map(teamMember => teamMember ? this.filterTeamMembers(teamMember) : this.teamMembers.slice())
      );
      this.filteredJiraUsers = this.projectTeam.get('jira_user')?.valueChanges
      .pipe(
        startWith(''),
        map(jiraUser => jiraUser ? this.filterJiraUsers(jiraUser) : this.jiraUsers.slice())
      );
            // console.log(this.stepper.steps)
    }
    filterTeamMembers(name: string) {
      return this.teamMembers.filter((teamMember: any) =>
      teamMember.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }
    filterJiraUsers(name: string) {
      return this.jiraUsers.filter((JiraUser: any) =>
        JiraUser.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }
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
        this.showStep = 4
      }
    }
    public selectionChange($event: any): void {
      console.log('stepper.selectedIndex: ' + this.selectedIndex 
          + '; $event.selectedIndex: ' + $event.selectedIndex);
      if($event.selectedIndex == 0){
          this.showStep = 1
        }else if($event.selectedIndex == 1){
          this.showStep = 2
        }else if($event.selectedIndex == 2){
          this.showStep = 3
        }else if($event.selectedIndex == 3){
          this.showStep = 4
        }
      this.selectedIndex = $event.selectedIndex;
    }
    public goto(index: number): void {
      console.log('stepper.selectedIndex: ' + this.selectedIndex 
          + '; goto index: ' + index);
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
          this.submitInProcess = false;
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
        }else{
          this.submitInProcess = false;
          this.snackBarConfig.panelClass = ["red-snackbar"];
          this._snackBar.open(
            "Token is invalid or expired.",
            "x",
            this.snackBarConfig
          );
        }
          
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

    }
    addTeamMember() {
      console.log( this.projectTeam.value.team_member)
      if (
        this.projectTeam.value.team_member &&
        this.projectTeam.value.select_role
      ) {
        this.teamMemberList = [
          ...this.teamMemberList,
          {
            team_member: this.projectTeam.value
              .team_member,
            select_role: this.projectTeam.value.select_role
          }
        ];
        this.projectTeam.controls["team_member"].reset();
        this.projectTeam.controls["select_role"].reset();
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
      }
    }
    submitProjectSetting(){
      if (!this.projectSetting.invalid) {
              this.selectedIndex = 3
      }
      console.log(this.projectSetting.value.project)
    }
    createProject(){
      if (!this.projectTeam.invalid) {
        if(this.teamMemberList.length > 0){
        let payload ={
          projectDetails:{
            projectName: this.projectDetials.value.projectName,
            projectDesc: this.projectDetials.value.projectDescription
          },
          clientDetails: [
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
          ],
          baseUrl:"https://"+ this.projectSetting.value.url+".atlassian.net",
          adminEmail: this.projectSetting.value.email,
          apiKey: this.projectSetting.value.token,
          orgId: 1,
          addedBy: 2,
          jiraProjectKey: this.projectSetting.value.project,  
          teamDetails:[
            this.teamMemberList
          ]   
        }
        let payload2 = 
          {
            projectDetails: {
                
              key: this.projectSetting.value.token,
              name: this.projectDetials.value.projectName,
              entityId: null,
              uuid: null,
              orgId: null,
              private: false,
              id: "10000"
                  
            },
            clientDetails: [
              {
                firstName: this.clientDetials.value.firstName,
                lastName: this.clientDetials.value.lastName
              }
            ],
            baseUrl: "https://"+ this.projectSetting.value.url+".atlassian.net",
            apiKey:  this.projectSetting.value.token,
            adminEmail: this.projectSetting.value.email,
            orgId: 1,
            addedBy: this.userData.userId,
            jiraProjectKey: "MT",
            teamDetails: this.teamMemberList
          }
          this.submitInProcess = true;
          this.ProjectService.syncJira(payload2).subscribe(
            (res:any)=>{
              this.submitInProcess = false;
              console.log(res);    
              this.snackBarConfig.panelClass = ["red-snackbar"];
              this._snackBar.open(
                "sync successfully",
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
          this.ProjectService.workLog(payload2).subscribe(
            (res:any)=>{
              this.submitInProcess = false;
              console.log(res);         
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
        console.log(payload)
        this.projectDetials.reset();
        this.clientDetials.reset();
        this.projectSetting.reset();
        this.projectTeam.reset();
        this.teamMemberList = []
        this.settingProjectName = ""
        this.router.navigate(['/projects/project-list']) 
        }
        else{
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
    // canExit(): boolean {
    //   if (!this.projectDetials.pristine) {
    //     return false;
    //   }
    //   return true;
    // }
}
