import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenteeListComponent } from './mentee-list.component';

describe('MenteeListComponent', () => {
  let component: MenteeListComponent;
  let fixture: ComponentFixture<MenteeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenteeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenteeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
