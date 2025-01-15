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
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { lastValueFrom } from 'rxjs';
import { DeliveryService } from '../../../service/delivery.service';
import {
  IDatasInput,
  IDeliverySend,
  IOrderFilter,
  IViewOrder,
} from '../../../service/indexers.service';
import {
  getFormattedCurrency,
  getFormattedDate,
  returnDataTodayFormGroup,
  returnOrdernationStatusDelivery,
} from '../../../utils/global.utils';
import { InputButtonGenericComponent } from '../../inputs/input-button-generic/input-button-generic.component';
import { InputDropdownGenericComponent } from '../../inputs/input-dropdown-generic/input-dropdown-generic.component';
import { InputGenericComponent } from '../../inputs/input-generic/input-generic.component';

@Component({
  selector: 'app-modal-delivary',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    InputGenericComponent,
    InputButtonGenericComponent,
    InputDropdownGenericComponent,
  ],
  templateUrl: './modal-delivary.component.html',
  styleUrl: './modal-delivary.component.scss',
})
export class ModalDelivaryComponent implements OnInit {
  protected deliveryService = inject(DeliveryService);
  protected tAlert = inject(NgToastService);
  private cdr = inject(ChangeDetectorRef);

  getFormattedDate = getFormattedDate;
  getFormattedCurrency = getFormattedCurrency;
  returnOrdernationStatusDelivery = returnOrdernationStatusDelivery;
  returnDataTodayFormGroup = returnDataTodayFormGroup;

  protected datasViewOrder: IViewOrder[] = [];
  protected listIdOrder: any = [];
  protected valueDateSearch!: string;
  protected isLoad: boolean = false;
  protected new_delivery!: FormGroup;
  protected orderFilter: IOrderFilter = {
    open: [],
    collected: [],
    route: [],
  };
  protected checkedOrderFilter = {
    open: true,
    collected: false,
    route: false,
  };

  @Input() datasState: IDatasInput[] = [];
  @Input() datasUser: IDatasInput[] = [];
  @Output() close = new EventEmitter<boolean>();

  async ngOnInit() {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    this.valueDateSearch = today.toISOString().split('T')[0];

    this.new_delivery = new FormGroup({
      date: new FormControl(returnDataTodayFormGroup(), Validators.required),
      user_id: new FormControl(null, Validators.required),
      order_delivery_id: new FormArray([], Validators.required),
      motor_kilometers: new FormControl(null, Validators.required),
      status_id: new FormControl(null, Validators.required),
    });

    await this.getViewOrder(this.valueDateSearch);
  }

  closeModal() {
    this.close.emit(false);
  }

  async getViewOrder(date: string | Date) {
    let searchDate: Date = new Date();

    if (typeof date === 'string') {
      searchDate = new Date(date);
    } else {
      searchDate = date;
    }
    try {
      const response = await lastValueFrom(
        this.deliveryService.getViewOrder(searchDate)
      );
      this.orderFilter.open = [];
      this.orderFilter.collected = [];
      this.orderFilter.route = [];

      if (response) {
        const xresult = response?.filter(
          (item) =>
            !item.order?.delivery?.delivery_status?.some(
              (s) => s.status?.name === 'CANCELADO'
            ) &&
            !item.order?.delivery?.delivery_status?.some(
              (s) => s.status?.name === 'FINALIZADO'
            )
        );

        for (let index = 0; index < xresult.length; index++) {
          const element = xresult[index];
          const status = returnOrdernationStatusDelivery(element);

          if (status?.name === 'COLETADO') {
            this.orderFilter.collected?.push(element);
          } else if (status?.name === 'EM ROTA') {
            this.orderFilter.route?.push(element);
          } else {
            this.orderFilter.open?.push({
              ...element,
              selected: element.selected ?? false,
            });
          }
        }
      }
      console.log('this.orderFilter', this.orderFilter);

      this.checkedOrderFilter = {
        open: true,
        collected: false,
        route: false,
      };
      this.updateViewOrder('open');
      // this.datasViewOrder =
      //   response
      //     ?.filter(
      //       (item) =>
      //         !item.order?.delivery?.delivery_status?.some((s) => s.status?.name === 'CANCELADO') &&
      //         !item.order?.delivery?.delivery_status?.some((s) => s.status?.name === 'FINALIZADO')
      //     )
      //     .map((item) => ({
      //       ...item,
      //       selected: item.selected ?? false,
      //     })) || [];

      // this.cdr.detectChanges();
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    }
  }
  getStatusClass(status: string | null | undefined): string {
    if (!status) {
      return 'status unknown';
    }
    const statusClassMap: Record<string, string> = {
      AGUARDANDO: 'status pending',
      COLETADO: 'status collected',
      'EM ROTA': 'status route',
      FINALIZADO: 'status finished',
      CANCELADO: 'status cancelled',
      ABERTO: 'status pending',
    };
    return statusClassMap[status] || 'status unknown';
  }

  async onSubmit() {
    if (this.new_delivery.valid) {
      const deliverySend: IDeliverySend = {
        ...this.new_delivery.value,
        motor_kilometers: Number(this.new_delivery.value.motor_kilometers),
      };
      deliverySend.date = new Date(`${deliverySend.date}:00.000Z`);

      await this.deliveryService
        .registerDeliveryAndStatus(deliverySend, 'full')
        .subscribe({
          next: async (value) => {
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
              summary: `Entrega do/a ${deliverySend.order_delivery_id} inserida`,
              duration: 5000,
            });
            await this.getViewOrder(this.valueDateSearch);
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

    //});
    //this.closeModal();
  }

  toggleAll(event: Event) {
    //const isChecked = (event.target as HTMLInputElement).checked;

    this.datasViewOrder = this.datasViewOrder.map((item) => ({
      ...item,
      selected: true,
    }));

    this.listIdOrder = this.datasViewOrder
      .filter((item) => item.selected)
      .map((item) => item.order?.id);

    this.updateSelectedIds();
  }
  toggleItem(index: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    this.datasViewOrder[index].selected = isChecked;

    this.listIdOrder = this.datasViewOrder
      .filter((item) => item.selected)
      .map((item) => item.order?.id);

    this.updateSelectedIds();
  }

  updateSelectedIds() {
    const formArray = this.new_delivery.get('order_delivery_id') as FormArray;
    formArray.clear(); // Limpa IDs anteriores

    this.listIdOrder.forEach((id: string) => {
      formArray.push(new FormControl(id));
    });
  }

  updateViewOrder(status: 'open' | 'collected' | 'route') {
    this.datasViewOrder = [];
    const statusMap: Record<'open' | 'collected' | 'route', IViewOrder[]> = {
      open: this.orderFilter.open || [],
      collected: this.orderFilter.collected || [],
      route: this.orderFilter.route || [],
    };
    this.datasViewOrder.push(...statusMap[status]);
    this.cdr.detectChanges();
  }
  upateCheckedOrderFilter(status: 'open' | 'collected' | 'route'): void {
    this.checkedOrderFilter = {
      open: status === 'open',
      collected: status === 'collected',
      route: status === 'route',
    };

    this.updateViewOrder(status);
  }
}