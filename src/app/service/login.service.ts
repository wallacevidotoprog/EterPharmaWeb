import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IRespAPI, IUserLogin } from './indexers.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private api = inject(HttpClient);

  eLogin(dataUser: IUserLogin) {
    return this.api.post<IRespAPI>(`${environment.API}api/login`, dataUser, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
  }

  eVerifyToken(): Observable<IRespAPI> {
    return this.api.get<IRespAPI>(`${environment.API}api/verifyAuth`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
  }
  eLogout():Observable<IRespAPI>{
    return this.api.post<IRespAPI>(`${environment.API}api/logout`,{
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
  }
}

