import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  IDeliveryStatus,
  IViewOrder,
} from '../../../../service/indexers.service';
import {
  getFormattedCurrency,
  getFormattedDate,
  ordernationStatusDelivery,
} from '../../../../utils/global.utils';
import { CommonModule } from '@angular/common';
import { convertToCpfToRgToPhoneToCep } from '../../../../utils/converts.utils';

@Component({
  standalone: true,
  imports:[CommonModule],
  selector: 'app-modal-view-delivery',
  templateUrl: './modal-view-delivery.component.html',
  styleUrls: ['./modal-view-delivery.component.css'],
})
export class ModalViewDeliveryComponent implements OnInit {
  ordernationStatusDelivery = ordernationStatusDelivery;
  getFormattedDate = getFormattedDate;
  getFormattedCurrency = getFormattedCurrency
  convertToCpfToRgToPhoneToCep = convertToCpfToRgToPhoneToCep;

  constructor() {}

  protected statusViewOrder: IDeliveryStatus[] = [];
  protected statusPorcentagem: number = 0;
  protected stateBar ={ cancelled:false,finalized:false,inprocess:false}

  @Input() datasViewOrder!: IViewOrder | null;
  @Output() close = new EventEmitter<boolean>();

  ngOnInit() {
    if (this.datasViewOrder && this.datasViewOrder?.order?.delivery) {
      this.statusViewOrder = ordernationStatusDelivery(
        this.datasViewOrder?.order?.delivery
      );
      this.updateProgressBar();

    }
  }
  updateProgressBar(){

    this.stateBar.cancelled = this.statusViewOrder.some((s)=>s.status?.name ==='CANCELADO');
    this.stateBar.finalized = this.statusViewOrder.some((s)=>s.status?.name ==='FINALIZADO');
    this.stateBar.inprocess = (this.stateBar.cancelled === this.stateBar.finalized);

    //const contein_FoC:boolean  = this.statusViewOrder.some((s)=>s.status?.name ==='CANCELADO') ===this.statusViewOrder.some((s)=>s.status?.name ==='FINALIZADO')
    const progressIncrement =  this.statusViewOrder.length < 4 ? 100/4 :  100 / this.statusViewOrder.length;

    this.statusPorcentagem = !this.stateBar.inprocess ? 100: progressIncrement*this.statusViewOrder.length-10;
  }
  closeModal() {
    this.close.emit(false);
  }

  setProgressBarClass():string{
    if (this.stateBar.finalized) {
      return 'finalized'
    }
    else  if (this.stateBar.cancelled) {
      return 'cancelled'
    }
    return 'undefined'
  }

}
