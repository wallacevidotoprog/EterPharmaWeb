import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IndexersService {
  getDateNow() {
    let today = new Date();
    let date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      today.getDate().toString().padStart(2, '0');
    let time =
      today.getHours().toString().padStart(2, '0') +
      ':' +
      today.getMinutes().toString().padStart(2, '0');
    return date + 'T' + time;
  }
}
export interface IMaintenanceData {
  date: Date | any;
  plate: string | any;
  km: number | any;
  value: number | any;
  type: string | any;
  obs: string | any;
}
export interface IRespAPI {
  err: boolean | any;
  menssage: string | any;
  data: any;
}

export interface IUserLogin {
  user: string;
  pass: string;
}
export interface IDeliveryData {
  date: Date | any;
  value: number | any;
  km: number | any;
  router: string | any;
  isRate: boolean;
  isIfood: boolean;
  isManipulation: boolean;
}
export interface IDeliveryDataRes {
  id_delivery: number | any;
  id_deliveryman: string | any;
  date: string | any;
  value: number | any;
  km: number | any;
  router: string | any;
  isRate: boolean;
  isIfood: boolean;
  isManipulation: boolean;
}
