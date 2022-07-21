import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityPercentageComponent } from './quality-percentage.component';

describe('QualityPercentageComponent', () => {
  let component: QualityPercentageComponent;
  let fixture: ComponentFixture<QualityPercentageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityPercentageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityPercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
