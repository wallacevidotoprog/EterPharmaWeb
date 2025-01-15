import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDropdownGenericComponent } from './input-dropdown-generic.component';

describe('InputDropdownGenericComponent', () => {
  let component: InputDropdownGenericComponent;
  let fixture: ComponentFixture<InputDropdownGenericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputDropdownGenericComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputDropdownGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
