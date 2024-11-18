import { TestBed } from '@angular/core/testing';

import { DeriveryService } from './delivery.service';

describe('DeriveryService', () => {
  let service: DeriveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeriveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
