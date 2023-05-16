import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalProjectsAddResourceComponent } from './external-projects-add-resource.component';

describe('ExternalProjectsAddResourceComponent', () => {
  let component: ExternalProjectsAddResourceComponent;
  let fixture: ComponentFixture<ExternalProjectsAddResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalProjectsAddResourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalProjectsAddResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
