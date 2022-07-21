import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerHappinessScoreComponent } from './customer-happiness-score.component';

describe('CustomerHappinessScoreComponent', () => {
  let component: CustomerHappinessScoreComponent;
  let fixture: ComponentFixture<CustomerHappinessScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerHappinessScoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerHappinessScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
