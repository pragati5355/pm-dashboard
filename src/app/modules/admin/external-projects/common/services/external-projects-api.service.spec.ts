import { TestBed } from '@angular/core/testing';

import { ExternalProjectsApiService } from './external-projects-api.service';

describe('ExternalProjectsApiService', () => {
  let service: ExternalProjectsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternalProjectsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
