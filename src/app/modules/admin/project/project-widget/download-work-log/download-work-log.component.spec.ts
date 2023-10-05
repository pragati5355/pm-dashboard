import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadWorkLogComponent } from './download-work-log.component';

describe('DownloadWorkLogComponent', () => {
  let component: DownloadWorkLogComponent;
  let fixture: ComponentFixture<DownloadWorkLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadWorkLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadWorkLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
