import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitLossProjectsListComponent } from './profit-loss-projects-list.component';

describe('ProfitLossProjectsListComponent', () => {
  let component: ProfitLossProjectsListComponent;
  let fixture: ComponentFixture<ProfitLossProjectsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfitLossProjectsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfitLossProjectsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
