import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrListsComponent } from './cr-lists.component';

describe('CrListsComponent', () => {
  let component: CrListsComponent;
  let fixture: ComponentFixture<CrListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
