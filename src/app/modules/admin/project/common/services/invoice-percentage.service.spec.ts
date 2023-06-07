import { TestBed } from '@angular/core/testing';

import { InvoicePercentageService } from './invoice-percentage.service';

describe('InvoicePercentageService', () => {
  let service: InvoicePercentageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoicePercentageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
