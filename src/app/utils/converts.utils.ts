import { getFormattedDate } from './global.utils';

export function refineStringToNumber(value: string): string {
  if (!value) {
    return value;
  }
  return value.replace(/\D/g, '');
}

export function convertToCpfToRgToPhoneToCep(
  valueInput: any,
  type: 'cpf' | 'c_interno' | 'phone' | 'cep'
): string {
  try {
    const value: string = valueInput;
    switch (type) {
      case 'cpf':
        return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      case 'c_interno':
        return value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1.$2');
      case 'phone':
        if (value.length === 10) {
          return value.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
        } else if (value.length === 11) {
          return value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
        }
        console.log('nao entro no numero');

        return value;
      case 'cep':
        return value.replace(/^(\d{5})(\d{0,3})$/, '$1-$2');
      default:
        return value;
    }
  } catch (error) {
    return valueInput;
  }
}

export function removeIfNull(obj: any): any {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === null || obj[key] === undefined) {
      delete obj[key];
    }
  });
  return obj;
}

export function retuneDateAndHours(date: Date) {
  const dt = getFormattedDate(date);
  return {
    date: dt.split(' ')[0],
    hours: dt.split(' ')[1],
  };
}
