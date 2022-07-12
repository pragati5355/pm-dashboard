import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesHomeComponent } from './resources-home.component';

describe('ResourcesHomeComponent', () => {
  let component: ResourcesHomeComponent;
  let fixture: ComponentFixture<ResourcesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourcesHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
