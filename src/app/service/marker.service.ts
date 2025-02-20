import { Feature } from 'ol';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';

export class MarkerService {
  markerLayer: VectorLayer<VectorSource>;

  private setIco = {
    store: {
      image: new Icon({
        anchor: [0, 1],
        scale: 1,
        src: '../../assets/delivery/map-pin-store.png',
      }),
    },
    consumer: {
      image: new Icon({
        anchor: [1, 1],
        scale: 1,
        src: '../../assets/delivery/map-pin-cosumer.png',
      }),
    },
  };

  constructor() {
    this.markerLayer = new VectorLayer({
      source: new VectorSource(),
    });
  }

  addMarker(coordinate: [number, number], type: 'store' | 'consumer'): void {
    const marker = new Feature({
      geometry: new Point(fromLonLat(coordinate)),
    });

    marker.setStyle(
      new Style(type == 'store' ? this.setIco.store : this.setIco.consumer)
    );

    const source = this.markerLayer.getSource();
    if (source) {
      source.addFeature(marker);
    } else {
      console.error('Erro: Source do marcador não foi inicializado.');
    }
  }

  clearMarkers(): void {
    const source = this.markerLayer.getSource();
    if (source) {
      source.clear();
    } else {
      console.error('Erro: Source do marcador não foi inicializado.');
    }
  }
}
