import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkLogsListComponent } from './work-logs-list.component';

describe('WorkLogsListComponent', () => {
  let component: WorkLogsListComponent;
  let fixture: ComponentFixture<WorkLogsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkLogsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkLogsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
