import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private apiUrl = 'https://api.openrouteservice.org/v2/directions/driving-car';
  private apiKey = '5b3ce3597851110001cf6248367c52db2b1e4e718661b9731a462ed7'; 
  constructor(private http: HttpClient) {}

  getRoute(start: [number, number], end: [number, number]): Observable<any> {
    const body = {
      coordinates: [start, end],
      format: 'geojson'
    };

    return this.http.post(this.apiUrl, body, {
      headers: { Authorization: this.apiKey }
    });
  }
}
