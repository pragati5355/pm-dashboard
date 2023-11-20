import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneToOneFormsComponent } from './one-to-one-forms.component';

describe('OneToOneFormsComponent', () => {
  let component: OneToOneFormsComponent;
  let fixture: ComponentFixture<OneToOneFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneToOneFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneToOneFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
