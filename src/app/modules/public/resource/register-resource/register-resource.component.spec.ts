import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterResourceComponent } from './register-resource.component';

describe('RegisterResourceComponent', () => {
  let component: RegisterResourceComponent;
  let fixture: ComponentFixture<RegisterResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterResourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
