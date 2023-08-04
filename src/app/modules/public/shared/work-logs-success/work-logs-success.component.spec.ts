import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkLogsSuccessComponent } from './work-logs-success.component';

describe('WorkLogsSuccessComponent', () => {
  let component: WorkLogsSuccessComponent;
  let fixture: ComponentFixture<WorkLogsSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkLogsSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkLogsSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
