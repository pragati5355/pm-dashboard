import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSkillAndIntegrationComponent } from './add-skill-and-integration.component';

describe('AddSkillAndIntegrationComponent', () => {
  let component: AddSkillAndIntegrationComponent;
  let fixture: ComponentFixture<AddSkillAndIntegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSkillAndIntegrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSkillAndIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
