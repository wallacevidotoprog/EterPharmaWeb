import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  IDeliveryStatus,
  IViewOrder,
} from '../../../../service/indexers.service';
import { convertToCpfToRgToPhoneToCep } from '../../../../utils/converts.utils';
import {
  getFormattedCurrency,
  getFormattedDate,
  ordernationStatusDelivery,
} from '../../../../utils/global.utils';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
  ],
  selector: 'app-modal-view-delivery',
  templateUrl: './modal-view-delivery.component.html',
  styleUrls: ['./modal-view-delivery.component.css'],
})
export class ModalViewDeliveryComponent implements OnInit {
  ordernationStatusDelivery = ordernationStatusDelivery;
  getFormattedDate = getFormattedDate;
  getFormattedCurrency = getFormattedCurrency;
  convertToCpfToRgToPhoneToCep = convertToCpfToRgToPhoneToCep;

  private cdr = inject(ChangeDetectorRef);

  protected statusViewOrder: IDeliveryStatus[] = [];
  protected statusPorcentagem: number = 0;
  protected stateBar = { cancelled: false, finalized: false, inprocess: false };

  @Input() datasViewOrder!: IViewOrder | null;
  @Output() close = new EventEmitter<boolean>();

  ngOnInit() {
    if (this.datasViewOrder && this.datasViewOrder?.order?.delivery) {
      this.statusViewOrder = ordernationStatusDelivery(
        this.datasViewOrder?.order?.delivery
      );
      this.updateProgressBar();
    }
    this.cdr.detectChanges();
  }
  updateProgressBar() {
    this.stateBar.cancelled = this.statusViewOrder.some(
      (s) => s.status?.name === 'CANCELADO'
    );
    this.stateBar.finalized = this.statusViewOrder.some(
      (s) => s.status?.name === 'FINALIZADO'
    );
    this.stateBar.inprocess =
      this.stateBar.cancelled === this.stateBar.finalized;

    //const contein_FoC:boolean  = this.statusViewOrder.some((s)=>s.status?.name ==='CANCELADO') ===this.statusViewOrder.some((s)=>s.status?.name ==='FINALIZADO')
    const progressIncrement =
      this.statusViewOrder.length < 4
        ? 100 / 4
        : 100 / this.statusViewOrder.length;

    this.statusPorcentagem = !this.stateBar.inprocess
      ? 100
      : progressIncrement * this.statusViewOrder.length - 10;
  }
  closeModal() {
    this.close.emit(false);
  }

  setProgressBarClass(): string {
    if (this.stateBar.finalized) {
      return 'finalized';
    } else if (this.stateBar.cancelled) {
      return 'cancelled';
    }
    return 'undefined';
  }

}
