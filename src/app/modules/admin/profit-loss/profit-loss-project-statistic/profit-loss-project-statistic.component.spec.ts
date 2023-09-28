import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitLossProjectStatisticComponent } from './profit-loss-project-statistic.component';

describe('ProfitLossProjectStatisticComponent', () => {
  let component: ProfitLossProjectStatisticComponent;
  let fixture: ComponentFixture<ProfitLossProjectStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfitLossProjectStatisticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfitLossProjectStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
