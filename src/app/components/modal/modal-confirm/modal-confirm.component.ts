import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-confirm',
  standalone:true,
  imports:[CommonModule],
  template: `
  <div class="backdrop" *ngIf="isOpen" (click)="closeModal(false)"></div>
    <div class="modal"
         *ngIf="isOpen"
         [@modalAnimation]
         (click)="$event.stopPropagation()">
      <h3>Confirmação</h3>
      <p>{{ message }}</p>
      <div class="buttons">
        <button class="cancel" (click)="closeModal(false)">Cancelar</button>
        <button class="confirm" (click)="confirm()">Confirmar</button>
      </div>
    </div>
  `,
  styles: `
   .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 10;
      }
      .modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 20;
        width: 300px;
        text-align: center;
      }
      .buttons {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
      }
      .cancel, .confirm {
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
      }
      .cancel {
        background: #ccc;
      }
      .confirm {
        background: #0c84d9;
        color: white;
      }
  `,

})
export class ModalConfirmComponent {
  @Input() isOpen = false;
  @Input() message = 'Tem certeza que deseja continuar?';
  @Output() close = new EventEmitter<boolean>();
  @Output() confirmAction = new EventEmitter<boolean>();

  closeModal(ev:boolean) {
    this.isOpen = false;
    this.close.emit(ev);
  }

  confirm() {
    //this.confirmAction.emit();
    this.closeModal(true);
  }

}
