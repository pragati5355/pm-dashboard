import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitLossHomeComponent } from './profit-loss-home.component';

describe('ProfitLossHomeComponent', () => {
  let component: ProfitLossHomeComponent;
  let fixture: ComponentFixture<ProfitLossHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfitLossHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfitLossHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
