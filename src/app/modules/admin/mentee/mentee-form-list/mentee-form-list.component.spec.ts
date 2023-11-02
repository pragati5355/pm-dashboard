import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenteeFormListComponent } from './mentee-form-list.component';

describe('MenteeFormListComponent', () => {
  let component: MenteeFormListComponent;
  let fixture: ComponentFixture<MenteeFormListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenteeFormListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenteeFormListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
