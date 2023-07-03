import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectReasonDialogComponent } from './edit-project-reason-dialog.component';

describe('EditProjectReasonDialogComponent', () => {
  let component: EditProjectReasonDialogComponent;
  let fixture: ComponentFixture<EditProjectReasonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProjectReasonDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectReasonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
