import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {SnackBar} from '../../../../core/utils/snackBar'
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AddFormService } from '@services/add-form.service';
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
  public form!: Object;
  public options: any;
  public language!: string;
  public rebuildEmitter: Subject<void> = new Subject<void>();
  formdata = {name:""}
  formDetails!: FormGroup;
  constructor(private snackBar: SnackBar, private formService: AddFormService, 
    private _route: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder,) { }
  get formDetailsValidation(): { [key: string]: AbstractControl } {
    return this.formDetails.controls;
  }
  ngOnInit(): void {
    // this.options = ;
    this.formDetails = this._formBuilder.group({
      formName: ['',[Validators.required]],
      });
    this.form = {components: [
     ]};
  }
  onSubmit(event: any) {
    alert('form submitted!')
  }

  onChange(event:any) {
    this.jsonElement.nativeElement.innerHTML = '';
    this.jsonElement.nativeElement.appendChild(document.createTextNode(JSON.stringify(event.form, null, 4)));
  }
  guardarFormulario(){
    const json = document.createTextNode(JSON.stringify(this.formio.form, null, 4));
    let payload = {
      formName: this.formdata.name,
      formComponent: this.form
    }
    if(this.formdata.name){
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
}
