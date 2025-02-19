import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { catchError, lastValueFrom, of, tap } from 'rxjs';
import { DeliveryService } from '../../../service/delivery.service';
import {
  IDatasInput,
  IDeliverySend,
  IOrderFilter,
  IStatus,
  IUsers,
  IViewOrder,
} from '../../../service/indexers.service';
import { UserServiceService } from '../../../service/user.service.service';
import {
  getFormattedCurrency,
  getFormattedDate,
  returnDataTodayFormGroup,
  returnOrdernationStatusDelivery,
} from '../../../utils/global.utils';
import { InputButtonGenericComponent } from '../../inputs/input-button-generic/input-button-generic.component';
import { InputDropdownGenericComponent } from '../../inputs/input-dropdown-generic/input-dropdown-generic.component';
import { InputGenericComponent } from '../../inputs/input-generic/input-generic.component';
import { ModalConfirmComponent } from '../../modal/modal-confirm/modal-confirm.component';
import { ModalViewDeliveryComponent } from '../../modal/modal-view-delivery/modal-view-delivery/modal-view-delivery.component';
@Component({
  selector: 'app-delivary',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    InputGenericComponent,
    InputButtonGenericComponent,
    InputDropdownGenericComponent,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    ModalConfirmComponent,
    ModalViewDeliveryComponent,
  ],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.scss',
})
export class DeliveryComponent implements OnInit {
  onRowClick(dvo: IViewOrder, index: number): void {
    this.selectViewOrder = dvo;
    this.isModalDeliveryViewVisible = true;
  }
  protected deliveryService = inject(DeliveryService);
  protected usersService = inject(UserServiceService);
  protected tAlert = inject(NgToastService);
  private cdr = inject(ChangeDetectorRef);

  getFormattedDate = getFormattedDate;
  getFormattedCurrency = getFormattedCurrency;
  returnOrdernationStatusDelivery = returnOrdernationStatusDelivery;
  returnDataTodayFormGroup = returnDataTodayFormGroup;

  protected selectViewOrder!: IViewOrder | null;
  protected showModal = false;
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

  protected datasState: IDatasInput[] = [];
  protected datasUser: IDatasInput[] = [];
  protected datasTypeOrder: IDatasInput[] = [];
  protected isModalDeliveryViewVisible: boolean = false;
  protected selectedRow: IViewOrder | null = null;
  protected useractive: any;
  //@Output() close = new EventEmitter<boolean>();

  async ngOnInit() {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    this.valueDateSearch = today.toISOString().split('T')[0];

    this.new_delivery = new FormGroup({
      date: new FormControl(returnDataTodayFormGroup(), Validators.required),
      user_id: new FormControl(null, Validators.required),
      order_delivery_id: new FormArray([], Validators.required),
      motor_kilometers: new FormControl(null, Validators.required),
      //status_id: new FormControl(null, Validators.required),
    });

    await this.usersService.getUsersAll().subscribe({
      next: (data) => {
        let users = data.users as IUsers[];

        for (let index = 0; index < users.length; index++) {
          if (users[index].position?.name.includes('ENTREGADOR')) {
            this.datasUser.push({
              //@ts-ignore
              id: users[index].id,
              view: users[index].name,
            });
          }
        }
        if (data.useractive) {
          this.useractive = data.useractive;
          if (this.useractive) {
            this.new_delivery
              .get('user_id')
              ?.setValue(this.useractive.id);}
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
          this.datasState.push({
            id: typeOrders[index].id,
            view: typeOrders[index].name,
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
    await this.getViewOrder(this.valueDateSearch);
  }

  closeDeliveryViewModal() {
    this.isModalDeliveryViewVisible = false;
    //this.close.emit(false);
  }

  async getViewOrder(date: string) {
    try {
      const response = await lastValueFrom(
        this.deliveryService.getViewOrder(date)
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
      this.checkedOrderFilter = {
        open: true,
        collected: false,
        route: false,
      };

      this.orderFilter.open.sort(
        (a, b) =>
          new Date(b.order?.date || '').getTime() -
          new Date(a.order?.date || '').getTime()
      );
      this.orderFilter.collected.sort(
        (a, b) =>
          new Date(b.order?.date || '').getTime() -
          new Date(a.order?.date || '').getTime()
      );
      this.orderFilter.route.sort(
        (a, b) =>
          new Date(b.order?.date || '').getTime() -
          new Date(a.order?.date || '').getTime()
      );

      this.updateViewOrder('open');
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
        status_id: this.returnIdStatus('COLETADO'),
      };
      deliverySend.date = new Date(`${deliverySend.date}:00.000Z`);

      await this.deliveryService
        .registerDeliveryAndStatus(deliverySend, 'colleted-all')
        .subscribe({
          next: async (value) => {
            if (!value) {
              this.tAlert.error({
                detail: 'Falhar ao criar novo Entrega',
                summary: `${value}`,
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
              summary: `${err.name} \n${err.message}`,
              duration: 5000,
            });
            console.error('Erro ao registrar Entrega:', err);
          },
        });
    }
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

  returnIdStatus(value: string): string {
    return this.datasState.filter((item) => item.view === value)[0]?.id || '';
  }
  showConfirmModal(row: IViewOrder) {
    this.selectedRow = row;
    this.showModal = true;
  }
  onAction(dvo: IViewOrder, drop: boolean = false) {
    let idStatus: string;
    //(click)="onAction(row, true)"
    if (drop) {
      idStatus = this.returnIdStatus('CANCELADO');
      this.showModal = false;
    } else {
      idStatus = this.checkedOrderFilter.collected
        ? this.returnIdStatus('EM ROTA')
        : this.checkedOrderFilter.route
        ? this.returnIdStatus('FINALIZADO')
        : '';
    }

    if (dvo.order?.delivery?.id && idStatus) {
      this.deliveryService
        .registerDeliveryStatus({
          delivery_id: dvo.order?.delivery?.id,
          status_id: idStatus,
        })
        .pipe(
          tap((response) =>
            this.tAlert.success({
              detail: 'Entrega atualizada com sucesso',
              summary: `Entrega do/a ${dvo.order?.client?.name} atualizada`,
              duration: 5000,
            })
          ),
          catchError((err) => {
            this.tAlert.error({
              detail: 'Falhar ao atualizar Entrega',
              summary: `${err.name} \n${err.message}`,
              duration: 5000,
            });
            console.error('Erro ao registrar status:', err);
            return of(null);
          })
        )
        .subscribe(async () => await this.getViewOrder(this.valueDateSearch));
      this.selectedRow = null;
    }
  }
  onConfirm(ev: boolean) {
    if (this.selectedRow && ev) {
      this.onAction(this.selectedRow, ev);
      return;
    }
    this.showModal = false;
  }
}
