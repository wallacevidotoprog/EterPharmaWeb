import { TestBed } from '@angular/core/testing';

import { TypeOrderServiseService } from './type-order.servise.service';

describe('TypeOrderServiseService', () => {
  let service: TypeOrderServiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeOrderServiseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
