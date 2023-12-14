import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceAvailablityComponent } from './resource-availablity.component';

describe('ResourceAvailablityComponent', () => {
  let component: ResourceAvailablityComponent;
  let fixture: ComponentFixture<ResourceAvailablityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceAvailablityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceAvailablityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
