import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IRespAPI, ITypeOrder } from './indexers.service';
@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  private api = inject(HttpClient);

  getTypeOrder(): Observable<ITypeOrder[]> {
    return this.api.get<IRespAPI<ITypeOrder[]>>(
      `${environment.API}api/type_order`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    ).pipe(map((resp:IRespAPI<ITypeOrder[]>) => resp.data ?? []));
  }
}
