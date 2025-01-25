import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { DeliveryService } from '../../../service/delivery.service';
import { IDatasInput } from '../../../service/indexers.service';
import {
  convertToCpfToRgToPhoneToCep,
  refineStringToNumber,
  removeIfNull,
} from '../../../utils/converts.utils';
import { InputButtonGenericComponent } from '../../inputs/input-button-generic/input-button-generic.component';
import { InputDropdownGenericComponent } from '../../inputs/input-dropdown-generic/input-dropdown-generic.component';
import { InputGenericComponent } from '../../inputs/input-generic/input-generic.component';
import {
  IAddress,
  IClients,
  IOrderDelivery,
} from './../../../service/indexers.service';

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

  removeIfNull = removeIfNull;

  protected deliveryService = inject(DeliveryService);
  protected tAlert = inject(NgToastService);
  private cdr = inject(ChangeDetectorRef);

  @Input() datasTypeOrder: IDatasInput[] = [];
  @Input() datasUser: IDatasInput[] = [];
  @Output() close = new EventEmitter<boolean>();

  protected clientView: any = { id: null, name: '' };
  protected addressView: any = { id: null, name: '' };
  protected isImputDisable: boolean = true;
  protected isLoad: boolean = false;
  protected new_delivery!: FormGroup;
  protected new_client!: FormGroup;
  protected new_address!: FormGroup;
  protected currentState: StateModel = StateModel.REGISTER_ORDER;
  protected StateModel = StateModel;
  protected clientIdIsEnabled = false;
  protected addressIdIsEnabled = false;
  protected orderRegisterAPI!: {
    order: IOrderDelivery;
    client: IClients;
    address: IAddress;
  };

  closeModal() {
    this.close.emit(false);
  }

  ngOnInit(): void {
    this.orderRegisterAPI = {
      order: {},
      client: {
        name: '',
        phone: '',
      },
      address: {
        place: '',
        number: '',
        neighborhood: '',
        city: '',
        uf: '',
      },
    };
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
      cpf: new FormControl(null),
      c_interno: new FormControl(null),
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
    },{validators: this.atLeastOneRequiredValidator(['cpf','c_interno'])});
    this.new_address = new FormGroup({
      cep: new FormControl(null, Validators.required),
      place: new FormControl(null, Validators.required),
      number: new FormControl(null, Validators.required),
      neighborhood: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      uf: new FormControl(null, Validators.required),
    });
  }
  atLeastOneRequiredValidator(fields: string[]) {
    return (formGroup: AbstractControl) => {
      const isValid = fields.some(
        (fiels) => !!formGroup.get(fiels)?.value?.trim()
      );
      return isValid ? null : { atLeastOneRequired: true };
    };
  }

  async onBlurAddress() {
    const cep = parseInt(refineStringToNumber(this.new_address.value.cep));

    await this.deliveryService.getCep(cep).subscribe((data) => {
      this.new_address.get('place')?.setValue(data?.street);
      this.new_address.get('neighborhood')?.setValue(data?.neighborhood);
      this.new_address.get('city')?.setValue(data?.city);
      this.new_address.get('uf')?.setValue(data?.state);
      this.cdr.detectChanges();
    });
  }
  onBlurClientcInterno() {
    this.setValuesGetCliente(
      refineStringToNumber(this.new_client.value.rg),
      'c_interno'
    );
  }
  onBlurClientCpf() {
    this.setValuesGetCliente(
      refineStringToNumber(this.new_client.value.cpf),
      'cpf'
    );
  }

  async setValuesGetCliente(cod: string, type: 'c_interno' | 'cpf') {
    if (!cod) {
      return;
    }
    await this.deliveryService.getClient(cod, type).subscribe((data) => {
      this.new_client
        .get('cpf')
        ?.setValue(convertToCpfToRgToPhoneToCep(data?.cpf, 'cpf'));
      this.new_client
        .get('c_interno')
        ?.setValue(convertToCpfToRgToPhoneToCep(data?.c_interno, 'c_interno'));
      this.new_client.get('name')?.setValue(data?.name);
      this.new_client
        .get('phone')
        ?.setValue(convertToCpfToRgToPhoneToCep(data?.phone, 'phone'));
      this.cdr.detectChanges();
    });
  }

  checkingValid(): boolean {
    return (
      this.new_delivery.valid &&
      this.clientIdIsEnabled &&
      this.addressIdIsEnabled
    );
  }

  async registerOrder() {
    try {
      this.isLoad = true;
      if (this.checkingValid()) {
        const order: IOrderDelivery = {
          ...this.new_delivery.getRawValue(),
        } as IOrderDelivery;
        order.date = new Date(`${order.date}:00.000Z`);
        this.orderRegisterAPI.order = order;
        this.orderRegisterAPI.client = removeIfNull(this.orderRegisterAPI.client);

        await this.deliveryService
          .registerOrder(this.orderRegisterAPI, 'full')
          .subscribe({
            next: (value) => {
              if (!value) {
                this.tAlert.error({
                  detail: 'Falhar ao criar novo Entrega',
                  summary: value?.toString(),
                  duration: 5000,
                });
                return;
              }
              this.tAlert.success({
                detail: 'Entrega inserido com sucesso',
                summary: `Entrega do/a ${this.clientView.name} inserida`,
                duration: 5000,
              });
              this.close.emit(true);
            },
            error: (err) => {
              this.tAlert.error({
                detail: 'Falhar ao criar novo Entrega',
                summary: err?.toString(),
                duration: 5000,
              });
              console.error('Erro ao registrar Entrega:', err);
            },
          });
      }
      this.isLoad = false;
    } catch (error) {
      this.isLoad = false;
      console.error('registerOrder', error);
    }
  }

  async registerAddress() {
    if (this.new_address.valid) {
      const address: IAddress = {
        ...this.new_address.getRawValue(),
      } as IAddress;
      if (address.cep) {
        address.cep = await refineStringToNumber(address.cep.toString());
      }
      this.isLoad = true;
      // await this.deliveryService.registerAddress(address).subscribe({
      //   next: (value) => {
      //     if (!value) {
      //       this.tAlert.error({
      //         detail: 'Falhar ao criar novo endereço',
      //         summary: value?.toString(),
      //         duration: 5000,
      //       });
      //       return;
      //     }
      //     this.addressView = {
      //       id: value,
      //       name: `${address.place}, ${address.number} - ${address.neighborhood}`,
      //     };
      //     this.addressIdIsEnabled = true;
      //     this.new_delivery.controls['address_id'].setValue(value);
      //     this.currentState = StateModel.REGISTER_ORDER;
      //     this.isLoad = false;
      //     this.tAlert.success({
      //       detail: 'Endereço inserido com sucesso',
      //       summary: this.addressView.name,
      //       duration: 5000,
      //     });
      //   },
      //   error: (err) => {
      //     this.isLoad = false;
      //     this.tAlert.error({
      //       detail: 'Falhar ao criar novo endereço',
      //       summary: err?.toString(),
      //       duration: 5000,
      //     });
      //     console.error('Erro ao registrar endereço:', err);
      //   },
      // });

      this.addressIdIsEnabled = true;
      this.currentState = StateModel.REGISTER_ORDER;
      this.isLoad = false;
      this.addressView = {
        id: 0,
        name: `${address.place}, ${address.number} - ${address.neighborhood}`,
      };
      this.orderRegisterAPI.address = address;
    }
  }

  async registerCliente() {
    if (this.new_client.valid) {
      const client: IClients = {
        ...this.new_client.getRawValue(),
      } as IClients;
      if (client.cpf) {
        client.cpf = await refineStringToNumber(client.cpf.toString());
      }

      this.isLoad = true;

      // await this.deliveryService.registerClient(client).subscribe({
      //   next: (value) => {

      //     if (!value) {
      //       this.tAlert.error({
      //         detail: 'Falhar ao criar novo cliente',
      //         summary: value?.toString(),
      //         duration: 5000,
      //       });
      //       return;
      //     }
      //     this.clientView = {
      //       id: value,
      //       name: client.name,
      //     };
      //     this.clientIdIsEnabled = true;
      //     this.new_delivery.controls['client_id'].setValue(value);
      //     this.currentState = StateModel.REGISTER_ORDER;
      //     this.tAlert.success({
      //       detail: 'Cliente inserido com sucesso',
      //       summary: this.clientView.name,
      //       duration: 5000,
      //     });
      //   },
      //   error: (err) => {

      //     this.tAlert.error({
      //       detail: 'Falhar ao criar novo cliente',
      //       summary: err?.toString(),
      //       duration: 5000,
      //     });
      //     console.error('Erro ao registrar cliente:', err);
      //   },
      // });

      this.clientIdIsEnabled = true;
      this.currentState = StateModel.REGISTER_ORDER;
      this.isLoad = false;

      this.clientView = {
        id: 0,
        name: client.name,
      };
      this.orderRegisterAPI.client = client;
    }
  }
}
export enum StateModel {
  REGISTER_ORDER = 'REGISTER_ORDER',
  REGISTER_CLIENT = 'REGISTER_CLIENT',
  REGISTER_ADDRESS = 'REGISTER_ADDRESS',
}
