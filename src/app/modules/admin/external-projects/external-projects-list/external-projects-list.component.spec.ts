import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalProjectsListComponent } from './external-projects-list.component';

describe('ExternalProjectsListComponent', () => {
  let component: ExternalProjectsListComponent;
  let fixture: ComponentFixture<ExternalProjectsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalProjectsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalProjectsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
