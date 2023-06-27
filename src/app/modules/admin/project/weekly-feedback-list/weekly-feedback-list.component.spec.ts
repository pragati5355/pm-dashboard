import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyFeedbackListComponent } from './weekly-feedback-list.component';

describe('WeeklyFeedbackListComponent', () => {
  let component: WeeklyFeedbackListComponent;
  let fixture: ComponentFixture<WeeklyFeedbackListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyFeedbackListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyFeedbackListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
