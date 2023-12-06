import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackFormViewComponent } from './feedback-form-view.component';

describe('FeedbackFormViewComponent', () => {
  let component: FeedbackFormViewComponent;
  let fixture: ComponentFixture<FeedbackFormViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackFormViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
