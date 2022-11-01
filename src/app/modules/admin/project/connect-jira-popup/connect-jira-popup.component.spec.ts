import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectJiraPopupComponent } from './connect-jira-popup.component';

describe('ConnectJiraPopupComponent', () => {
  let component: ConnectJiraPopupComponent;
  let fixture: ComponentFixture<ConnectJiraPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectJiraPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectJiraPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
