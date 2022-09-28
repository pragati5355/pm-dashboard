import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit {
  @ViewChild('json', {static: true}) jsonElement?: ElementRef | any;
  @ViewChild('formio') formio:any;
  pageTitle= ""
  formTypeAdd = true
  public form!: Object;
  public options: any;
  public language!: string;
  public rebuildEmitter: Subject<void> = new Subject<void>();
  formName = ""
  formDetails!: FormGroup;
  editFormId = 0
  routeSubscribe: any;
  initialLoading = false
  constructor(private snackBar: SnackBar, private formService: AddFormService, 
    private _route: ActivatedRoute,
    private router: Router,
    private _authService: AuthService,
    private _formBuilder: FormBuilder,) { }
  get formDetailsValidation(): { [key: string]: AbstractControl } {
    return this.formDetails.controls;
  }
  ngOnInit(): void {
    // this.options = 
    this.formDetails = this._formBuilder.group({
      formName: ['',[Validators.required]],
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
    if(this.formDetails.value.formName){
      if(Object.values(this.form).map(v => v.length)[0]== 1){
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
    if(this.formDetails.value.formName){
      if(Object.values(this.form).map(v => v.length)[0]== 1){
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
}
