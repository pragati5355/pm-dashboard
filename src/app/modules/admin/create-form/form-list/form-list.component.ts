import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})
export class FormListComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }
  gotoAddForm() {
    this.router.navigate(['/forms/add-form'])
  }

}
