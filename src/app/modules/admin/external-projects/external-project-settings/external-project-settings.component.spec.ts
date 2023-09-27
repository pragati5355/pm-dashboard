import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalProjectSettingsComponent } from './external-project-settings.component';

describe('ExternalProjectSettingsComponent', () => {
  let component: ExternalProjectSettingsComponent;
  let fixture: ComponentFixture<ExternalProjectSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalProjectSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalProjectSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
