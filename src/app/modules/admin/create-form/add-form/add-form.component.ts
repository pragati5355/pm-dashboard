import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  constructor() { }

  ngOnInit(): void {
    // this.options = ;
    this.form = {components: []};
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
    console.log(json)
  }
}
