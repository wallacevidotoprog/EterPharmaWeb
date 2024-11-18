import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopMenssageComponent } from './pop-menssage.component';

describe('PopMenssageComponent', () => {
  let component: PopMenssageComponent;
  let fixture: ComponentFixture<PopMenssageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopMenssageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopMenssageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
