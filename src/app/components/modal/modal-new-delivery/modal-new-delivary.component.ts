import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IDatasInput, IOrderDelivery } from '../../../service/indexers.service';
import { InputButtonGenericComponent } from '../../inputs/input-button-generic/input-button-generic.component';
import { InputDropdownGenericComponent } from '../../inputs/input-dropdown-generic/input-dropdown-generic.component';
import { InputGenericComponent } from '../../inputs/input-generic/input-generic.component';

@Component({
  selector: 'app-modal-new-delivary',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    InputGenericComponent,
    InputButtonGenericComponent,
    InputDropdownGenericComponent,
  ],
  templateUrl: './modal-new-delivary.component.html',
  styleUrl: './modal-new-delivary.component.scss',
})
export class ModalNewDelivaryComponent implements OnInit {
  @Input() datasTypeOrder: IDatasInput[] = [];
  @Input() datasUser: IDatasInput[] = [];
  @Output() close = new EventEmitter<IOrderDelivery | null>();

  protected isLoad: boolean = false;
  protected isRegisterUser: boolean = false;
  protected isRegisterAddress: boolean = false;
  protected new_delivery!: FormGroup;

  closeModal() {
    this.close.emit(null);
  }

  ngOnInit(): void {
    const currentDate = new Date();
    const localOffset = currentDate.getTimezoneOffset();
    currentDate.setMinutes(currentDate.getMinutes() - localOffset);
    const isoString = currentDate.toISOString().slice(0, 16);

    this.new_delivery = new FormGroup({
      date: new FormControl(isoString, Validators.required),
      user_id: new FormControl('', Validators.required),
      client_id: new FormControl('', Validators.required),
      address_id: new FormControl('', Validators.required),
      type_order_id: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required),
    });
  }

  send() {
    if (this.new_delivery.valid) {
      const order: IOrderDelivery = {
        ...this.new_delivery.value,
      } as IOrderDelivery;

      console.log(order);

      //this.close.emit(order); // Emite os dados para o componente pai
    }
  }
}
