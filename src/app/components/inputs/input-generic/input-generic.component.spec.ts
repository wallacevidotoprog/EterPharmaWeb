import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputGenericComponent } from './input-generic.component';

describe('InputTextComponent', () => {
  let component: InputGenericComponent;
  let fixture: ComponentFixture<InputGenericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputGenericComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
