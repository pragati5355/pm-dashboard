import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalProjectDetailsComponent } from './external-project-details.component';

describe('ExternalProjectDetailsComponent', () => {
  let component: ExternalProjectDetailsComponent;
  let fixture: ComponentFixture<ExternalProjectDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalProjectDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalProjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
