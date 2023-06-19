import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weekly-feedback-list',
  templateUrl: './weekly-feedback-list.component.html',
  styleUrls: ['./weekly-feedback-list.component.scss']
})
export class WeeklyFeedbackListComponent implements OnInit {

  initialLoading = false;
  requiredReposSkeletonData = {
    rowsToDisplay: 10,
    displayProfilePicture: false,
  };

  constructor() { }

  ngOnInit(): void {
  }

}
