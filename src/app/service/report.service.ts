import { IRespAPI } from './indexers.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  protected api = inject(HttpClient);
  constructor() {}

<<<<<<< HEAD
<<<<<<< HEAD
  public getAll(): Observable<IRespAPI<any>> {
    return this.api.get<IRespAPI<any>>(`${environment.API}api/delivery/getAll`, {
=======
  public getAll(): Observable<IRespAPI> {
    return this.api.get<IRespAPI>(`${environment.API}api/delivery/getAll`, {
>>>>>>> f180803 (init)
=======
  public getAll(): Observable<IRespAPI<any>> {
    return this.api.get<IRespAPI<any>>(`${environment.API}api/delivery/getAll`, {
>>>>>>> 9088d33 (	modified:   src/app/components/login/login.component.ts)
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
  }
}
