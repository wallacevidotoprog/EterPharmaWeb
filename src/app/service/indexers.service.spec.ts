import { TestBed } from '@angular/core/testing';

import { IndexersService } from './indexers.service';

describe('IndexersService', () => {
  let service: IndexersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
