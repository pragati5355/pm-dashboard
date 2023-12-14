import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendEndDateReasonDialogComponent } from './extend-end-date-reason-dialog.component';

describe('ExtendEndDateReasonDialogComponent', () => {
  let component: ExtendEndDateReasonDialogComponent;
  let fixture: ComponentFixture<ExtendEndDateReasonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtendEndDateReasonDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendEndDateReasonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
