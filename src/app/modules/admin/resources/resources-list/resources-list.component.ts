import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {fuseAnimations} from '@fuse/animations';
import {CreateProjecteService} from "@services/create-projecte.service";
import {StaticData} from 'app/core/constacts/static';

@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.scss'],
  animations: fuseAnimations
})
export class ResourcesListComponent implements OnInit {
  technologys = new FormControl('');
  technologyLIst: string[] = ["Angular", "HTML", "Java", "Python"];
  expriences: string[] = ['0 to 1', '1+', '2+', '3+', '4+'];
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

  constructor(private ProjectService: CreateProjecteService, private router: Router,) {
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
    let payload = {
      totalPerPageData : 0,
      technology : null,
      perPageData : 0,
      experience : "",
      name : ""
    }
    this.ProjectService.getResourceMember(payload).subscribe((res: any) => {
      this.allResources = res.data.teamMember;
       this.allResources.map((item:any)=>{
         this.techList =this.techList.concat.apply(this.techList, item.technologyCtrl);
         this.techList =  [...new Set(this.techList )]
         this.technologyLIst = this.techList;
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
}
