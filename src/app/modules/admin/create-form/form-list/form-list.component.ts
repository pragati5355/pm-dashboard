import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})
export class FormListComponent implements OnInit {

  constructor(private router: Router,) { }
   formsData = [
     {
       id: 1,
       name: "DemoForm",
       projects: "metrics"
     },
     {
      id: 2,
      name: "DashboardForm",
      projects: "Dash board"
    },
    {
      id: 3,
      name: "Mtform",
      projects: "MtDemo"
    },
    {
      id: 4,
      name: "Deom",
      projects: "Demo"
    }
   ]
   isLoading = false
  ngOnInit(): void {
  }
  gotoAddForm() {
    this.router.navigate(['/forms/add-form'])
  }
  deleteResource(event:any){

  }
  edit(event: any){

  }
}
