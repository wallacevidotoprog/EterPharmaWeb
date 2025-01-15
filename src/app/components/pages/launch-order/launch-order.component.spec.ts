import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchOrderComponent } from './launch-order.component';

describe('LaunchOrderComponent', () => {
  let component: LaunchOrderComponent;
  let fixture: ComponentFixture<LaunchOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunchOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LaunchOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
