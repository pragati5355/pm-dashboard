import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMenteeComponent } from './view-mentee.component';

describe('ViewMenteeComponent', () => {
  let component: ViewMenteeComponent;
  let fixture: ComponentFixture<ViewMenteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMenteeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMenteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
