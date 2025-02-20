import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiResponse, LocationInfo } from './indexers.service';

@Injectable({
  providedIn: 'root',
})
export class GeocodeService {
  private apiUrl = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) {}

  getCoordinates(address: string): Observable<any> {
    const params = {
      q: address,
      format: 'json',
      limit: '1',
    };
    return this.http.get(this.apiUrl, { params });
  }
  getListStreetsAndCoord(street: string): Observable<LocationInfo[]> {
    const params = {
      street,
      city: 'São José do Rio Preto',
      country: 'Brasil',
      format: 'geocodejson', 
    };

    return this.http.get<ApiResponse>(this.apiUrl, { params }).pipe(
      map(response =>
        response.features.map(feature => ({
          label: feature.properties.geocoding.label.split(",").map(p => p.trim()),
          coordinates: feature.geometry.coordinates
        }))
      )
    );
  }
}
