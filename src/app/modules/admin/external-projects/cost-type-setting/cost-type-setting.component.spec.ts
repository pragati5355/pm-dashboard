import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostTypeSettingComponent } from './cost-type-setting.component';

describe('CostTypeSettingComponent', () => {
  let component: CostTypeSettingComponent;
  let fixture: ComponentFixture<CostTypeSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostTypeSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostTypeSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
