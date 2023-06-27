import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyFormComponent } from './weekly-form.component';

describe('WeeklyFormComponent', () => {
  let component: WeeklyFormComponent;
  let fixture: ComponentFixture<WeeklyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
