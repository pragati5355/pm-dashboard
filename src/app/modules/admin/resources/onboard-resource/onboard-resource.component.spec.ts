import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardResourceComponent } from './onboard-resource.component';

describe('OnboardResourceComponent', () => {
  let component: OnboardResourceComponent;
  let fixture: ComponentFixture<OnboardResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardResourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
