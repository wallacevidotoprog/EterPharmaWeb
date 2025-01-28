import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryStoreComponent } from './delivery-store.component';

describe('DeliveryComponent', () => {
  let component: DeliveryStoreComponent;
  let fixture: ComponentFixture<DeliveryStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryStoreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeliveryStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
