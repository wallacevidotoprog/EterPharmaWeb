import { TestBed } from '@angular/core/testing';

<<<<<<< HEAD
import { DeliveryService } from './delivery.service';

describe('DeriveryService', () => {
  let service: DeliveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryService);
=======
import { DeriveryService } from './delivery.service';

describe('DeriveryService', () => {
  let service: DeriveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeriveryService);
>>>>>>> f180803 (init)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
