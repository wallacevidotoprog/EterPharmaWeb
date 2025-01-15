import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
<<<<<<< HEAD
import { IRespAPI, IUserLogin, IVerifyAuth } from './indexers.service';
=======
import { IRespAPI, IUserLogin } from './indexers.service';
>>>>>>> f180803 (init)

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private api = inject(HttpClient);

  eLogin(dataUser: IUserLogin) {
<<<<<<< HEAD
<<<<<<< HEAD
    return this.api.post<IRespAPI<any>>(`${environment.API}api/login`, dataUser, {
=======
    return this.api.post<IRespAPI>(`${environment.API}api/login`, dataUser, {
>>>>>>> f180803 (init)
=======
    return this.api.post<IRespAPI<any>>(`${environment.API}api/login`, dataUser, {
>>>>>>> 9088d33 (	modified:   src/app/components/login/login.component.ts)
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
  }

<<<<<<< HEAD
<<<<<<< HEAD
  eVerifyToken(): Observable<IRespAPI<IVerifyAuth>> {
    return this.api.get<IRespAPI<any>>(`${environment.API}api/verifyAuth`, {
=======
  eVerifyToken(): Observable<IRespAPI> {
    return this.api.get<IRespAPI>(`${environment.API}api/verifyAuth`, {
>>>>>>> f180803 (init)
=======
  eVerifyToken(): Observable<IRespAPI<any>> {
    return this.api.get<IRespAPI<any>>(`${environment.API}api/verifyAuth`, {
>>>>>>> 9088d33 (	modified:   src/app/components/login/login.component.ts)
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
  }
<<<<<<< HEAD
<<<<<<< HEAD
  eLogout(): Observable<IRespAPI<any>> {
    return this.api.post<IRespAPI<any>>(
      `${environment.API}api/logout`,
      {},
=======
  eLogout(): Observable<IRespAPI<any>> {
    return this.api.post<IRespAPI<any>>(
      `${environment.API}api/logout`,
      {}, 
>>>>>>> 9088d33 (	modified:   src/app/components/login/login.component.ts)
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
<<<<<<< HEAD
=======
  eLogout():Observable<IRespAPI>{
    return this.api.post<IRespAPI>(`${environment.API}api/logout`,{
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
>>>>>>> f180803 (init)
=======
>>>>>>> 9088d33 (	modified:   src/app/components/login/login.component.ts)
  }
}

