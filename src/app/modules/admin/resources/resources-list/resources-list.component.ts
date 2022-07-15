import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { StaticData } from "../../../../core/constacts/static";
import { FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CreateProjecteService } from "@services/create-projecte.service";

@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations
})
export class ResourcesListComponent implements OnInit {
  technologys = new FormControl('');
  technologyLIst: string[] = ['ALL', 'JAVA', 'Angular', 'Python', 'HTML'];
  expriences: string[] = ['0 t0 1', '1+', '2+', '3+', '4+'];
  resources:any=null;
  isLoading: boolean = false;

  constructor(private ProjectService: CreateProjecteService, private router: Router,) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getList();
  }

  gotoAddResources() {
    this.router.navigate(['/resources/add-resources'])
  }

  getList() {
    this.ProjectService.getResourceMember().subscribe((res: any) => {
      this.resources = StaticData.RESOURCES_lIST ;
      this.resources = this.resources.concat(res.data);
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    })
    this.isLoading = false;
  }
}
