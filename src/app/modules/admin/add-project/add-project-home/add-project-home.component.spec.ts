import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectHomeComponent } from './add-project-home.component';

describe('AddProjectHomeComponent', () => {
  let component: AddProjectHomeComponent;
  let fixture: ComponentFixture<AddProjectHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProjectHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
