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
export interface IRespAPI<T> {
  message?: string;
  actionResult: boolean;
  data?: T;
}
export interface IVerifyAuth {
  Authentication: boolean;
}
export interface IUserLogin {
  email: string;
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
export interface IDatasInput {
  id: number;
  view: string;
}
// API
export interface IBaseDataBase {
  id?: number;
  createAt?: Date;
  updateAt?: Date;
}
export interface IOrderDelivery extends IBaseDataBase {
  date?: Date;
  user_id?: number | null;
  client_id?: number | null;
  address_id?: number | null;
  type_order_id?: number | null;
  value?: number;
}
export interface ITypeOrder extends IBaseDataBase{
  name: string;
}
export interface IUsers extends IBaseDataBase{
  store_id?: number | null;
  email: string;
  phone: string;
  name: string;
  position_id?: number | null;
  permissions_id ?: number | null;
  stats: boolean;
}
