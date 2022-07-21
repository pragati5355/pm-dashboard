import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintProgressComponent } from './sprint-progress.component';

describe('SprintProgressComponent', () => {
  let component: SprintProgressComponent;
  let fixture: ComponentFixture<SprintProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
