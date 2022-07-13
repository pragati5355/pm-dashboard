import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  resources: any = [
    {
      name: "Sanskriti Gupta",
      email: "sanskriti.gupta@mindbowser.com",
      team: "develop",
      experience: "1 Year",
      technology: "angular"
    },
    {
      name: "Surja",
      email: "surja@mindbowser.com",
      team: "develop",
      experience: "2 Year",
      technology: "java"
    },
    {
      name: "sans",
      email: "sans@mindbowser.com",
      team: "develop",
      experience: "1 Year",
      technology: "java"
    }
  ]
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
