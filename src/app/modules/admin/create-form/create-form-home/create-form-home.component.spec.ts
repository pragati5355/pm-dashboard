import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFormHomeComponent } from './create-form-home.component';

describe('CreateFormHomeComponent', () => {
  let component: CreateFormHomeComponent;
  let fixture: ComponentFixture<CreateFormHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFormHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFormHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
