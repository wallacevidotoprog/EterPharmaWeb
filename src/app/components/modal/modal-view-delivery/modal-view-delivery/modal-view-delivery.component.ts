import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  IDeliveryStatus,
  IViewOrder,
} from '../../../../service/indexers.service';
import {
  convertToCpfToRgToPhoneToCep,
  retuneDateAndHours,
} from '../../../../utils/converts.utils';
import {
  getFormattedCurrency,
  getFormattedDate,
  ordernationStatusDelivery,
} from '../../../../utils/global.utils';
import { environment } from '../../../../../environments/environment';
import { MapComponent } from "../../../maps/maps.component";
declare var google: any;
@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    MapComponent
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
  retuneDateAndHours = retuneDateAndHours;

  private cdr = inject(ChangeDetectorRef);

  protected statusViewOrder: IDeliveryStatus[] = [];
  protected statusPorcentagem: number = 0;
  protected stateBar = { cancelled: false, finalized: false, inprocess: false };
  protected date_hours = { date: '', hours: '' };
  @ViewChild('mapContainer') mapContainer!: ElementRef;

  private map: any;
  private directionsService: any;
  private directionsRenderer: any;
  private geocoder: any;

  protected dataRegion!:string

  @Input() datasViewOrder!: IViewOrder | null;
  @Output() close = new EventEmitter<boolean>();

  ngOnInit() {
    if (this.datasViewOrder && this.datasViewOrder?.order?.delivery) {
      this.statusViewOrder = ordernationStatusDelivery(
        this.datasViewOrder?.order?.delivery
      );
      this.date_hours = retuneDateAndHours(this.datasViewOrder?.order.date);
      this.updateProgressBar();

    } else {
      this.date_hours =  this.datasViewOrder?.order?.date ?retuneDateAndHours(this.datasViewOrder?.order?.date):{date:'',hours:''};
      this.statusPorcentagem = 20;
      this.cdr.detectChanges();

    }
    this.cdr.detectChanges();
    this.dataRegion = `${this.datasViewOrder?.order?.address?.place} , ${this.datasViewOrder?.order?.address?.number} , ${this.datasViewOrder?.order?.address?.city}`;
    // this.loadGoogleMaps()
    //   .then(() => {
    //     // Aqui, garantimos que o geocoder é inicializado apenas após a API ser carregada.
    //     this.geocoder = new google.maps.Geocoder();
    //     this.initMap();
    //   })
    //   .catch((error) => {
    //     console.error('Erro ao carregar a API do Google Maps', error);
    //   });
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

    const progressIncrement =
      this.statusViewOrder.length < 4
        ? 100 / 4
        : 100 / this.statusViewOrder.length;

    this.statusPorcentagem = !this.stateBar.inprocess
      ? 100
      : progressIncrement * this.statusViewOrder.length;
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

  // mapa
  // Função para carregar a API do Google Maps dinamicamente
  private loadGoogleMaps(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof google === 'object' && typeof google.maps === 'object') {
        resolve(); // Se já estiver carregado, resolve imediatamente
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapApi}&libraries=directions`;
      script.onload = () => resolve();
      script.onerror = (error) => reject(error);
      document.head.appendChild(script);
    });
  }
  private initMap() {
    const latLng = { lat: -20.7985185, lng: -49.4105718 }; // Ponto A (Av. Fortunato Ernesto Vetorasso, 550)

    this.map = new google.maps.Map(this.mapContainer.nativeElement, {
      center: latLng,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    });

    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(this.map);

    this.dataRegion = `${this.datasViewOrder?.order?.address?.place},${this.datasViewOrder?.order?.address?.number},${this.datasViewOrder?.order?.address?.neighborhood},${this.datasViewOrder?.order?.address?.city},${this.datasViewOrder?.order?.address?.uf},`;
    this.calculateRoute(latLng, this.dataRegion);
  }


  private calculateRoute(origin: any, destination: string) {
    this.geocoder.geocode(
      { address: destination },
      (results: any, status: any) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const destinationLatLng = results[0].geometry.location;

          const request = {
            origin: origin,
            destination: destinationLatLng,
            travelMode: google.maps.TravelMode.DRIVING,
          };

          this.directionsService.route(request, (result: any, status: any) => {
            if (status === google.maps.DirectionsStatus.OK) {
              this.directionsRenderer.setDirections(result);
            } else {
              alert('Erro ao calcular a rota: ' + status);
            }
          });
        } else {
          alert(
            'Não foi possível geocodificar o endereço do ponto B: ' + status
          );
        }
      }
    );
  }
}
