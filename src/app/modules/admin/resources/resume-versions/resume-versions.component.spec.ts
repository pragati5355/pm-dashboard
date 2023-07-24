import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeVersionsComponent } from './resume-versions.component';

describe('ResumeVersionsComponent', () => {
  let component: ResumeVersionsComponent;
  let fixture: ComponentFixture<ResumeVersionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeVersionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeVersionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
