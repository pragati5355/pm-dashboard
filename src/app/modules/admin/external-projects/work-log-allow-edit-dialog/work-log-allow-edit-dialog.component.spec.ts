import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkLogAllowEditDialogComponent } from './work-log-allow-edit-dialog.component';

describe('WorkLogAllowEditDialogComponent', () => {
  let component: WorkLogAllowEditDialogComponent;
  let fixture: ComponentFixture<WorkLogAllowEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkLogAllowEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkLogAllowEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
