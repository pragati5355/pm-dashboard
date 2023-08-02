import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendRemindersComponent } from './send-reminders.component';

describe('SendRemindersComponent', () => {
  let component: SendRemindersComponent;
  let fixture: ComponentFixture<SendRemindersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendRemindersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendRemindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
