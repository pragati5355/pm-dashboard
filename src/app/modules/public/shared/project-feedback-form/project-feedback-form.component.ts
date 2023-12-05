import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddFormService } from '@services/add-form.service';
import { SnackBar } from 'app/core/utils/snackBar';

@Component({
  selector: 'app-project-feedback-form',
  templateUrl: './project-feedback-form.component.html',
  styleUrls: ['./project-feedback-form.component.scss']
})
export class ProjectFeedbackFormComponent implements OnInit {

  public form!: Object;
  routeSubscribe: any;
  initialLoading= false
  projectName = ""
  sprintName=""
  projectId: any
  sprintId: any
  email: any

  constructor(
    private snackBar: SnackBar,
    private formService: AddFormService,
    private _route: ActivatedRoute,
    private router: Router, 
  ) { }

  ngOnInit(): void {
  }

  getFormDetails(payload : any){

  }

  submit(event : any){

  }

}
