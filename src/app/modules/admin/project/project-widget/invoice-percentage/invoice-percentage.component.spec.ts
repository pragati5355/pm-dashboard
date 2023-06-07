import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicePercentageComponent } from './invoice-percentage.component';

describe('InvoicePercentageComponent', () => {
  let component: InvoicePercentageComponent;
  let fixture: ComponentFixture<InvoicePercentageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicePercentageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicePercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
