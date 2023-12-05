import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFeedbackFormComponent } from './project-feedback-form.component';

describe('ProjectFeedbackFormComponent', () => {
  let component: ProjectFeedbackFormComponent;
  let fixture: ComponentFixture<ProjectFeedbackFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectFeedbackFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFeedbackFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
