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
import { FormatCpfDirective, FormatPhoneDirective } from '../../../directives/format-cpf-rg-phone.directive';

const INPUT_FIELD_VALUE_ACESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputGenericComponent),
  multi: true,
};

@Component({
  selector: 'app-input-generic',
  standalone: true,
  imports: [FormsModule, CommonModule,FormatCpfDirective,FormatPhoneDirective],
  template: `
    <div class="coolinput">
      <label [attr.for]="id" class="text">{{ label }}</label>
      <input
        [type]="type"
        [id]="id"
        [placeholder]="ph"
        [(ngModel)]="value"
        (blur)="onBlur()"
        [maxlength]="maxlength"
        (input)="onInput($event)"
        [readOnly]="isReadOnly"
      />
      <button
        class="button"
        [ngStyle]="{ display: isBtnVisible ? 'block' : 'none' }"
        type="button"
        (click)="onButtonClicked()"
      >
        {{ btnString }}
      </button>
    </div>
  `,
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
  @Input() maxlength: number = 999;
  @Input() typesFormat: 'cpf' | 'rg' | 'phone' | 'none' = 'none';

  @Output() button_Click = new EventEmitter<void>();
  @Output() blurEvent = new EventEmitter<string | number>();

  onBlur() {
    this.blurEvent.emit(this.innerValue);
  }
  onButtonClicked() {
    this.button_Click.emit();
  }
  onInput(event: Event): void {
    let value = (event.target as HTMLInputElement).value;

    switch (this.typesFormat) {
      case 'cpf':
        value = this.formatCpf(value);
        break;
      case 'rg':
        value = this.formatRg(value);
        break;
      case 'phone':
        value = this.formatPhone(value);
        break;
      default:
        break;
    }

    this.innerValue = value;
    this.OnChangeCb(value);
  }
  private formatCpf(value: string): string {
    value = value.replace(/\D/g, '');
    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  }
  private formatRg(value: string): string {
    return value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1.$2');
  }

  private formatPhone(value: string): string {
    value = value.replace(/\D/g, '');
    if (value.length <= 10) {
      // Formato de telefone fixo: (XX) XXXX-XXXX
      return value.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    } else if (value.length <= 11) {
      // Formato de telefone celular: (XX) XXXXX-XXXX
      return value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    }
    return value;
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
