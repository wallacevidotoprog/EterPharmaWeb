import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IAddress, ICEP, IRespAPI, ITypeOrder } from './indexers.service';
@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  private api = inject(HttpClient);

  getTypeOrder(): Observable<ITypeOrder[]> {
    return this.api
      .get<IRespAPI<ITypeOrder[]>>(`${environment.API}api/type_order`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .pipe(map((resp: IRespAPI<ITypeOrder[]>) => resp.data ?? []));
  }

  registerClient(): Observable<number | null> {
    return this.api
      .get<IRespAPI<number>>(`${environment.API}api/client`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .pipe(map((resp: IRespAPI<any>) => resp.data.insertId ?? null));
  }

  registerAddress(address: IAddress): Observable<number | null> {
    return this.api
      .post<IRespAPI<number>>(`${environment.API}api/address`, address, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .pipe(map((resp: IRespAPI<any>) => resp.data.insertId ?? null));
  }

  registerOrder(): Observable<number | null> {
    return this.api
      .get<IRespAPI<number>>(`${environment.API}api/order`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .pipe(map((resp: IRespAPI<any>) => resp.data.insertId ?? null));
  }

  getCep(cep: number): Observable<ICEP | null> {
    return this.api
      .get(`https://brasilapi.com.br/api/cep/v1/${cep}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        map((resp: ICEP | any) => {
          return resp ?? null;
        })
      );
  }
}
