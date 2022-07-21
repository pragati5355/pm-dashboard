import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {StaticData} from "../../../../../core/constacts/static";
import {CreateProjecteService} from "@services/create-projecte.service";
import {Router} from "@angular/router";
import {FuseConfirmationService} from "../../../../../../@fuse/services/confirmation";

@Component({
  selector: 'app-sprints-list',
  templateUrl: './sprints-list.component.html',
  styleUrls: ['./sprints-list.component.scss']
})
export class SprintsListComponent implements OnInit {
  pagination = false;
  count = 1;
  isLoading: boolean = false;
  totalRecored = StaticData.SPRINTS_LIST.length;
  totalPerPageData = StaticData.PER_PAGE_DATA;
  sprintList: any = StaticData.SPRINTS_LIST;

  constructor(private ProjectService: CreateProjecteService, private router: Router, private _formBuilder: FormBuilder,
              private _fuseConfirmationService: FuseConfirmationService) {
  }

  ngOnInit(): void {
    console.log('sprintList', this.sprintList)
  }


  handleScroll() {
    if (!this.pagination) {
      this.count = this.count + this.totalPerPageData;
      this.pagination = true;
    }
  }

}
