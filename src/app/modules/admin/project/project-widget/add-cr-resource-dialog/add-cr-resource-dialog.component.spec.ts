import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCrResourceDialogComponent } from './add-cr-resource-dialog.component';

describe('AddCrResourceDialogComponent', () => {
  let component: AddCrResourceDialogComponent;
  let fixture: ComponentFixture<AddCrResourceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCrResourceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCrResourceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
