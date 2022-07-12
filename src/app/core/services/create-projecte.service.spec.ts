import { TestBed } from '@angular/core/testing';

import { CreateProjecteService } from './create-projecte.service';

describe('CreateProjecteService', () => {
  let service: CreateProjecteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateProjecteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
