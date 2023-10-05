import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWorkLogComponent } from './view-work-log.component';

describe('ViewWorkLogComponent', () => {
  let component: ViewWorkLogComponent;
  let fixture: ComponentFixture<ViewWorkLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewWorkLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewWorkLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
