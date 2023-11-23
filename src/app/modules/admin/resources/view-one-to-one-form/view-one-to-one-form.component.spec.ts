import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOneToOneFormComponent } from './view-one-to-one-form.component';

describe('ViewOneToOneFormComponent', () => {
  let component: ViewOneToOneFormComponent;
  let fixture: ComponentFixture<ViewOneToOneFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOneToOneFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOneToOneFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
