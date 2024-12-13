import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DeliveryService } from '../../../service/delivery.service';
import {
  IAddress,
  IDatasInput,
  IOrderDelivery,
} from '../../../service/indexers.service';
import { refineStringToNumber } from '../../../utils/converts.utils';
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
  protected deliveryService = inject(DeliveryService);

  @Input() datasTypeOrder: IDatasInput[] = [];
  @Input() datasUser: IDatasInput[] = [];
  @Output() close = new EventEmitter<IOrderDelivery | null>();

  protected client: any = { id: null, name: '' };
  protected address: any = { id: null, name: '' };
  protected isImputDisable: boolean = true;
  protected isLoad: boolean = false;
  protected new_delivery!: FormGroup;
  protected new_client!: FormGroup;
  protected new_address!: FormGroup;
  protected currentState: StateModel = StateModel.REGISTER_ORDER;
  protected StateModel = StateModel;
  protected clientIdIsEnabled = false;
  protected addressIdIsEnabled = false;

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
      user_id: new FormControl(null, Validators.required),
      client_id: new FormControl(
        { value: null, disabled: true },
        Validators.required
      ),
      address_id: new FormControl(
        { value: null, disabled: true },
        Validators.required
      ),
      type_order_id: new FormControl(null, Validators.required),
      value: new FormControl(null, Validators.required),
      obs: new FormControl(null),
    });

    this.new_client = new FormGroup({
      cpf: new FormControl(null, Validators.required),
      rg: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
    });
    this.new_address = new FormGroup({
      cep: new FormControl(null, Validators.required),
      place: new FormControl(null, Validators.required),
      number: new FormControl(null, Validators.required),
      neighborhood: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      uf: new FormControl(null, Validators.required),
    });
  }
  async onBlur() {
    const cep = parseInt(refineStringToNumber(this.new_address.value.cep));

    await this.deliveryService.getCep(cep).subscribe((data) => {
      this.new_address.get('place')?.setValue(data?.street);
      this.new_address.get('neighborhood')?.setValue(data?.neighborhood);
      this.new_address.get('city')?.setValue(data?.city);
      this.new_address.get('uf')?.setValue(data?.state);
    });
  }

  checkingValid(): boolean {
    return (
      this.new_delivery.valid &&
      this.clientIdIsEnabled &&
      this.addressIdIsEnabled
    );
  }

  registerOrder() {
    if (this.checkingValid()) {
      const order: IOrderDelivery = {
        ...this.new_delivery.getRawValue(),
      } as IOrderDelivery;

      console.log(order);

      //this.close.emit(order); // Emite os dados para o componente pai
    }
  }

  async registerAddress() {
    if (this.new_address.valid) {
      const address: IAddress = {
        ...this.new_address.getRawValue(),
      } as IAddress;
      this.isLoad = true;
      await this.deliveryService.registerAddress(address).subscribe({
        next: (value) => {
          this.address = {
            id: value,
            name: `${address.place}, ${address.number} - ${address.neighborhood}`,
          };
          console.log(this.address);

          this.addressIdIsEnabled = true;
          this.new_delivery.controls['address_id'].setValue(value);
          this.currentState = StateModel.REGISTER_ORDER;
          this.isLoad = false;
        },
        error: (err) => {
          this.isLoad = false;
          console.error('Erro ao registrar endereço:', err);
        },
      });
    }
  }

  registerCliente() {
    if (this.new_client.valid) {
      const values = this.new_client.value;

      this.client = { id: 99, name: values.name };
      this.new_delivery.get('client_id')?.setValue(this.client.id);
      this.clientIdIsEnabled = true;
      this.currentState = StateModel.REGISTER_ORDER;
    }
  }
}
export enum StateModel {
  REGISTER_ORDER = 'REGISTER_ORDER',
  REGISTER_CLIENT = 'REGISTER_CLIENT',
  REGISTER_ADDRESS = 'REGISTER_ADDRESS',
}
