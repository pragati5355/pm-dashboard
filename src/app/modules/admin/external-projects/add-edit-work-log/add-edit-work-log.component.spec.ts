import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditWorkLogComponent } from './add-edit-work-log.component';

describe('AddEditWorkLogComponent', () => {
  let component: AddEditWorkLogComponent;
  let fixture: ComponentFixture<AddEditWorkLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditWorkLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditWorkLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
