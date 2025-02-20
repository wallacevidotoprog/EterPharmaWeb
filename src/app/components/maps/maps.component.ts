// import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import Map from 'ol/Map';
// import View from 'ol/View';
// import GeoJSON from 'ol/format/GeoJSON';
// import TileLayer from 'ol/layer/Tile';
// import VectorLayer from 'ol/layer/Vector';
// import { fromLonLat } from 'ol/proj';
// import OSM from 'ol/source/OSM';
// import VectorSource from 'ol/source/Vector';
// import { Stroke, Style } from 'ol/style';
// import { GeocodeService } from '../../service/geocode.service';
// import { MarkerService } from '../../service/marker.service';
// import { RouteService } from '../../service/route.service';

// @Component({
//   selector: 'app-map',
//   standalone: true,
//   imports: [CommonModule, HttpClientModule, FormsModule],
//   template: `
//     <input [(ngModel)]="address" placeholder="Digite um endereço" />
//     <button (click)="searchLocation()">Buscar</button>

//     <div class="info-box" *ngIf="distance && duration">
//       <p><b>Distância:</b> {{ distance }} km</p>
//       <p><b>Tempo Estimado:</b> {{ duration }} min</p>
//     </div>

//     <div #mapContainer class="map-container"></div>
//   `,
//   styles: [
//     `
//       .map-container {
//         width: 100%;
//         height: 500px;
//       }
//       .info-box {
//         margin-top: 10px;
//         padding: 10px;
//         background: #fff;
//         border-radius: 5px;
//         box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
//       }
//     `,
//   ],
// })
// export class MapComponent implements OnInit {
//   @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
//   private map!: Map;
//   private routeLayer!: VectorLayer<VectorSource>;

//   address: string = 'Rua Sete de Fevereiro, 373, Residencial Macedo Teles I, São José do Rio Preto, SP';
//   private pointA: [number, number] = [ -49.4105718,-20.7985185,]; // Fixo em SP
//   private pointB!: [number, number];

//   distance: string = '';
//   duration: string = '';

//   constructor(
//     private geocodeService: GeocodeService,
//     private markerService: MarkerService,
//     private routeService: RouteService
//   ) {}

//   ngOnInit() {
//     this.map = new Map({
//       target: this.mapContainer.nativeElement,
//       layers: [
//         new TileLayer({ source: new OSM() }),
//         this.markerService.markerLayer, // Camada de marcadores
//       ],
//       view: new View({
//         center: fromLonLat(this.pointA),
//         zoom: 15,
//       }),
//     });

//     this.markerService.addMarker(fromLonLat(this.pointA) as [number, number]); // Adiciona o marcador fixo (A)
//   }

//   searchLocation() {
//     this.geocodeService.getCoordinates(this.address).subscribe((data) => {
//       if (data.length > 0) {
//         const lat = parseFloat(data[0].lat);
//         const lon = parseFloat(data[0].lon);
//         this.pointB = [lon, lat];

//         this.markerService.clearMarkers();
//         this.markerService.addMarker(
//           fromLonLat(this.pointA) as [number, number]
//         ); // Mantém o marcador fixo
//         this.markerService.addMarker(
//           fromLonLat(this.pointB) as [number, number]
//         ); // Adiciona o marcador B

//         this.map.getView().setCenter(fromLonLat(this.pointB));
//         this.map.getView().setZoom(14);

//         this.drawRoute();
//       }
//     });
//   }

//   private drawRoute() {
//     this.routeService.getRoute(this.pointA, this.pointB).subscribe((data) => {
//       if (this.routeLayer) {
//         this.map.removeLayer(this.routeLayer);
//       }
//       console.log('this.routeService=>',this.routeService);

//       const routeCoords = new GeoJSON().readFeatures(data, {
//         featureProjection: 'EPSG:3857',
//       });
//       console.log('routeCoords=>',routeCoords);
//       this.routeLayer = new VectorLayer({
//         source: new VectorSource({ features: routeCoords }),
//         style: new Style({
//           stroke: new Stroke({
//             color: '#ff0000',
//             width: 4,
//           }),
//         }),
//       });
//       console.log('this.routeLayer=>',this.routeLayer);
//       this.map.addLayer(this.routeLayer);

//       // Pegando distância e tempo estimado
//       if (data.routes.length > 0) {
//         const routeSummary = data.routes[0].summary;
//         this.distance = (routeSummary.distance / 1000).toFixed(2); // Convertendo metros para KM
//         this.duration = (routeSummary.duration / 60).toFixed(0); // Convertendo segundos para minutos
//       }
//     });
//   }
// }

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { Stroke, Style } from 'ol/style';
import { GeocodeService } from '../../service/geocode.service';
import { MarkerService } from '../../service/marker.service';
import { RouteService } from '../../service/route.service';
// @ts-ignore
import polyline from '@mapbox/polyline';
import { Feature } from 'ol';
import { LineString } from 'ol/geom';
import { LocationInfo } from '../../service/indexers.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  providers: [MarkerService],
  template: `
    <!-- <input [(ngModel)]="address" placeholder="Digite um endereço" />
    <button (click)="searchLocation()">Buscar</button> -->


    <div #mapContainer class="map-container"></div>
    <div class="info-box" *ngIf="distance && duration">
      <p><b>Distância:</b> {{ distance }} km</p>
      <p><b>Tempo Estimado:</b> {{ duration }} min</p>
    </div>
  `,
  styles: [
    `
    .ol-overlaycontainer-stopevent{
      display: none;
    }
      .map-container {
        width: 100%;
        height: 100%;
      }
      .info-box {
        margin-top: 10px;
        padding: 10px;
        background: #fff;
        border-radius: 5px;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
      }
    `,
  ],
})
export class MapComponent implements OnInit {
  @Input() address!: string;

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  private map!: Map;
  private routeLayer!: VectorLayer<VectorSource>;

  private pointA: [number, number] = [-49.4105718, -20.7985185];
  private pointB!: [number, number];

  distance: string = '';
  duration: string = '';

  constructor(
    private geocodeService: GeocodeService,
    private markerService: MarkerService,
    private routeService: RouteService
  ) {}

  async ngOnInit() {
     this.map = await new Map({
      target: this.mapContainer.nativeElement,
      layers: [
        new TileLayer({ source: new OSM() }),
        this.markerService.markerLayer, // Adiciona a camada de marcadores ao mapa
      ],
      view: new View({
        center: fromLonLat(this.pointA),
        zoom: 15,
      }),
    });

    this.markerService.addMarker(this.pointA, 'store'); // Adiciona o marcador fixo (A)


    if (this.address) {
      this.searchLocation()
    }
  }
  searchLocation() {
      this.geocodeService.getCoordinates(this.address).subscribe(
      (data) => {
        if (data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          this.pointB = [lon, lat];

          // Limpar e adicionar os marcadores novamente
          this.markerService.clearMarkers();
          this.markerService.addMarker(this.pointA, 'store'); // Fixo A
          this.markerService.addMarker(this.pointB, 'consumer'); // Destino B

          // Atualizar a visão
          this.map.getView().setCenter(fromLonLat(this.pointB));
          this.map.getView().setZoom(14);

          // Desenhar a rota
          this.drawRoute();
        } else {
          alert('Endereço não encontrado');
        }
      },
      (error) => {
        console.error('Erro ao buscar coordenadas:', error);
        alert('Erro ao buscar o endereço');
      }
    );
  }

  private drawRoute() {
    this.routeService.getRoute(this.pointA, this.pointB).subscribe(
      (data) => {
        if (!data.routes || data.routes.length === 0) {
          console.error('Nenhuma rota encontrada', data);
          alert('Não foi possível encontrar a rota');
          return;
        }

        if (this.routeLayer) {
          this.map.removeLayer(this.routeLayer);
        }

        const decodedCoordinates = polyline.decode(data.routes[0].geometry);
        const routeCoordinates = decodedCoordinates.map(
          (coord: [number, number]) => fromLonLat([coord[1], coord[0]])
        );

        const routeFeature = new Feature({
          geometry: new LineString(routeCoordinates),
        });

        routeFeature.setStyle(
          new Style({
            stroke: new Stroke({
              color: '#ff0000',
              width: 4,
            }),
          })
        );

        this.routeLayer = new VectorLayer({
          source: new VectorSource({ features: [routeFeature] }),
        });

        this.map.addLayer(this.routeLayer);

        const routeSummary = data.routes[0].summary;
        this.distance = (routeSummary.distance / 1000).toFixed(2); // km
        this.duration = (routeSummary.duration / 60).toFixed(0); // min
      },
      (error) => {
        console.error('Erro ao buscar rota:', error);
        alert('Erro ao calcular a rota');
      }
    );
  }
}
