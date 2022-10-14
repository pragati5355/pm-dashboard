import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '@services/auth/auth.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup,Validators} from '@angular/forms';
import { ValidationConstants } from "../../../../core/constacts/constacts";
import {ExprienceValidation} from "../../../../core/utils/Validations";
import {fuseAnimations} from '@fuse/animations';
import {CreateProjecteService} from "@services/create-projecte.service";
import {StaticData} from 'app/core/constacts/static';
import {FuseConfirmationService} from '@fuse/services/confirmation';
import {MatMenuTrigger} from '@angular/material/menu';
import {SnackBar} from '../../../../core/utils/snackBar'

@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.scss'],
  animations: fuseAnimations
})
export class ResourcesListComponent implements OnInit {
  minExprience =""
  maxExprience = ""
  exprienceForm!: FormGroup;
  startExprience: any
  endExprience: any
  configForm!: FormGroup;
  technologys = new FormControl('');
  techName: any = null;
  technologyLIst: any = [];
  pagination = false;
  searchValue = "";
  techList: string[] = []
  count = 1;
  resources: any[] = [];
  initialLoading: boolean = false;
  totalRecored: any;
  totalPerPageData = StaticData.PER_PAGE_DATA;
  allResources: any;
  updateDeleteObj: any = []
  deleteObject: any
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  constructor( private _authService: AuthService,private ProjectService: CreateProjecteService, private router: Router, private _formBuilder: FormBuilder,
              private _fuseConfirmationService: FuseConfirmationService,
              private snackBar: SnackBar,) {
  }
  get exprienceValidForm(): { [key: string]: AbstractControl } {
    return this.exprienceForm.controls;
  }
  ngOnInit(): void {
    this.exprienceForm = this._formBuilder.group({
      minExprience: ['', [ Validators.pattern(ValidationConstants.YEAR_VALIDATION)]],
      maxExprience: ['', [ Validators.pattern(ValidationConstants.YEAR_VALIDATION)]],

    },{
      validator: [
        ExprienceValidation("minExprience","maxExprience"),
    ]
    });
    let expriencePayload = [
      parseInt(this.exprienceForm.value.minExprience),
      parseInt(this.exprienceForm.value.maxExprience)
    ];
    let payload = {
      "technology": this.technologys.value.length > 0 ? this.technologys.value : null,
      "experience":(this.exprienceForm.value.minExprience.length > 0 && this.exprienceForm.value.maxExprience.length > 0) ? expriencePayload : null,
      "perPageData": this.count,
      "totalPerPageData": this.totalPerPageData,
      "name": this.searchValue
    }
    this.getList(payload);
    this.getListtechList();
    // Build the config form
    this.configForm = this._formBuilder.group({
      title: 'Delete Resource',
      message: 'Are you sure you want to delete this resource? <span class="font-medium">This action cannot be undone!</span>',
      icon: this._formBuilder.group({
        show: true,
        name: 'heroicons_outline:exclamation',
        color: 'warn'
      }),
      actions: this._formBuilder.group({
        confirm: this._formBuilder.group({
          show: true,
          label: 'Delete',
          color: 'warn'
        }),
        cancel: this._formBuilder.group({
          show: true,
          label: 'Cancel'
        })
      }),
      dismissible: false
    });
 
  }

  gotoAddResources() {
    this.router.navigate(['/resources/add-resources'])
  }

  getList(payload: any) {
    this.initialLoading = true;
    this.ProjectService.getResourceMember(payload).subscribe((res: any) => {
     if(res.data){
      this.totalRecored = res.data.totalRecored
      this.resources = res.data.teamMember;
      this.initialLoading = false;
     }else if(res.data == null){
      this.totalRecored = 0
      this.initialLoading = false;
     }else  if(res.tokenExpire == true){
      this._authService.updateAndReload(window.location);
      }
    }, error => {
      this.initialLoading = false;
    })
  }



  getListtechList() {
    this.ProjectService.getTechnology().subscribe((res: any) => {
      this.technologyLIst = res.data;
    }, error => {
    })
  }


  handleScroll() {
    if (!this.pagination) {
      this.count = this.count + this.totalPerPageData;
      let expriencePayload = [
        parseInt(this.exprienceForm.value.minExprience),
        parseInt(this.exprienceForm.value.maxExprience)
      ];
      let payload = {
        "perPageData": this.count,
        "totalPerPageData": this.totalPerPageData,
        "technology": this.technologys.value.length > 0 ? this.technologys.value : null,
        "experience": (this.exprienceForm.value.minExprience.length > 0 && this.exprienceForm.value.maxExprience.length > 0) ? expriencePayload : null,
        "name": this.searchValue
      };
      this.pagination = true;
      this.ProjectService.getResourceMember(payload).subscribe((res: any) => {
        this.pagination = false
        if (res) {
          this.resources = [...this.resources, ...res.data.teamMember];
        }
      }, (err: any) => {
        this.pagination = false;
      });
    }
  }

  selectChange() {
    this.count = 1
    this.pagination = false
    let tech = this.technologys.value?.[0];
    for (let i = 0; i < this.technologyLIst.length; i++) {
      if (this.technologyLIst[i].id === tech) {
        this.techName = this.technologyLIst[i].name;
      }
    }
    let expriencePayload = [
      parseInt(this.exprienceForm.value.minExprience),
      parseInt(this.exprienceForm.value.maxExprience)
    ];
    let payload = {
      "technology": this.technologys.value.length > 0 ? this.technologys.value : null,
      "experience":(this.exprienceForm.value.minExprience.length > 0 && this.exprienceForm.value.maxExprience.length > 0)? expriencePayload : null,
      "perPageData": this.count,
      "totalPerPageData": this.totalPerPageData,
      "name": this.searchValue
    }
    this.ProjectService.getResourceMember(payload).subscribe((res: any) => {
      this.totalRecored = res.data.totalRecored
      this.resources = res.data.teamMember;
      this.initialLoading = false;
    }, error => {
      this.initialLoading = false;
    });
  }



  inputSearch(event: any) {
    this.count = 1;
    this.pagination = false
    let expriencePayload = [
      parseInt(this.exprienceForm.value.minExprience),
      parseInt(this.exprienceForm.value.maxExprience)
    ];
    if (this.searchValue !== event.target.value.trim()) {
      this.searchValue = event.target.value.trim();
      let payload = {
        "technology": this.technologys.value.length > 0 ? this.technologys.value : null,
        "experience":(this.exprienceForm.value.minExprience.length > 0 && this.exprienceForm.value.maxExprience.length > 0) ? expriencePayload : null,
        "perPageData": this.count,
        "totalPerPageData": this.totalPerPageData,
        "name": this.searchValue
      };
      this.getList(payload);
    }
  }

  deleteResource(id: number): void {
    let payload = {
      id: id
    }
    // Open the dialog and save the reference of it
    this.ProjectService.getresource(payload).subscribe(
      (res: any) => {
        this.updateDeleteObj.push(res.data)
        this.updateDeleteObj.forEach((item: any) => {
          this.deleteObject = {
            id: id,
            createdAt: null,
            lastModifiedAt: null,
            isDeleted: true,
            firstName: item.firstName ? item.firstName : "",
            lastName: item.lastName ? item.lastName : "",
            email: item.email ? item.email : "",
            team: item.team ? item.team : "",
            month: item.month ? item.month : 0,
            year: item.year ? item.year : 0,
            technology: item.technology ? item.technology : null
          }

        })
        const dialogRef = this._fuseConfirmationService.open(this.configForm.value);

        // Subscribe to afterClosed from the dialog reference
        dialogRef.afterClosed().subscribe((result) => {
          if (result == "confirmed") {
            this.ProjectService.updateDeleteResource(this.deleteObject).subscribe(
              (res: any) => {
                this.snackBar.successSnackBar(res.data.Message)
                let expriencePayload = [
                  parseInt(this.exprienceForm.value.minExprience),
                  parseInt(this.exprienceForm.value.maxExprience)
                ];
                let payload = {
                  "technology": this.technologys.value.length > 0 ? this.technologys.value : null,
                  "experience": (this.exprienceForm.value.minExprience.length > 0 && this.exprienceForm.value.maxExprience.length > 0)? expriencePayload : null,
                  "perPageData": this.count,
                  "totalPerPageData": this.totalPerPageData,
                  "name": this.searchValue
                }
                this.getList(payload);
              },
              error => {
                this.snackBar.errorSnackBar("Server error")
              })
          }
        });
      },
      error => {

      }
    );

  }

  edit(id: number) {
    this.router.navigate(
      [`/resources/edit-resources`],
      {queryParams: {id: id}}
    );
  }

  getExprience(event: Event,type: any) {
    this.count = 1
    this.pagination = false
    if(type=="remove"){
      this.exprienceForm.patchValue({
        minExprience:"",
        maxExprience:"",
      });
    }
    if (!this.exprienceForm.invalid) {
      let expriencePayload = [
        parseInt(this.exprienceForm.value.minExprience),
        parseInt(this.exprienceForm.value.maxExprience)
      ];
      this.minExprience =this.exprienceForm.value.minExprience
      this.maxExprience = this.exprienceForm.value.maxExprience
      let payload = {
        "technology": this.technologys.value.length > 0 ? this.technologys.value : null,
        "experience":(this.exprienceForm.value.minExprience.length > 0 && this.exprienceForm.value.maxExprience.length > 0)? expriencePayload : null,
        "perPageData": this.count,
        "totalPerPageData": this.totalPerPageData,
        "name": this.searchValue
      }
      this.ProjectService.getResourceMember(payload).subscribe((res: any) => {
        if(res.data){
          this.totalRecored = res.data.totalRecored
        this.resources = res.data.teamMember;
        }else{
          this.totalRecored  = 0
        }
        
      }, error => {
        this.initialLoading = false;
      });
    }else{
      event.stopPropagation();
    }
  }
  
}
