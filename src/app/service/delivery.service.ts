import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IDeliveryData, IRespAPI } from './indexers.service';
@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  private api = inject(HttpClient);

  add(dataDerivery: IDeliveryData): Observable<IRespAPI<any>> {
    return this.api.post<IRespAPI<any>>(`${environment.API}api/delivery/add`,dataDerivery,{headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    })
  }
}
