import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { lastValueFrom } from 'rxjs';
import { DeliveryService } from '../../../service/delivery.service';
import {
  IDatasInput,
  IOrderFilter,
  IStatus,
  ITypeOrder,
  IViewOrder,
} from '../../../service/indexers.service';
import { UserServiceService } from '../../../service/user.service.service';
import {
  getFormattedCurrency,
  getFormattedDate,
  returnDataTodayFormGroup,
  returnOrdernationStatusDelivery,
} from '../../../utils/global.utils';
import { ButtonCustomComponent } from '../../inputs/button-custom/button-custom.component';
import { ModalDelivaryComponent } from '../../modal/modal-delivery/modal-delivary.component';
import { ModalNewDelivaryComponent } from '../../modal/modal-new-delivery/modal-new-delivary.component';
import { ModalViewDeliveryComponent } from '../../modal/modal-view-delivery/modal-view-delivery/modal-view-delivery.component';

@Component({
  selector: 'app-delivery-store',
  standalone: true,
  imports: [
    ButtonCustomComponent,
    ModalNewDelivaryComponent,
    CommonModule,
    FormsModule,
    ModalDelivaryComponent,
    ModalViewDeliveryComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './delivery-store.component.html',
  styleUrl: './delivery-store.component.scss',
})
export class DeliveryStoreComponent implements OnInit {
  async TesteData() {
    let nadata: string | IStatus | undefined;
    await this.deliveryService.teste().subscribe({
      next: (data) => {
        console.log('data', data);

        this.tAlert.info({
          detail: 'INFO',
          summary: data?.toString(),
          duration: 5000,
        });
        nadata = data;
        return;
      },
      error: (err) => {
        this.tAlert.error({
          detail: 'Falhar ao criar novo Entrega',
          summary: `${err.name} \n${err.message}`,
          duration: 5000,
        });
      },
    });
    await this.deliveryService.getStatus().subscribe({
      next: (data) => {
        const n_data = data.filter((x) => x.id === nadata);
        console.log('n_data', n_data);

        this.tAlert.info({
          detail: 'INFO',
          summary: n_data?.toString(),
          duration: 5000,
        });
        return;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getFormattedDate = getFormattedDate;
  getFormattedCurrency = getFormattedCurrency;
  returnOrdernationStatusDelivery = returnOrdernationStatusDelivery;
  returnDataTodayFormGroup = returnDataTodayFormGroup;

  protected deliveryService = inject(DeliveryService);
  protected usersService = inject(UserServiceService);
  protected tAlert = inject(NgToastService);
  private cdr = inject(ChangeDetectorRef);

  protected isModalOrderVisible = false;
  protected isModalDeliveryVisible = false;
  protected isModalDeliveryViewVisible = false;
  protected datasTypeOrder: IDatasInput[] = [];
  protected datasUsers: IDatasInput[] = [];
  protected datasStatus: IDatasInput[] = [];
  protected editOrder: boolean = false;
  protected orderFilter: IOrderFilter = {
    open: [],
    canceled: [],
    finalized: [],
  };
  protected checkedOrderFilter = {
    open: true,
    canceled: false,
    finalized: false,
  };
  protected datasViewOrder: IViewOrder[] = [];
  protected valueDateSearch!: string;
  protected selectViewOrder!: IViewOrder | null;

  async ngOnInit(): Promise<void> {
    this.valueDateSearch = returnDataTodayFormGroup().split('T')[0];

    await this.deliveryService.getTypeOrder().subscribe({
      next: (data) => {
        const typeOrders = data as ITypeOrder[] | any;
        for (let index = 0; index < typeOrders.length; index++) {
          this.datasTypeOrder.push({
            id: typeOrders[index].id,
            view: typeOrders[index].name,
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
    await this.usersService.getUsersAll().subscribe({
      next: (data) => {
        const users = data.users as ITypeOrder[] | any;
        for (let index = 0; index < users.length; index++) {
          this.datasUsers.push({
            id: users[index].id,
            view: users[index].name,
          });
        }
        
      },
      error: (err) => {
        console.log(err);
      },
    });

    await this.deliveryService.getStatus().subscribe({
      next: (data) => {
        const typeOrders = data as IStatus[] | any;
        for (let index = 0; index < typeOrders.length; index++) {
          this.datasStatus.push({
            id: typeOrders[index].id,
            view: typeOrders[index].name,
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
    await this.getViewOrder(this.valueDateSearch, true);
  }
  onRowClick(dvo: IViewOrder, index: number): void {
    this.selectViewOrder = dvo;
    this.openModalViewDelivery();
  }
  async getViewOrder(date: string, init: boolean = true) {
    try {
      const response = await lastValueFrom(
        this.deliveryService.getViewOrder(date)
      );
      this.orderFilter.open = [];
      this.orderFilter.canceled = [];
      this.orderFilter.finalized = [];
      if (response) {
        for (let index = 0; index < response.length; index++) {
          const element = response[index];
          if (
            element.order?.delivery?.delivery_status &&
            element.order?.delivery?.delivery_status?.some(
              (item) => item.status?.name == 'FINALIZADO'
            )
          ) {
            this.orderFilter.finalized?.push(element);
          } else if (
            element.order?.delivery?.delivery_status &&
            element.order?.delivery?.delivery_status.some(
              (item) => item.status?.name == 'CANCELADO'
            )
          ) {
            this.orderFilter.canceled?.push(element);
          } else {
            this.orderFilter.open?.push(element);
          }
        }
      }
      if (init) {
        this.checkedOrderFilter = {
          open: true,
          canceled: false,
          finalized: false,
        };
        this.upateCheckedOrderFilter('open');
      }
      this.orderFilter.open.sort(
        (a, b) =>
          new Date(b.order?.date || '').getTime() -
          new Date(a.order?.date || '').getTime()
      );
      this.orderFilter.canceled.sort(
        (a, b) =>
          new Date(b.order?.date || '').getTime() -
          new Date(a.order?.date || '').getTime()
      );
      this.orderFilter.finalized.sort(
        (a, b) =>
          new Date(b.order?.date || '').getTime() -
          new Date(a.order?.date || '').getTime()
      );
      this.cdr.detectChanges();
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

  openModalNewOrder() {
    this.isModalOrderVisible = true;
  }
  openModalDelivery() {
    this.isModalDeliveryVisible = true;
  }
  openModalViewDelivery() {
    this.isModalDeliveryViewVisible = true;
  }

  async closeOrderModal(event: boolean) {
    this.isModalOrderVisible = false;
    if (event) {
      await this.getViewOrder(this.valueDateSearch);
    }
    this.editOrder = false;
    this.selectViewOrder = null;
  }
  async closeDeliveryModal(event: boolean) {
    this.isModalDeliveryVisible = false;
    if (event) {
    }

    await this.getViewOrder(this.valueDateSearch);

    // const radio = document.querySelector('input[name="radio"][value="open"]') as HTMLInputElement;
    // if (radio) radio.checked = true;
  }
  closeDeliveryViewModal(event: boolean) {
    this.isModalDeliveryViewVisible = false;
    if (event) {
      this.selectViewOrder = null;
    }
  }

  updateViewOrder(status: 'open' | 'canceled' | 'finalized') {
    this.datasViewOrder = [];
    const statusMap: Record<'open' | 'canceled' | 'finalized', IViewOrder[]> = {
      open: this.orderFilter.open || [],
      canceled: this.orderFilter.canceled || [],
      finalized: this.orderFilter.finalized || [],
    };
    this.datasViewOrder.push(...statusMap[status]);
    this.cdr.detectChanges();
  }
  upateCheckedOrderFilter(status: 'open' | 'canceled' | 'finalized'): void {
    this.checkedOrderFilter = {
      open: status === 'open',
      canceled: status === 'canceled',
      finalized: status === 'finalized',
    };
    this.cdr.detectChanges();
    this.updateViewOrder(status);
  }
  onEditClick(dvo: IViewOrder) {
    this.editOrder = true;
    this.selectViewOrder = dvo;
    this.openModalNewOrder();
  }
}
