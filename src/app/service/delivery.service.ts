<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { format } from 'date-fns';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpStatus } from '../utils/HttpStatus';
import {
  IAddress,
  ICEP,
  IClients,
  IDeliveryDataRes,
  IDeliverySend,
  IOrder,
  IRespAPI,
  IStatus,
  ITypeOrder,
  IViewOrder,
} from './indexers.service';
=======
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IDeliveryData, IRespAPI } from './indexers.service';
>>>>>>> f180803 (init)
@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  private api = inject(HttpClient);

<<<<<<< HEAD
<<<<<<< HEAD
  getTypeOrder(): Observable<ITypeOrder[]> {
    return this.api
      .get<IRespAPI<ITypeOrder[]>>(`${environment.API}api/type_order`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        observe: 'response',
      })
      .pipe(
        map((resp) => {
          const status: HttpStatus = resp.status as HttpStatus;
          if (status === HttpStatus.OK) {
            const respBody: ITypeOrder[] | null = resp.body?.data ?? [];
            return respBody;
          }
          return [];
        })
        //map((resp: IRespAPI<ITypeOrder[]>) => resp.data ?? [])
      );
  }
  getStatus(): Observable<IStatus[]> {
    return this.api
      .get<IRespAPI<IStatus[]>>(`${environment.API}api/status`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        observe: 'response',
      })
      .pipe(
        map((resp) => {
          const status: HttpStatus = resp.status as HttpStatus;
          if (status === HttpStatus.OK) {
            const respBody: IStatus[] | null = resp.body?.data ?? [];
            return respBody;
          }
          return [];
        })
        //map((resp: IRespAPI<ITypeOrder[]>) => resp.data ?? [])
      );
  }
  getCep(cep: number): Observable<ICEP | null> {
    return this.api
      .get(`https://brasilapi.com.br/api/cep/v1/${cep}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        observe: 'response',
      })
      .pipe(
        map((resp) => {
          const status: HttpStatus = resp.status as HttpStatus;
          if (status === HttpStatus.OK) {
            const respBody: ICEP | any = resp.body;
            return respBody;
          }
          return null;
        })
      );
  }

  getClient(cod: string, type: 'rg' | 'cpf') {
    const params = new URLSearchParams({ [type]: cod }).toString();
    return this.api
      .get<IRespAPI<IClients>>(`${environment.API}api/client?${params}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        observe: 'response',
      })
      .pipe(
        map((resp) => {
          const status: HttpStatus = resp.status as HttpStatus;
          if (status === HttpStatus.OK) {
            const responseBody = resp.body as unknown as IRespAPI<IClients[]>;

            if (responseBody?.actionResult) {
              if (Array.isArray(responseBody?.data)) {
                return responseBody.data.length > 0
                  ? responseBody.data[0]
                  : null;
              }
              return responseBody.data ?? null;
            }
          }
          return null;
        })
      );
  }
  getViewOrder(date:Date): Observable<IViewOrder[] | null> {
    const params = new URLSearchParams({ ['date']: format(date, 'yyyy-MM-dd HH:mm:ss') }).toString();
    return this.api
      .get<IRespAPI<IViewOrder[]>>(
        `${environment.API}api/order_view?${params}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          withCredentials: true,
          observe: 'response',
        }
      )
      .pipe(
        map((resp) => {
          const status: HttpStatus = resp.status as HttpStatus;
          if (status === HttpStatus.OK || status === HttpStatus.CREATED) {
            return resp.body?.data??null;
          }
          return null;
        })
      );
  }

  registerClient(client: IClients): Observable<number | null> {
    return this.api
      .post<IRespAPI<number>>(`${environment.API}api/client`, client, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        observe: 'response',
      })
      .pipe(
        map((resp) => {
          const status: HttpStatus = resp.status as HttpStatus;
          if (status === HttpStatus.OK) {
            const respBody: number | null = resp.body?.data ?? null;
            return respBody;
          }
          return null;
        })
      );
  }

  registerAddress(address: IAddress): Observable<number | null> {
    return this.api
      .post<IRespAPI<number | null>>(`${environment.API}api/address`, address, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        observe: 'response',
      })
      .pipe(
        map((resp) => {
          const status: HttpStatus = resp.status as HttpStatus;
          if (status === HttpStatus.OK) {
            const respBody: number | null = resp.body?.data ?? null;
            return respBody;
          }
          return null;
        })
      );
  }

  registerOrder(
    order: any,
    type: 'full' | 'simple'
  ): Observable<number | null> {
    const params = new URLSearchParams({ type: type }).toString();
    return this.api
      .post<IRespAPI<number | null>>(
        `${environment.API}api/order_delivery?${params}`,
        order,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          withCredentials: true,
          observe: 'response',
        }
      )
      .pipe(
        map((resp) => {
          const status: HttpStatus = resp.status as HttpStatus;
          if (status === HttpStatus.OK || status === HttpStatus.CREATED) {
            const respBody: number | null = resp.body?.data ?? null;
            return respBody;
          }
          return null;
        })
      );
  }

  registerDeliveryAndStatus(obj : IDeliverySend, type: 'full' | 'simple'):Observable<number|null>{
    const params = new URLSearchParams({ type: type }).toString();
    return this.api
      .post<IRespAPI<number | null>>(
        `${environment.API}api/delivery?${params}`,obj,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          withCredentials: true,
          observe: 'response',
        }
      )
      .pipe(
        map((resp) => {
          const status: HttpStatus = resp.status as HttpStatus;
          if (status === HttpStatus.OK || status === HttpStatus.CREATED) {
            const respBody: number | null = resp.body?.data ?? null;
            return respBody;
          }
          return null;
        })
      );
=======
  add(dataDerivery: IDeliveryData): Observable<IRespAPI> {
    return this.api.post<IRespAPI>(`${environment.API}api/delivery/add`,dataDerivery,{headers: {
=======
  add(dataDerivery: IDeliveryData): Observable<IRespAPI<any>> {
    return this.api.post<IRespAPI<any>>(`${environment.API}api/delivery/add`,dataDerivery,{headers: {
>>>>>>> 9088d33 (	modified:   src/app/components/login/login.component.ts)
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    })
>>>>>>> f180803 (init)
  }
}
