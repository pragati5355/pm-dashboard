import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCrComponent } from './add-cr.component';

describe('AddCrComponent', () => {
  let component: AddCrComponent;
  let fixture: ComponentFixture<AddCrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
