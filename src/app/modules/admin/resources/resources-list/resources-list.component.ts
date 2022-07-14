import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StaticData } from "../../../../core/constacts/static";
import {FormControl} from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.scss'],
encapsulation  : ViewEncapsulation.None,
changeDetection: ChangeDetectionStrategy.OnPush,
animations     : fuseAnimations
})
export class ResourcesListComponent implements OnInit {
  technologys = new FormControl('');

  technologyLIst: string[] = ['ALL','JAVA', 'Angular', 'Python', 'HTML'];
  expriences: string[] = [
    '0 - 1',
    '1+',
    '2+',
    '3+',
    '4+'
  ];
  resources: any = StaticData.RESOURCES_lIST
  isLoading: boolean = false;
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  gotoAddResources(){
    this.router.navigate(['/resources/add-resources']) 
   }
}
