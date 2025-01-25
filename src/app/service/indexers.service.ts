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
  id: string;
  view: string;
}
export interface IOrderFilter {
  open?: IViewOrder[];
  collected?:IViewOrder[];
  route?:IViewOrder[];
  canceled?: IViewOrder[];
  finalized?: IViewOrder[];
}
// API
export interface IBaseDataBase {
  id?: string;
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
  obs?: string;
}
export interface ITypeOrder extends IBaseDataBase {
  name: string;
}
export interface IUsers extends IBaseDataBase {
  store_id?: number | null;
  email: string;
  phone: string;
  name: string;
  position_id?: number | null;
  permissions_id?: number | null;
  stats: boolean;

  position?: IPosition
}
export interface IPosition extends IBaseDataBase {
  name: string;
}
export interface IClientAddress extends IBaseDataBase {
  client_id?: string;
  address_id?: string;

  address?: IAddress;
}
export interface IAddress extends IBaseDataBase {
  cep?: string;
  place: string;
  number: string;
  neighborhood: string;
  city: string;
  uf: string;
}
export interface IClients extends IBaseDataBase {
  cpf?: string;
  c_interno?: string;
  name: string;
  phone: string;

  client_address?: IClientAddress;
}
export interface IStatus extends IBaseDataBase {
  name?: string;
}
export interface IDelivery extends IBaseDataBase {
  order_delivery_id?: string;
  user_id?: string;
  date: Date;
  motor_kilometers: number;
  delivery_status: IDeliveryStatus[];
}
export interface IDeliveryStatus extends IBaseDataBase {
  delivery_id?: string;
  status_id?: string;

  status?: IStatus;
}
export interface IOrder extends IBaseDataBase {
  user_id?: string;
  date: Date;
  client_id?: string;
  address_id?: string;
  type_order_id?: string;
  value: number;
  obs:string

  delivery?: IDelivery;
  client?: IClients;
  address?: IAddress;
  type_order?:ITypeOrder
}

//API REQ/RES
export interface IViewOrder {
  order?: IOrder;
  selected?: Boolean;
}
export interface IViewOrderStatus {
  id?: string;
  name?: string;
  create?: Date;
}
export interface IDeliverySend {
  date: Date;
  motor_kilometers: number;
  order_delivery_id: string[];
  status_id: string;
  user_id: string;
}

//API TERCEIRO
export interface ICEP {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  service: string;
}
