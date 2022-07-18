import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {fuseAnimations} from '@fuse/animations';
import {CreateProjecteService} from "@services/create-projecte.service";

@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.scss'],
  animations: fuseAnimations
})
export class ResourcesListComponent implements OnInit {
  technologys = new FormControl('');
  technologyLIst: string[] = ['ALL', 'JAVA', 'Angular', 'Python', 'HTML'];
  expriences: string[] = ['0 to 1', '1+', '2+', '3+', '4+'];
  resources: any = null;
  isLoading: boolean = false;
  pagination = false;
  totalRecored: any;

  constructor(private ProjectService: CreateProjecteService, private router: Router,) {
  }

  ngOnInit(): void {
    this.isLoading = true;

    let payload = {
      "technology": null,
      "experience": "",
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
    this.isLoading = false;
  }

  handleResourcesScroll() {
    let payload = {
      "technology": null,
      "experience": "",
      "perPageData": 0,
      "totalPerPageData": 0
    }
    this.ProjectService.getResourceMember(payload).subscribe((res: any) => {
    });
  }
 }
