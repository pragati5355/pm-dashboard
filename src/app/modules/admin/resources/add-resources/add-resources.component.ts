import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationConstants } from "../../../../core/constacts/constacts";
import { StaticData } from "../../../../core/constacts/static";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import {MonthValdation} from "../../../../core/utils/Validations";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { map, startWith } from 'rxjs/operators';
import { CreateProjecteService } from '@services/create-projecte.service';
import { AuthService } from '@services/auth/auth.service';
import {SnackBar} from '../../../../core/utils/snackBar'
export class Technology {
  constructor( public id: number, public name: string) { }
}
@Component({
  selector: 'app-add-resources',
  templateUrl: './add-resources.component.html',
  styleUrls: ['./add-resources.component.scss']
})
export class AddResourcesComponent implements OnInit {
  formTypeAdd = true
  pageTitle = ""
  submitInProcess: boolean = false;
  resourcesForm!: FormGroup;
  firstName = '';
  selectTeamList = StaticData.ROLE_LIST
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  initialLoading = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  technology = new FormControl();
  filteredtechnologys: Observable<any[]> | undefined;
  technologys: any = [];
  alltechnologys: Technology[] = [];
  routeSubscribe: any;
  @ViewChild('technologyInput')
  technologyInput!: ElementRef;
  snackBarConfig = new MatSnackBarConfig();
  constructor(private _formBuilder: FormBuilder, private router: Router,
    private ProjectService:CreateProjecteService,
    private _snackBar: MatSnackBar,
    private _authService: AuthService,
    private _route: ActivatedRoute
    ) {
      this.snackBarConfig.duration = 5000;
      this.snackBarConfig.horizontalPosition = "right";
      this.snackBarConfig.verticalPosition = "bottom";
  }

  get resourcesValidForm(): { [key: string]: AbstractControl } {
    return this.resourcesForm.controls;
  }

  getAvtarInit() {
    this.resourcesForm.value.firstName.charAt(0)
  }

  ngOnInit(): void {
    this.resourcesForm = this._formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(ValidationConstants.NAME_VALIDATION)]],
      lastName: ['', [Validators.required, Validators.pattern(ValidationConstants.NAME_VALIDATION)]],
      email: ['', [Validators.required, Validators.pattern(ValidationConstants.EMAIL_VALIDATION)]],
      team: ['', [Validators.required]],
      year: ['', [Validators.pattern(ValidationConstants.YEAR_VALIDATION)]],
      month: ['', [Validators.pattern(ValidationConstants.YEAR_VALIDATION)]],
      technology: [''],

    },{
      validator: [
        MonthValdation("month"),
    ]
    });
    this.routeSubscribe = this._route.queryParams.subscribe(checkformtype => {
      if (checkformtype['id']) {
        this.resourcesForm.patchValue({
          firstName:"Sanskriti",
          lastName:"Gupta",
          email:"sanskriti@yopmail.com",
          team:'Backend Dev',
          year: 1,
          month:2,
        });
        this.firstName="sankriti"
        this.technologys = ['HTML','Java']
        this.pageTitle = "Edit Resource"
        this.formTypeAdd = false
      }else{
        this.pageTitle = "Add Resource"
        this.formTypeAdd = true
      }
    });
  
    this.getTechnology();
  }

  submit() {
    if (!this.resourcesForm.invalid) {
      if(this.technologys.length>0){
      let payload = {
        firstName: this.resourcesForm.value.firstName,
        lastName:this.resourcesForm.value.lastName,
        email: this.resourcesForm.value.email,
        year:  this.resourcesForm.value.year? this.resourcesForm.value.year: 0,
        team:this.resourcesForm.value.team,
        month:this.resourcesForm.value.month? this.resourcesForm.value.month: 0,
        technologys: this.technologys
      };
      this.submitInProcess = true;
      this.ProjectService.addresources(payload).subscribe(
        (res: any) => {
          this.submitInProcess = false;
         if(res.data.error){
          this.snackBarConfig.panelClass = ["red-snackbar"];
          this._snackBar.open(
            res.data.error,
            "x",
            this.snackBarConfig
          );
        }else{
          this.snackBarConfig.panelClass = ["success-snackbar"];
          this._snackBar.open(
            "Successfully Added",
            "x",
            this.snackBarConfig
          );
          this.resourcesForm.reset();
          this.router.navigate(['/resources/resources-list'])
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
      );
    }
      else{
        this.submitInProcess = false;
        this.snackBarConfig.panelClass = ["red-snackbar"];
        this._snackBar.open(
          "Choose technology",
          "x",
          this.snackBarConfig
        );
      }
    }
  }
  gotoBack() {
    this.router.navigate(['/resources/resources-list'])
  }
  getTechnology(){
    this.initialLoading = true;
    this.ProjectService.getTechnology().subscribe(
      (res: any) => {
        this.submitInProcess = false;
        this.alltechnologys = res.data
       this.filteredtechnologys = this.resourcesForm.get('technology')?.valueChanges
       .pipe(
         startWith(''),
         map((technology: any |null) => technology ?  this._filter(technology) : this._filterslice()));
         this.initialLoading = false;
         if(res.data.error){
          this._authService.updateToken().subscribe(
            (res: any) => {
              this._authService.setToken(res.data.accessToken);
            })
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
    );
  }
  _filter(value: any) {
    return this.alltechnologys.filter((alltechnologys: any) =>
    alltechnologys.name.toLowerCase().indexOf(value) === 0  && !this.technologys.includes(alltechnologys.name));
  }
  _filterslice() {
    return this.alltechnologys.filter(alltechnologys =>  !this.technologys.includes(alltechnologys.name))
  }
  add(event: MatChipInputEvent): void {
    debugger
    const input = event.input;
    const value = event.value;
    // Add our technology
    if ((value || '').trim()) {
      this.technologys.push({
        id:Math.random(),
        name:value.trim()
      });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.technology.setValue('');
    this.resourcesForm.get('technology')?.setValue('');
  }

  remove(technology: any, selectIndex: any): void {
    this.technologys.splice(selectIndex, 1);
    this.resourcesForm.get('technology')?.setValue('');
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.technologys.push(event.option.value);
    this.technologyInput.nativeElement.value = '';
    this.technology.setValue('');
    this.resourcesForm.get('technology')?.setValue('');
  }
  /**
   * Upload avatar
   *
   * @param fileList
   */
  uploadAvatar(): void {
    // Return if canceled
  }

  /**
   * Remove the avatar
   */
  removeAvatar(): void {

  }

}
