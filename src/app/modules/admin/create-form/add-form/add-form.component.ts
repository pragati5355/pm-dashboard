import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {SnackBar} from '../../../../core/utils/snackBar'
import { Subject } from 'rxjs';

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
  constructor(private snackBar: SnackBar,) { }

  ngOnInit(): void {
    // this.options = ;
    this.form = {components: [
      {
        type: 'number',
        key: 'technicalRating',
        label: 'Technical Rating',
        tooltip: "",
      },
      {
        type: 'number',
        key: 'communicationRating',
        label: 'Communication Rating'
      },
      {
        type: 'number',
        key: 'understandingRating',
        label: 'Understanding Rating'
      },
      {
        type: 'button',
        label: 'submit',
        theme: "primary",
        key: 'submit',
        input: true,
        tableview: false,
        disableOnInvalid: true,
      }
    ]};
  }
  onSubmit(event: any) {
    alert('form submitted!')
  }

  onChange(event:any) {
    this.jsonElement.nativeElement.innerHTML = '';
    this.jsonElement.nativeElement.appendChild(document.createTextNode(JSON.stringify(event.form, null, 4)));
    console.log(this.form)
  }
  guardarFormulario(){
    this.jsonElement.nativeElement.innerHTML = '';
    this.jsonElement.nativeElement.appendChild(document.createTextNode(JSON.stringify(this.formio.form, null, 4)));
     console.log(this.formdata.name)
    const json = document.createTextNode(JSON.stringify(this.formio.form, null, 4));
    console.log(Object.values(this.form).map(v => v.length))
    console.log(Object.keys(this.form).length)
    let payload = {
      formname: this.formdata.name,
      formcomponent: json
    }
    if(this.formdata.name){
      if(Object.values(this.form).map(v => v.length)[0]== 0){

        this.snackBar.errorSnackBar("Add form component")
      }else{
      }
   
    }else{
      this.snackBar.errorSnackBar("Enter form name")
    }
  }
}
