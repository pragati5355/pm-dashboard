import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizationTableComponent } from './utilization-table.component';

describe('UtilizationTableComponent', () => {
  let component: UtilizationTableComponent;
  let fixture: ComponentFixture<UtilizationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilizationTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilizationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
