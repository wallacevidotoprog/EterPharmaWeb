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
<<<<<<< HEAD
import { IDatasInput } from '../../../service/indexers.service';
=======
>>>>>>> f180803 (init)

const INPUT_FIELD_VALUE_ACESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputDropdownGenericComponent),
  multi: true,
};
@Component({
  selector: 'app-input-dropdown-generic',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-dropdown-generic.component.html',
  styleUrl: './input-dropdown-generic.component.css',
  providers: [INPUT_FIELD_VALUE_ACESSOR],
})
export class InputDropdownGenericComponent
  implements ControlValueAccessor, OnInit
{
  ngOnInit(): void {
<<<<<<< HEAD
    // if (this.dataValues && this.dataValues.length > 0) {
    //   this.value = this.dataValues[0].id;
    //   console.log(this.dataValues[0].id);
    //    // Define o valor como o id do primeiro item
    // }
  }
  @Input() id!: number;
  @Input() label: string = 'TIPO';
  @Input() dataValues: IDatasInput[]=[];
  @Output() idDP = new EventEmitter<number>();
  @Input() isReadOnly = false;
  @Input() isValue: any;
=======
    this.value = 1;
  }
  @Input() id!: number;
  @Input() label: string = 'TIPO';
  @Input() datas!: never[];
  @Output() idDP = new EventEmitter<number>();
  @Input() isReadOnly = false;
  @Input() isValue: any;

>>>>>>> f180803 (init)
  protected innerValue: any;

  onchange(e: Event) {
    this.value = (e.target as HTMLTextAreaElement).value;
  }

  public get value() {
    return this.innerValue;
  }

  public set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.OnChangeCb(v);
<<<<<<< HEAD
      this.idDP.emit(v);
=======
>>>>>>> f180803 (init)
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
}

<<<<<<< HEAD
=======
export interface IDatasInput {
  id: number;
  view: string;
}
>>>>>>> f180803 (init)
