import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallProjectScoreComponent } from './overall-project-score.component';

describe('OverallProjectScoreComponent', () => {
  let component: OverallProjectScoreComponent;
  let fixture: ComponentFixture<OverallProjectScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverallProjectScoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallProjectScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
