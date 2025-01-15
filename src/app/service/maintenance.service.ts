import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IMaintenanceData, IRespAPI } from './indexers.service';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
<<<<<<< HEAD
  private api = inject(HttpClient); 
=======
  private api = inject(HttpClient);
>>>>>>> f180803 (init)
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
<<<<<<< HEAD
<<<<<<< HEAD
  add(dataMaintenace: IMaintenanceData): Observable<IRespAPI<any>> {
    return this.api.post<IRespAPI<any>>(
=======
  add(dataMaintenace: IMaintenanceData): Observable<IRespAPI> {
    return this.api.post<IRespAPI>(
>>>>>>> f180803 (init)
=======
  add(dataMaintenace: IMaintenanceData): Observable<IRespAPI<any>> {
    return this.api.post<IRespAPI<any>>(
>>>>>>> 9088d33 (	modified:   src/app/components/login/login.component.ts)
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
