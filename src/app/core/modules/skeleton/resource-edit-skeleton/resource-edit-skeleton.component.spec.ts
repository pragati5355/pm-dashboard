import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceEditSkeletonComponent } from './resource-edit-skeleton.component';

describe('ResourceEditSkeletonComponent', () => {
  let component: ResourceEditSkeletonComponent;
  let fixture: ComponentFixture<ResourceEditSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceEditSkeletonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceEditSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
