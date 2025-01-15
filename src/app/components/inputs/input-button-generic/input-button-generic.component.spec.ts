import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputButtonGenericComponent } from './input-button-generic.component';

describe('InputButtonGenericComponent', () => {
  let component: InputButtonGenericComponent;
  let fixture: ComponentFixture<InputButtonGenericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputButtonGenericComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputButtonGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
