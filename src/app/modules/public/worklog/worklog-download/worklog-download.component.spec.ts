import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorklogDownloadComponent } from './worklog-download.component';

describe('WorklogDownloadComponent', () => {
  let component: WorklogDownloadComponent;
  let fixture: ComponentFixture<WorklogDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorklogDownloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorklogDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
