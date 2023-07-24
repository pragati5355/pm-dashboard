import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrDetailsComponent } from './cr-details.component';

describe('CrDetailsComponent', () => {
  let component: CrDetailsComponent;
  let fixture: ComponentFixture<CrDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
