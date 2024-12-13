import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IDatasInput, ITypeOrder } from '../../../service/indexers.service';
import { UserServiceService } from '../../../service/user.service.service';
import { ButtonCustomComponent } from '../../inputs/button-custom/button-custom.component';
import { ModalNewDelivaryComponent } from '../../modal/modal-new-delivery/modal-new-delivary.component';
import { DeliveryService } from './../../../service/delivery.service';

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [ButtonCustomComponent, ModalNewDelivaryComponent, CommonModule],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.scss',
})
export class DeliveryComponent implements OnInit {
  protected deliveryService = inject(DeliveryService);
  protected usersService = inject(UserServiceService);

  protected isModalVisible = false;
  protected datasTypeOrder: IDatasInput[] = [];
  protected datasUsers: IDatasInput[] = [];

  async ngOnInit(): Promise<void> {
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
        console.log('usersService', data);

        const users = data as ITypeOrder[] | any;
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
  }

  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }
}
