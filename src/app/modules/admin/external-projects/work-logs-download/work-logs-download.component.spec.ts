import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkLogsDownloadComponent } from './work-logs-download.component';

describe('WorkLogsDownloadComponent', () => {
  let component: WorkLogsDownloadComponent;
  let fixture: ComponentFixture<WorkLogsDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkLogsDownloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkLogsDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
