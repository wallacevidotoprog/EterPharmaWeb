import { IDelivery, IViewOrder } from '../service/indexers.service';
import { IStatus } from './../service/indexers.service';

export function getFormattedDate(date?: string | Date): string {
  if (!date) return '';

  const parsedDate = new Date(date);
  return `${parsedDate.getUTCDate().toString().padStart(2, '0')}/${(
    parsedDate.getUTCMonth() + 1
  )
    .toString()
    .padStart(2, '0')}/${parsedDate.getUTCFullYear()} ${parsedDate
    .getUTCHours()
    .toString()
    .padStart(2, '0')}:${parsedDate
    .getUTCMinutes()
    .toString()
    .padStart(2, '0')}`;
  //console.log(formattedDate);
  return parsedDate.toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour12: false,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
  const day = parsedDate.getDate().toString().padStart(2, '0');
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
  const year = parsedDate.getFullYear();
  const hours = parsedDate.getHours().toString().padStart(2, '0');
  const minutes = parsedDate.getMinutes().toString().padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}
export function getFormattedCurrency(value?: number): string {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  return numericValue !== undefined && numericValue !== null
    ? numericValue.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
    : 'R$ 0,00';
}

export function returnOrdernationStatusDelivery(
  dvo: IViewOrder
): IStatus | null {
  if (
    dvo.order?.delivery?.delivery_status &&
    Array.isArray(dvo.order?.delivery?.delivery_status) &&
    dvo.order?.delivery?.delivery_status?.length > 0
  ) {
    const result = dvo.order?.delivery?.delivery_status
      ?.slice()
      .sort((a, b) => {
        const dateA = a.createAt ? new Date(a.createAt).getTime() : 0;
        const dateB = b.createAt ? new Date(b.createAt).getTime() : 0;
        return dateB - dateA;
      });

    return result[0]?.status ?? null;
  }
  return null;
}

export function ordernationStatusDelivery(dvo: IDelivery): IStatus[] {
  if (
    dvo?.delivery_status &&
    Array.isArray(dvo?.delivery_status) &&
    dvo?.delivery_status?.length > 0
  ) {
    const result = dvo?.delivery_status?.slice().sort((a, b) => {
      const dateA = a.createAt ? new Date(a.createAt).getTime() : 0;
      const dateB = b.createAt ? new Date(b.createAt).getTime() : 0;
      return dateA - dateB;
    });

    return result;

  }
  return [];
}

export function returnDataTodayFormGroup(date:Date = new Date()): string {
  const currentDate = date;
  const localOffset = currentDate.getTimezoneOffset();
  currentDate.setMinutes(currentDate.getMinutes() - localOffset);
  return currentDate.toISOString().slice(0, 16);
}
