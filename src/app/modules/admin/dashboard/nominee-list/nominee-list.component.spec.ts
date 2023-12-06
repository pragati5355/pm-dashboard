import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomineeListComponent } from './nominee-list.component';

describe('NomineeListComponent', () => {
  let component: NomineeListComponent;
  let fixture: ComponentFixture<NomineeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NomineeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NomineeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
