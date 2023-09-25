import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardVendorDetailsComponent } from './onboard-vendor-details.component';

describe('OnboardVendorDetailsComponent', () => {
  let component: OnboardVendorDetailsComponent;
  let fixture: ComponentFixture<OnboardVendorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardVendorDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardVendorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
