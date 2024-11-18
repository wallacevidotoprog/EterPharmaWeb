import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IMaintenanceData, IRespAPI } from './indexers.service';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  private api = inject(HttpClient);
  constructor() {}

  getDropDown(): Observable<any> {
    return this.api.get(`${environment.API}api/typeMaintenance`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
  }
  add(dataMaintenace: IMaintenanceData): Observable<IRespAPI> {
    return this.api.post<IRespAPI>(
      `${environment.API}api/maintenance/add`,
      dataMaintenace,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
  }
}
