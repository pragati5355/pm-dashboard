import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CreateProjecteService } from "@services/create-projecte.service";

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
  pageNo = 1;
  pagination = false;
  searchValue = "";
  count = 0;
  resources: any = null;
  isLoading: boolean = false;
  totalRecored: any = 46;
  selectedExpriencesFromArray: any;

  constructor(private ProjectService: CreateProjecteService, private router: Router,) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    let payload = {
      "technology": this.technologys.value.length > 0 ? this.technologys.value : null,
      "experience": this.selectedExpriencesFromArray ? this.selectedExpriencesFromArray : "",
      "perPageData": 0,
      "totalPerPageData": 0
    }
    this.getList(payload);
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

  handleScroll() {
    if (!this.pagination) {
      this.count = this.count + 20;
      let payload = {
        "perPageData": this.count - 9,
        "totalPerPageData": this.count,
        "technology": this.technologys.value.length > 0 ? this.technologys.value : null,
        "experience": this.selectedExpriencesFromArray ? this.selectedExpriencesFromArray : "",
      };
      this.pagination = true;
      this.ProjectService.getResourceMember(payload).subscribe((res: any) => {
        this.pagination = false;
        if (res) {
          this.resources = [...this.resources, ...res.data.teamMember];
        }
      }, (err: any) => {
        this.pagination = false;
      });
    }
  }

  selectChange() {
    this.isLoading = true;
    let payload = {
      "technology": this.technologys.value.length > 0 ? this.technologys.value : null,
      "experience": this.selectedExpriencesFromArray ? this.selectedExpriencesFromArray : "",
      "perPageData": 0,
      "totalPerPageData": 0
    }
    this.ProjectService.getResourceMember(payload).subscribe((res: any) => {
      this.totalRecored = res.data.totalRecored
      this.resources = res.data.teamMember;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    });
  }
}

