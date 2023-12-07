import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackFormListComponent } from './feedback-form-list.component';

describe('FeedbackFormListComponent', () => {
  let component: FeedbackFormListComponent;
  let fixture: ComponentFixture<FeedbackFormListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackFormListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackFormListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
