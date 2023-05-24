import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExternalProjectComponent } from './create-external-project.component';

describe('CreateExternalProjectComponent', () => {
  let component: CreateExternalProjectComponent;
  let fixture: ComponentFixture<CreateExternalProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateExternalProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateExternalProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
