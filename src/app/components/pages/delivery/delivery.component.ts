import { Component } from '@angular/core';
import { ButtonCustomComponent } from '../../inputs/button-custom/button-custom.component';
import { InputButtonGenericComponent } from "../../inputs/input-button-generic/input-button-generic.component";

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [ButtonCustomComponent, InputButtonGenericComponent],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.scss'
})
export class DeliveryComponent {
ButtonSVG: any;

}
