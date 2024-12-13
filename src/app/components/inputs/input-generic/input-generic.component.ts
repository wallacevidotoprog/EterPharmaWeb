import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

const INPUT_FIELD_VALUE_ACESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputGenericComponent),
  multi: true,
};

@Component({
  selector: 'app-input-generic',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './input-generic.component.html',
  styleUrl: './input-generic.component.css',
  providers: [INPUT_FIELD_VALUE_ACESSOR],
})
export class InputGenericComponent implements ControlValueAccessor {
  @Input() id!: string;
  @Input() label!: string;
  @Input() type: string = 'text';
  @Input() ph!: string;
  @Input() isReadOnly: boolean = false;
  @Input() isValue: any;
  @Input() isBtnVisible: boolean = false;
  @Input() btnString!: string;
  @Input() innerValue: any;

  @Output() button_Click = new EventEmitter<void>();
  @Output() blurEvent = new EventEmitter<string | number>();

  onBlur() {
    this.blurEvent.emit(this.innerValue);
  }
  onButtonClicked() {
    this.button_Click.emit();
  }

  public get value() {
    return this.innerValue;
  }

  public set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.OnChangeCb(v);
    }
  }

  OnChangeCb: (_: any) => void = () => {};
  OnTouchedCb: (_: any) => void = () => {};

  writeValue(v: any): void {
    this.value = v;
  }
  registerOnChange(fn: any): void {
    this.OnChangeCb = fn;
  }
  registerOnTouched(fn: any): void {
    this.OnTouchedCb = fn;
  }
  setDisabledState?(isReadOnly: boolean): void {
    this.isReadOnly = isReadOnly;
  }
}
