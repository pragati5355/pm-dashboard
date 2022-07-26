import {Component, OnInit} from '@angular/core';
import {StaticData} from "../../../../../core/constacts/static";
import {CreateProjecteService} from "@services/create-projecte.service";

@Component({
  selector: 'app-sprints-list',
  templateUrl: './sprints-list.component.html',
  styleUrls: ['./sprints-list.component.scss'],
})
export class SprintsListComponent implements OnInit {
  count = 1;
  isLoading: boolean = false;
  totalRecored = 0;
  totalPerPageData = StaticData.PER_PAGE_DATA;
  sprintList: any = [];

  constructor(private ProjectService: CreateProjecteService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    // id pass only temporary after implementing router pass query by id
    let payload = {
      "id": 20
    }
    this.getSprintList(payload);
  }

  getSprintList(paylaod: any) {
    this.ProjectService.getSprintList(paylaod).subscribe((res: any) => {
      this.sprintList = res.data;
      this.totalRecored = this.sprintList.length ? this.sprintList.length : 0;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    })
  }
}
