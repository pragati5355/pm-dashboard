import { TestBed } from '@angular/core/testing';

import { WeeklyStatusService } from './weekly-status.service';

describe('WeeklyStatusService', () => {
  let service: WeeklyStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeeklyStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
