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

  protected isImputDisable:boolean=true;
  handleButtonClickedAddress() {
    this.toggleView('address')
  }
  handleButtonClickedClient() {
    this.toggleView('client')

  }
  @Input() datasTypeOrder: IDatasInput[] = [];
  @Input() datasUser: IDatasInput[] = [];
  @Output() close = new EventEmitter<IOrderDelivery | null>();

  protected isLoad: boolean = false;
  isRegisterClient: boolean = false;
  isRegisterAddress: boolean = false;
  protected new_delivery!: FormGroup;
  protected new_client!: FormGroup;
  protected new_address!: FormGroup;

  toggleView(view: 'address' | 'client') {
    if (view === 'address') {
      this.isRegisterAddress = true;
      this.isRegisterClient = false;
    } else if (view === 'client') {
      this.isRegisterClient = true;
      this.isRegisterAddress = false;
    }
  }

  closeModal() {
    this.close.emit(null);
  }

  ngOnInit(): void {
    this.isRegisterClient = false;
    this.isRegisterAddress = false;
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
      obs: new FormControl('', Validators.required),
    });
    this.new_client = new FormGroup({
      cpf: new FormControl('', Validators.required),
      rg: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
    });
    this.new_address = new FormGroup({
      cep: new FormControl('', Validators.required),
      place: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      neighborhood: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      uf: new FormControl('', Validators.required),
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
