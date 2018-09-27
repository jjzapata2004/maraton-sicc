import { TestBed } from '@angular/core/testing';

import { MaratonService } from './maraton.service';

describe('MaratonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaratonService = TestBed.get(MaratonService);
    expect(service).toBeTruthy();
  });
});
