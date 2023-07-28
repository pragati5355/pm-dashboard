import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardResourceDetailsComponent } from './onboard-resource-details.component';

describe('OnboardResourceDetailsComponent', () => {
  let component: OnboardResourceDetailsComponent;
  let fixture: ComponentFixture<OnboardResourceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardResourceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardResourceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
