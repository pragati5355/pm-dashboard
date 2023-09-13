import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkLogShareComponent } from './work-log-share.component';

describe('WorkLogShareComponent', () => {
  let component: WorkLogShareComponent;
  let fixture: ComponentFixture<WorkLogShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkLogShareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkLogShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
