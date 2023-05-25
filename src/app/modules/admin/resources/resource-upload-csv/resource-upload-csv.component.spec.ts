import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceUploadCsvComponent } from './resource-upload-csv.component';

describe('ResourceUploadCsvComponent', () => {
  let component: ResourceUploadCsvComponent;
  let fixture: ComponentFixture<ResourceUploadCsvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceUploadCsvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceUploadCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
