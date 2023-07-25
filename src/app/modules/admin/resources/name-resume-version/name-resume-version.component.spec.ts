import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameResumeVersionComponent } from './name-resume-version.component';

describe('NameResumeVersionComponent', () => {
  let component: NameResumeVersionComponent;
  let fixture: ComponentFixture<NameResumeVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NameResumeVersionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NameResumeVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
