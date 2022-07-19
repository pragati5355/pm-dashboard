import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
import {SnackBar} from '../../../../core/utils/snackBar'
@Component({
  selector: 'app-add-resources',
  templateUrl: './add-resources.component.html',
  styleUrls: ['./add-resources.component.scss']
})
export class AddResourcesComponent implements OnInit {
  submitInProcess: boolean = false;
  resourcesForm!: FormGroup;
  firstName = '';
  selectTeamList = StaticData.ROLE_LIST
  separatorKeysCodes: number[] = [ENTER, COMMA];
  technology = new FormControl('');
  filteredtechnologys: Observable<string[]>;
  technologys: string[] = [];
  alltechnologys: string[] = ['Angular', 'JaVa', 'Python', 'HTML'];
  @ViewChild('technologyInput') technologyInput!: ElementRef<HTMLInputElement>;
  snackBarConfig = new MatSnackBarConfig();
  constructor(private _formBuilder: FormBuilder, private router: Router,
    private ProjectService:CreateProjecteService,
    private _snackBar: MatSnackBar,
    ) {
    this.filteredtechnologys = this.technology.valueChanges.pipe(startWith(null), map((technology: string | null) => (technology ? this._filter(technology) : this.alltechnologys.slice())),);
      // // material snackbar config
      this.snackBarConfig.duration = 5000;
      this.snackBarConfig.horizontalPosition = "right";
      this.snackBarConfig.verticalPosition = "bottom";
  }

  get resourcesValidForm(): { [key: string]: AbstractControl } {
    return this.resourcesForm.controls;
  }

  getAvtarInit() {
    console.log(' charAt(0) - ', this.resourcesForm.value.firstName.charAt(0))
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
      technology: ['', [Validators.required, Validators.pattern(ValidationConstants.NAME_VALIDATION)]],

    },{
      validator: [
        MonthValdation("month"),
    ]
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our technology
    if (value) {
      this.technologys.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.technology.setValue(null);
  }

  remove(technology: string): void {
    const index = this.technologys.indexOf(technology);

    if (index >= 0) {
      this.technologys.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.technologys.push(event.option.viewValue);
    this.technologyInput.nativeElement.value = '';
    this.technology.setValue(null);
  }

  save() {
    console.log(this.resourcesForm.value)
  }
  submit() {
    console.log(this.technologys)
    if (!this.resourcesForm.invalid) {
      let payload = {
        firstName: this.resourcesForm.value.firstName,
        lastName:this.resourcesForm.value.lastName,
        email: this.resourcesForm.value.email,
        year:1,
        team:this.resourcesForm.value.team,
        month:2,
        technologyCtrl: this.technologys
      };
      this.submitInProcess = true;
      this.ProjectService.addresources(payload).subscribe(
        (res: any) => {
          this.submitInProcess = false;
          console.log(res)
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
  }
  gotoBack() {
    this.router.navigate(['/resources/resources-list'])
  }

  /**
   * Upload avatar
   *
   * @param fileList
   */
  uploadAvatar(): void {
    // Return if canceled

    // Upload the avatar
    // this._contactsService.uploadAvatar(this.contact.id, file).subscribe();
  }

  /**
   * Remove the avatar
   */
  removeAvatar(): void {

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.alltechnologys.filter(technology => technology.toLowerCase().includes(filterValue));
  }

}
