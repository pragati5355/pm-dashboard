import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceInviteFormComponent } from './resource-invite-form.component';

describe('ResourceInviteFormComponent', () => {
  let component: ResourceInviteFormComponent;
  let fixture: ComponentFixture<ResourceInviteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceInviteFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceInviteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
