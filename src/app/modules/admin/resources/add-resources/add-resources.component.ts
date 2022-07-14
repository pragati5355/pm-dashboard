import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationConstants } from "../../../../core/constacts/constacts";
import { StaticData } from "../../../../core/constacts/static";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
@Component({
  selector: 'app-add-resources',
  templateUrl: './add-resources.component.html',
  styleUrls: ['./add-resources.component.scss']
})
export class AddResourcesComponent implements OnInit {
  resourcesForm!: FormGroup;
  get resourcesValidForm(): { [key: string]: AbstractControl } {
    return this.resourcesForm.controls;
  }
  selectTeamList= StaticData.ROLE_LIST

  separatorKeysCodes: number[] = [ENTER, COMMA];
  technology = new FormControl('');
  filteredtechnologys: Observable<string[]>;
  technologys: string[] = [];
  alltechnologys: string[] = ['Angular', 'JaVa', 'Python', 'HTML'];

  @ViewChild('technologyInput')
  technologyInput!: ElementRef<HTMLInputElement>;
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
  ) { 
    this.filteredtechnologys = this.technology.valueChanges.pipe(
      startWith(null),
      map((technology: string | null) => (technology ? this._filter(technology) : this.alltechnologys.slice())),
    );
  }

  ngOnInit(): void {
    this.resourcesForm = this._formBuilder.group({
      firstName: ['',[Validators.required,
        Validators.pattern(ValidationConstants.NAME_VALIDATION)]],
        lastName: ['',[Validators.required,
          Validators.pattern(ValidationConstants.NAME_VALIDATION)]],
        email: ['',[Validators.required,
          Validators.pattern(ValidationConstants.EMAIL_VALIDATION)]],
      team: ['',[
        Validators.required]],
      year: ['',[Validators.pattern(ValidationConstants.YEAR_VALIDATION)]],
      month: ['',[Validators.pattern(ValidationConstants.YEAR_VALIDATION)]],
      technology: ['',[Validators.required,
        Validators.pattern(ValidationConstants.NAME_VALIDATION)]],
      
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.alltechnologys.filter(technology => technology.toLowerCase().includes(filterValue));
  }
  save(){
    console.log(this.resourcesForm.value)
  }
  gotoBack(){
    this.router.navigate(['/resources/resources-list']) 
   }
       /**
     * Upload avatar
     *
     * @param fileList
     */
        uploadAvatar(): void
        {
            // Return if canceled
         
            // Upload the avatar
            // this._contactsService.uploadAvatar(this.contact.id, file).subscribe();
        }
    
        /**
         * Remove the avatar
         */
        removeAvatar(): void
        {
        
        }
    
}
