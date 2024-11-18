import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-button-generic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-button-generic.component.html',
  styleUrl: './input-button-generic.component.css',
})
export class InputButtonGenericComponent {
  @Input() loading: boolean = false;
  @Input() isDisable: boolean = false;

}
