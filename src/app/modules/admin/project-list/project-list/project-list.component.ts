import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, ChangeDetectionStrategy, ElementRef, QueryList, Renderer2, ViewChildren, ViewEncapsulation } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { FuseCardComponent } from '@fuse/components/card';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {
  @ViewChildren(FuseCardComponent, { read: ElementRef })
  private _fuseCards!: QueryList<ElementRef>;
  constructor( private router: Router) { }
  cardList: boolean = true;
  ngOnInit(): void {
  }
   gotoAddProject(){
    this.router.navigate(['/projects/add-project']) 
   }
}
