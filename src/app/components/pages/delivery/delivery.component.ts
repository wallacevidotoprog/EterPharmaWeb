import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonCustomComponent } from '../../inputs/button-custom/button-custom.component';
import { ModalNewDelivaryComponent } from '../../modal/modal-new-delivery/modal-new-delivary.component';

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [ButtonCustomComponent, ModalNewDelivaryComponent, CommonModule],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.scss',
})
export class DeliveryComponent {
  isModalVisible = false;

  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }
}
