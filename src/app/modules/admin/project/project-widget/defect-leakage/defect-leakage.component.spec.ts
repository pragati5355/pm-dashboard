import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectLeakageComponent } from './defect-leakage.component';

describe('DefectLeakageComponent', () => {
  let component: DefectLeakageComponent;
  let fixture: ComponentFixture<DefectLeakageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefectLeakageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefectLeakageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
