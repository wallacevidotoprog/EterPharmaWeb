import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalNewDelivaryComponent as ModalNewDeliveryComponent } from './modal-new-delivary.component';

describe('ModalNewDelivaryComponent', () => {
  let component: ModalNewDeliveryComponent;
  let fixture: ComponentFixture<ModalNewDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNewDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNewDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
