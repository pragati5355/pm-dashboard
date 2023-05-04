import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalProjectsHomeComponent } from './external-projects-home.component';

describe('ExternalProjectsHomeComponent', () => {
  let component: ExternalProjectsHomeComponent;
  let fixture: ComponentFixture<ExternalProjectsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalProjectsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalProjectsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
