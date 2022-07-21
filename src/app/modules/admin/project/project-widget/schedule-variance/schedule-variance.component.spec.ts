import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleVarianceComponent } from './schedule-variance.component';

describe('ScheduleVarianceComponent', () => {
  let component: ScheduleVarianceComponent;
  let fixture: ComponentFixture<ScheduleVarianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleVarianceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleVarianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
