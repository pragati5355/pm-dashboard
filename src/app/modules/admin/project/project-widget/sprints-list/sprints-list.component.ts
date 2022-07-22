import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {StaticData} from "../../../../../core/constacts/static";
import {CreateProjecteService} from "@services/create-projecte.service";
import {Router} from "@angular/router";
import {FuseConfirmationService} from "../../../../../../@fuse/services/confirmation";

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

  constructor(private ProjectService: CreateProjecteService ) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    // id pass only temporary after implementing router pass query by id
    let payload = {
      "id": 29
    }
    this.getSprintList(payload);
  }

  getSprintList(paylaod: any) {
    this.ProjectService.getSprintList(paylaod).subscribe((res: any) => {
      this.sprintList = res.data.sprints;
      this.totalRecored = this.sprintList.length ? this.sprintList.length : 0;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    })
  }
}
