import { TestBed } from '@angular/core/testing';

import { AddCrService } from './add-cr.service';

describe('AddCrService', () => {
  let service: AddCrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddCrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
