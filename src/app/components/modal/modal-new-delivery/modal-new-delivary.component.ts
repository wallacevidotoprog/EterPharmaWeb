import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputButtonGenericComponent } from '../../inputs/input-button-generic/input-button-generic.component';
import { InputGenericComponent } from '../../inputs/input-generic/input-generic.component';
import { IOrderDelivery } from '../../../service/indexers.service';

@Component({
  selector: 'app-modal-new-delivary',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    InputGenericComponent,
    InputButtonGenericComponent,
  ],
  templateUrl: './modal-new-delivary.component.html',
  styleUrl: './modal-new-delivary.component.scss',
})
export class ModalNewDelivaryComponent {

  @Output() close = new EventEmitter<IOrderDelivery|null>();

  closeModal() {
    this.close.emit(null);
  }

  new_delivery = new FormGroup({
    date: new FormControl('', Validators.required),
    user_id: new FormControl('', Validators.required),
    client_id: new FormControl('', Validators.required),
    address_id: new FormControl('', Validators.required),
    type_order_id: new FormControl('', Validators.required),
    value: new FormControl('', Validators.required),
  });



  send() {
    if (this.new_delivery.valid) {
      const order: IOrderDelivery = {
        ...this.new_delivery.value,
        date: this.new_delivery.value.date ? new Date(this.new_delivery.value.date).toISOString() : null, // Converte a data para o formato ISO
      };
      this.close.emit(order); // Emite os dados para o componente pai
    }
  }
}
