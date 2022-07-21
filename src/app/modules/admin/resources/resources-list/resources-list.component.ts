import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {fuseAnimations} from '@fuse/animations';
import {CreateProjecteService} from "@services/create-projecte.service";
import {StaticData} from 'app/core/constacts/static';
import {FuseConfirmationService} from '@fuse/services/confirmation';

@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.scss'],
  animations: fuseAnimations
})
export class ResourcesListComponent implements OnInit {
  configForm!: FormGroup;
  technologys = new FormControl('');
  technologyLIst: string[] = [];
  expriences: string[] = ['0 - 1', '1+', '2+', '3+', '4+'];
  pagination = false;
  searchValue = "";
  techList: string[] = []
  count = 1;
  resources: any = null;
  isLoading: boolean = false;
  totalRecored: any;
  selectedExpriencesFromArray: any;
  totalPerPageData = StaticData.PER_PAGE_DATA;
  allResources: any;

  constructor(private ProjectService: CreateProjecteService, private router: Router, private _formBuilder: FormBuilder, private _fuseConfirmationService: FuseConfirmationService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    let payload = {
      "technology": this.technologys.value.length > 0 ? this.technologys.value : null,
      "experience": this.selectedExpriencesFromArray ? this.selectedExpriencesFromArray : "",
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
    this.isLoading = true;
    this.ProjectService.getResourceMember(payload).subscribe((res: any) => {
      this.totalRecored = res.data.totalRecored
      this.resources = res.data.teamMember;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    })
    // this.isLoading = false;
  }

  /*******************************************************************
   * @description Getting a list of technology in Resource List and pass to technologyLIst
   *
   * @author- Naynesh Rathod
   * @created_date - 19/07/2022
   *
   ******************************************************************/

  getListtechList() {
    this.isLoading = true;
    this.ProjectService.getTechnology().subscribe((res: any) => {
      let technologyLIst = res.data;
      technologyLIst.map((item: any) => {
        this.technologyLIst.push(item.name)
      })
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    })
  }

  /*******************************************************************
   * @description Handle Scroll pagination in Resource List
   *
   * @author- Naynesh Rathod
   * @created_date - 18/07/2022
   *
   ******************************************************************/

  handleScroll() {
    if (!this.pagination) {
      this.count = this.count + this.totalPerPageData;
      let payload = {
        "perPageData": this.count,
        "totalPerPageData": this.totalPerPageData,
        "technology": this.technologys.value.length > 0 ? this.technologys.value : null,
        "experience": this.selectedExpriencesFromArray ? this.selectedExpriencesFromArray : "",
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

  /*******************************************************************
   * @description Filter Serach in Resource List
   *
   * @author- Naynesh Rathod
   * @created_date - 19/07/2022
   *
   ******************************************************************/

  selectChange() {
    this.isLoading = true;
    this.count = 1
    this.pagination = false
    let payload = {
      "technology": this.technologys.value.length > 0 ? this.technologys.value : null,
      "experience": this.selectedExpriencesFromArray ? this.selectedExpriencesFromArray : "",
      "perPageData": this.count,
      "totalPerPageData": this.totalPerPageData,
      "name": this.searchValue
    }
    this.ProjectService.getResourceMember(payload).subscribe((res: any) => {
      this.totalRecored = res.data.totalRecored
      this.resources = res.data.teamMember;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    });
  }


  /*******************************************************************
   * @description Input Serach in Resource List
   *
   * @author- Naynesh Rathod
   * @created_date - 19/07/2022
   *
   ******************************************************************/


  inputSearch(event: any) {
    this.count = 1;
    this.pagination = false
    if (this.searchValue !== event.target.value.trim()) {
      this.searchValue = event.target.value.trim();
      let payload = {
        "technology": this.technologys.value.length > 0 ? this.technologys.value : null,
        "experience": this.selectedExpriencesFromArray ? this.selectedExpriencesFromArray : "",
        "perPageData": this.count,
        "totalPerPageData": this.totalPerPageData,
        "name": this.searchValue
      };
      this.getList(payload);
    }
  }

  deleteResource(id: number): void {
    // Open the dialog and save the reference of it
    const dialogRef = this._fuseConfirmationService.open(this.configForm.value);
    // Subscribe to afterClosed from the dialog reference
    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  edit(id: number) {
    this.router.navigate([`/resources/edit-resources`], {queryParams: {id: id}});
  }
}
