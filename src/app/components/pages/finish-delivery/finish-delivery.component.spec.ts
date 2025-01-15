import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishDeliveryComponent } from './finish-delivery.component';

describe('FinishDeliveryComponent', () => {
  let component: FinishDeliveryComponent;
  let fixture: ComponentFixture<FinishDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishDeliveryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinishDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
