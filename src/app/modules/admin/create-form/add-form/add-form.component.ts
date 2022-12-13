import { Component, ElementRef, OnInit, ViewChild, EventEmitter, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AddFormService } from '@services/add-form.service';
import { AuthService } from '@services/auth/auth.service';
import {SnackBar} from '../../../../core/utils/snackBar';
import { ErrorMessage } from 'app/core/constacts/constacts'
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { CreateProjecteService } from '@services/create-projecte.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Formio } from 'angular-formio';
@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html'
})
export class AddFormComponent implements OnInit {
  @HostListener("window:beforeunload", ["$event"])
  public onPageUnload($event: BeforeUnloadEvent) {
    if (!this.canExit()) {
      $event.returnValue = true;
    }
  }
  @ViewChild('json', {static: true}) jsonElement?: ElementRef | any;
  @ViewChild('formio') formio:any;
  pageTitle= ""
  formTypeAdd = true
  public form: Object |any;
  public options: any;
  public language!: string;
  activeCustomers = [
    {"label":"Survey","labelPosition":"top","description":"","tooltip":"fjlkdjf fsdaflkj","customClass":"inputclasstest","tabindex":"","hidden":false,"hideLabel":false,"autofocus":false,"disabled":false,"tableView":false,"modalEdit":false,"questions":[{"label":"sans","value":"sans","tooltip":""},{"label":"vis","value":"vis","tooltip":""}],"values":[{"label":"1","value":"1","tooltip":""},{"label":"1","value":"1","tooltip":""}],"persistent":true,"protected":false,"dbIndex":false,"encrypted":false,"redrawOn":"","clearOnHide":true,"customDefaultValue":"","calculateValue":"","calculateServer":false,"allowCalculateOverride":false,"validate":{"required":false,"customMessage":"","custom":"","customPrivate":false,"json":"","strictDateValidation":false,"multiple":false,"unique":false},"unique":false,"errorLabel":"","errors":"","key":"survey","tags":[],"properties":{},"conditional":{"show":null,"when":null,"eq":"","json":""},"customConditional":"","logic":[],"attributes":{},"overlay":{"style":"","page":"","left":"","top":"","width":"","height":""},"type":"survey","input":true,"placeholder":"","prefix":"","suffix":"","multiple":false,"refreshOn":"","dataGridLabel":false,"widget":null,"validateOn":"change","showCharCount":false,"showWordCount":false,"allowMultipleMasks":false,"addons":[],"id":"customserveyinput","defaultValue":{}},
  ];
teammemberQuestion: any = []
  refreshForm: any
  public rebuildEmitter: Subject<void> = new Subject<void>();
  formName = ""
  formDetails!: FormGroup;
  editFormId = 0
  routeSubscribe: any;
  initialLoading = false
  selectFomList: any = [];
  constructor(private snackBar: SnackBar, private formService: AddFormService, 
    private _route: ActivatedRoute,
    private router: Router,
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private ProjectService:CreateProjecteService,
    private el: ElementRef) { }
  get formDetailsValidation(): { [key: string]: AbstractControl } {
    return this.formDetails.controls;
  }
  ngOnInit(): void {
    this.formDetails = this._formBuilder.group({
      formName: ['',[Validators.required]],
      project_name: ['',[Validators.required]],
      });
    this.form = {components: []};
    this.routeSubscribe = this._route.queryParams.subscribe(formtype => {
      if (formtype['id']) {
          this.getFormDetails({id:formtype['id']})
          this.editFormId = formtype['id']
        this.pageTitle = "Edit Form"
        this.formTypeAdd = false
      }else{
        this.pageTitle = "Add Form"
        this.formTypeAdd = true
      }
    });
    this.refreshForm = new EventEmitter();
    this.getProjectList();
  }
  onSubmit(event: any) {
    alert('form submitted!')
  }

  onChange(event:any) {
    this.jsonElement.nativeElement.innerHTML = '';
    this.jsonElement.nativeElement.appendChild(document.createTextNode(JSON.stringify(event.form, null, 4)));
  }
  addForm(){
    const json = document.createTextNode(JSON.stringify(this.formio.form, null, 4));
    let payload = {
      formName: this.formDetails.value.formName,
      formComponent: this.form
    }
    let formcompoent: [] = this.form?.components
    if(this.formDetails.value.formName){
      if(formcompoent.length <= 1){
        this.snackBar.errorSnackBar("Add form component")
      }else{
        this.formService.addForm(payload).subscribe((res: any)=>{
           if(!res.error){
             if(res.message == "Success"){
               this.snackBar.successSnackBar(res.data)
             }else{
              this.snackBar.errorSnackBar(res.data)
             }
           }
           this.router.navigate(['/forms/form-list']) 
        })
      }  
    }else{
      this.snackBar.errorSnackBar("Enter form name")
    }
  }
  updateForm(){
    const json = document.createTextNode(JSON.stringify(this.formio.form, null, 4));
    let payload = {
      id: this.editFormId,
      formName: this.formDetails.value.formName,
      formComponent: this.form
    }
    let formcompoent: [] = this.form?.components
    if(this.formDetails.value.formName){
      if(formcompoent.length <= 1){
          
        this.snackBar.errorSnackBar("Add form component")
      }else{
        this.formService.updateForm(payload).subscribe((res: any)=>{
             if(!res.error){
               this.snackBar.successSnackBar(res.data.message)
               this.router.navigate(['/forms/form-list']) 
             }else{
              this.snackBar.errorSnackBar(res.data.message)
             }
             if(res.tokenExpire == true){
              this.snackBar.errorSnackBar(ErrorMessage.ERROR_SOMETHING_WENT_WRONG);
              this._authService.updateAndReload(window.location);
              }
        })
      }  
    }else{
      this.snackBar.errorSnackBar("Enter form name")
    }
  }
  getFormDetails(payload: any){
    this.initialLoading = true;
    this.formService.getFormDetails(payload).subscribe((res: any) =>{
      this.initialLoading = false;
      let formdata: any = []
      formdata.push(res.data)
      formdata.forEach((item: any) => {
      this.formDetails.patchValue({
        formName:item.formName,
      });
       this.form = item.formComponent
    })
    })
  }
  drop(event: CdkDragDrop<any[]>){
    let data = {"label":"Survey","labelPosition":"top","description":"","tooltip":"","customClass":"surveyCopmonent","tabindex":"","hidden":false,"hideLabel":false,"autofocus":false,"disabled":false,"tableView":false,"modalEdit":false,"questions":this.teammemberQuestion,
    "values":[{"label":"Excellent","value":5,"tooltip":""},
    {"label":"Great","value":4,"tooltip":""},
    {"label":"Good","value":3,"tooltip":""},
    {"label":"Average","value":2,"tooltip":""},
    {"label":"Poor","value":1,"tooltip":""}],"persistent":true,"protected":false,"dbIndex":false,"encrypted":false,"redrawOn":"","clearOnHide":true,"customDefaultValue":"","calculateValue":"","calculateServer":false,"allowCalculateOverride":false,"validate":{"required":false,"customMessage":"","custom":"","customPrivate":false,"json":"","strictDateValidation":false,"multiple":false,"unique":false},"unique":false,"errorLabel":"","errors":"","key":"survey","tags":[],"properties":{},"conditional":{"show":null,"when":null,"eq":"","json":""},"customConditional":"","logic":[],"attributes":{},"overlay":{"style":"","page":"","left":"","top":"","width":"","height":""},"type":"survey","input":true,"placeholder":"","prefix":"","suffix":"","multiple":false,"refreshOn":"","dataGridLabel":false,"widget":null,"validateOn":"change","showCharCount":false,"showWordCount":false,"allowMultipleMasks":false,"addons":[],"id":"surveyComponentId","defaultValue":{}}
    let indexvalue = 0
    if(this.form.components.length > 0){
      indexvalue = this.form.components.length-1
    }
    this.form.components.splice(indexvalue,0,data)
    this.refreshForm.emit({
      form: this.form
    });
    
  }
  getProjectList(){
    this.initialLoading = true
    this.ProjectService.getProjectListWithoutPagination().subscribe((res:any)=>{
          this.selectFomList= res.data
          this.initialLoading = false;
      if(res.tokenExpire == true){
        this._authService.updateAndReload(window.location);
        }
    })
  }
  getTeamMemberList(payload: any) {
    this.ProjectService.getTeamMemberList(payload).subscribe((res: any) => {
      let teamMember = res.data;

      this.teammemberQuestion = [];
      teamMember.forEach((item: any)=>{
        this.teammemberQuestion = [
          ...this.teammemberQuestion,
          {
            "label": item.name,
            "value": item.id,
            "tooltip": "",
          }
        ];
      })
      if(this.form.components.length> 1){
        let surveyCompoenent : any[] = this.form.components.filter((item: any) => item.customClass == "surveyCopmonent");
        this.form.components =this.form.components.filter((item: any) => item.customClass !== "surveyCopmonent");
        surveyCompoenent.forEach((element:any,i: any)=>{
          element.questions = this.teammemberQuestion
          let indexvalue = 0
          if(this.form.components.length > 0){
            indexvalue = this.form.components.length-1
          }
          this.form.components.splice(indexvalue,0,element);
        })
        this.refreshForm.emit({
          form: this.form
        });
      }
      this.initialLoading = false;
    }, error => {
      this.initialLoading = false;
    })
    
  }
  selectchange(event: any){
    let payload = {
      "id": event.value
    }
    this.getTeamMemberList(payload);
  }
  canExit(): boolean {
    if (!this.formDetails.pristine) {
      return false;
    }
    return true;
  }
}
