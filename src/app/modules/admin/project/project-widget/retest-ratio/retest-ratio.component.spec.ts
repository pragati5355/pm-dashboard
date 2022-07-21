import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetestRatioComponent } from './retest-ratio.component';

describe('RetestRatioComponent', () => {
  let component: RetestRatioComponent;
  let fixture: ComponentFixture<RetestRatioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetestRatioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetestRatioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
