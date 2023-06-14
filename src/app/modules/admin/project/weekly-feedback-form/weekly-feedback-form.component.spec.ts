import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyFeedbackFormComponent } from './weekly-feedback-form.component';

describe('WeeklyFeedbackFormComponent', () => {
  let component: WeeklyFeedbackFormComponent;
  let fixture: ComponentFixture<WeeklyFeedbackFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyFeedbackFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyFeedbackFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
