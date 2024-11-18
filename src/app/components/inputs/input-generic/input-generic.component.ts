import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
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
  imports: [FormsModule],
  templateUrl: './input-generic.component.html',
  styleUrl: './input-generic.component.css',
  providers: [INPUT_FIELD_VALUE_ACESSOR],
})
export class InputGenericComponent implements ControlValueAccessor {
  @Input() id!: string;
  @Input() label!: string;
  @Input() type: string = 'text';
  @Input() ph!: string;
  @Input() isReadOnly = false;
  @Input() isValue:any;
  
  private innerValue: any;

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
  setDisabledState?(isDisabled: boolean): void {
    this.isReadOnly = isDisabled;
  }

  getDateNow() {
    let today = new Date();
    let date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      today.getDate().toString().padStart(2, '0');
    let time =
      today.getHours().toString().padStart(2, '0') +
      ':' +
      today.getMinutes().toString().padStart(2, '0');
    return date + 'T' + time;
  }
}
