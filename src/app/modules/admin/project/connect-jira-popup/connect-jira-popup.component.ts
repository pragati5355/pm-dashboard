import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
export interface DialogData {
  resend: any;
}
@Component({
  selector: 'app-connect-jira-popup',
  templateUrl: './connect-jira-popup.component.html',
  styleUrls: ['./connect-jira-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConnectJiraPopupComponent implements OnInit
{
  project_name = "";
  connectJiraForm!: FormGroup;
    list: any = [];
  
    selection = [
      { id: 1, name: 'Metrics'},
      { id: 2, name: 'ChatBiopsy'},
    ];
    constructor(
        public matDialogRef: MatDialogRef<ConnectJiraPopupComponent>,
        private _formBuilder: FormBuilder,
        private _authService: AuthService,
        @Inject(MAT_DIALOG_DATA) public data:any
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
        // Create the form
        this.connectJiraForm = this._formBuilder.group({
          name: ['BL',[Validators.required]],
        });
        this.list = this.data.projectList
        this.project_name = this.data.settingProjectName
        console.log(this.data)
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
      /**
     * Save and close
     */
       saveAndClose(): void
       {
           // Save the message as a draft
   
           // Close the dialog
           this.matDialogRef.close();
       }
    /**
     * Send the message
     */
    send(): void
    { 
      // console.log(this.connectJiraForm.value)
      // let payload ={
      //   url: this.connectJiraForm.value.url,
      //   email: this.connectJiraForm.value.email,
      //   password: this.connectJiraForm.value.password     
      // }
      // console.log(payload)
      // this._authService.connectJira(payload).subscribe(
      //   (res:any)=>{
      //     console.log(res);
                 
          
      //   },
      // )
       this.list = [
        { id: 1, name: 'Metrics'},
        { id: 2, name: 'ChatBiopsy'},
        { id: 3, name: 'Beacon Learning'},
      ];
    }


    getSelection(item: any) {
      return this.selection.findIndex(s => s.id === item.id) !== -1;
    }
  
    changeHandler(item: any) {
      const id = item.id;
  
      const index = this.selection.findIndex(u => u.id === id);
      if (index === -1) {
        // ADD TO SELECTION
        // this.selection.push(item);
        this.selection = [...this.selection, item];
      } else {
        // REMOVE FROM SELECTION
        this.selection = this.selection.filter(user => user.id !== item.id)
        // this.selection.splice(index, 1)
      }
    }
  
    save() {
      // this.matDialogRef.close();
     
      console.log( this.connectJiraForm.value.name);
      this.matDialogRef.close({
        project: this.connectJiraForm.value.name
      });
      console.log(this.project_name);
    }
    close(){
      this.matDialogRef.close();
    }
}
