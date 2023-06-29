import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMembersDetailsComponent } from './project-members-details.component';

describe('ProjectMembersDetailsComponent', () => {
  let component: ProjectMembersDetailsComponent;
  let fixture: ComponentFixture<ProjectMembersDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectMembersDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMembersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
