import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailInviteInvalidComponent } from './email-invite-invalid.component';

describe('EmailInviteInvalidComponent', () => {
  let component: EmailInviteInvalidComponent;
  let fixture: ComponentFixture<EmailInviteInvalidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailInviteInvalidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailInviteInvalidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
